var express = require('express');
const User = require("../models/User");
const auth = require("../middleware/auth");
const { Token } = require("../models/token");
const Team = require("../models/Team")
const moment = require("moment");
moment().format();
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const crypto = require("crypto");
var nodemailer = require('nodemailer');

var router = express.Router();

router.get('/checkteam/:teamname', async (req, res) => {
    Team.find({}, function (err, teams) {
        let team = teams.filter(function (team) {
            return team.teamname.toLowerCase() === req.params.teamname.toLowerCase();
        }).pop();
        if (team) res.status(500).send({ message: 'This team already exist' });
        else res.status(200).send({ message: "This team doesn't exist" });
    })
})

router.get('/getteam/:teamname', auth, async (req, res) => {
    Team.findOne({ teamname: req.params.teamname }, function (err, team) {
        res.send(team);
    })
})

router.get('/getbase/:teamname/:basename', auth, async (req, res) => {
    Team.findOne({ teamname: req.params.teamname }, function (err, team) {
        var base = team.bases.filter(function (base) {
            return base.basename.toLowerCase() === req.params.basename.toLowerCase();
        }).pop();
        res.send(base);
    })
})

router.post('/setbasename/:teamname/:basename', auth, async (req, res) => {
    Team.findOne({ teamname: req.params.teamname }, function (err, team) {
        var checkbase = team.bases.filter(function (base) {
            console.log(base.basename.toLowerCase(), req.body.basename.toLowerCase());
            return base.basename.replace(/\s/g, '-').toLowerCase() === req.body.basename.replace(/\s/g, '-').toLowerCase();
        }).pop();

        if (checkbase) res.status(500).send({ message: 'Another base with this name exists' });
        else {
            var base = team.bases.filter(function (base) {
                return base.basename.toLowerCase() === req.params.basename.toLowerCase();
            }).pop();

            base.basename = req.body.basename;
            base.basedescription = req.body.basedescription;
            base.basevisiblity = req.body.basevisiblity;

            team.save();

            res.send({ base, team });
        }
        console.log("checkbase", checkbase);

    })
})

router.post('/setbase/:teamname/:basename', auth, async (req, res) => {
    Team.findOne({ teamname: req.params.teamname }, function (err, team) {
        var base = team.bases.filter(function (base) {
            return base.basename === req.params.basename;
        }).pop();

        base.basename = req.body.basename;
        base.basedescription = req.body.basedescription;
        base.basevisiblity = req.body.basevisiblity;

        team.save();

        res.send({ base, team });
    })
})

router.get('/newbase/:teamname', auth, async (req, res) => {
    Team.findOne({ teamname: req.params.teamname }, function (err, team) {
        var i = 1;
        let newbase = {};
        while (true) {
            var base = team.bases.filter(function (base) {
                return base.basename === 'Base' + '\xa0' + i;
            }).pop();
            if (!base) {
                newbase = {
                    basename: 'Base' + '\xa0' + i,
                    basedescription: '',
                    basevisiblity: true
                }
                team.bases.push(newbase);
                // res.send(newbase);
                break;
            }
            i++;
        }
        team.save();
        res.send({ newbase, team });
    })
});

router.get('/deletebase/:teamname/:basename', auth, async (req, res) => {
    Team.findOne({ teamname: req.params.teamname }, function (err, team) {
        var base = team.bases.filter(function (base) {
            return base.basename === req.params.basename;
        }).pop();

        base.remove();

        team.save();

        res.send(team);
    })
})



router.get('/newtable/:teamname/:basename', auth, async (req, res) => {
    Team.findOne({ teamname: req.params.teamname }, function (err, team) {
        var base = team.bases.filter(function (base) {
            return base.basename === req.params.basename;
        }).pop();

        var i = 1;

        let newtable = {};
        let tablename = '';
        let newtable_id = '';

        while (true) {
            var table = base.tables.filter(function (table) {
                return table.tablename === 'Table' + '\xa0' + i;
            }).pop();

            if (!table) {
                if (base.tables.length === 0) var id = 1;
                else var id = base.tables[base.tables.length - 1].id + 1

                newtable = {
                    id: id,
                    tablename: 'Table' + '\xa0' + i,
                    tabledescription: '',
                    tablevisiblity: true,
                }
                tablename = 'Table' + '\xa0' + i;

                base.tables.push(newtable);
                // res.send(newtable);
                break;
            }
            i++;
        }

        team.save();
        console.log("this is new ", base.tables);
        var table = base.tables.filter(function (table) {
            return table.tablename === tablename;
        }).pop();
        var tableid = table.id;
        res.send({ newtable, team, tableid });
    })
})

router.get('/gettable/:teamname/:basename/:tableid', auth, async (req, res) => {
    Team.findOne({ teamname: req.params.teamname }, function (err, team) {
        var base = team.bases.filter(function (base) {
            return base.basename.toLowerCase() === req.params.basename.toLowerCase();
        }).pop();

        // var table = base.tables.id(req.params.tableid);
        console.log(typeof req.params.tableid);

        var table = base.tables.filter(function (table) {
            console.log(table.id);
            return table.id === parseInt(req.params.tableid);
        }).pop();

        if (table) res.send({ table, team });
        else res.status(500).send({ message: "This table doesn't exist." });
    })
})

router.post('/settable/:teamname/:basename/:tableid', auth, async (req, res) => {
    Team.findOne({ teamname: req.params.teamname }, function (err, team) {
        var base = team.bases.filter(function (base) {
            return base.basename.toLowerCase() === req.params.basename.toLowerCase();
        }).pop();

        var table = base.tables.id(req.params.tableid);

        table.tablename = req.body.tablename;
        table.tabledescription = req.body.tabledescription;
        table.tablevisiblity = req.body.tablevisiblity;

        team.save();

        res.send({ table, team });
    })
})

router.get('/deletetable/:teamname/:basename/:tableid', auth, async (req, res) => {
    Team.findOne({ teamname: req.params.teamname }, function (err, team) {
        var base = team.bases.filter(function (base) {
            return base.basename === req.params.basename;
        }).pop();

        base.tables.id(req.params.tableid).remove();

        team.save();

        res.send(team);
    })
})

module.exports = router;