const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const tableSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    tablename: {
        type: String,
        required: true
    },
    tabledescription: {
        type: String
    },
    columns: {
        type: Array,
    },
    tablevisiblity: {
        type: Boolean,
        required: true
    }
})

const baseSchema = new mongoose.Schema({
    basename: {
        type: String,
        required: true
    },
    basedescription: {
        type: String
    },
    tables: [tableSchema],
    basevisiblity: {
        type: Boolean,
        required: true
    }
});

const userSchema = new mongoose.Schema({
    _userId: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    username: {
        type: String
    },
    useremail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    role: {
        type: String,
        required: true
    }
});

const teamSchema = new mongoose.Schema({
    _userId: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    teamname: {
        type: String,
        required: true
    },
    bases: [baseSchema],
    teamavatar: {
        type: String
    },
    users: [userSchema],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;


