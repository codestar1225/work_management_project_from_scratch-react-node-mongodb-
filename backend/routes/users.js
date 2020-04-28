var express = require('express');
const User = require("../models/User");
const auth = require("../middleware/auth");
const { Token } = require("../models/token");
const Team = require("../models/Team")
const moment = require("moment");
moment().format();
const crypto = require("crypto");
var nodemailer = require('nodemailer');
const multer = require('multer');
var upload = require("../file_upload");


var router = express.Router();

router.post('/signup', async (req, res) => {
  //Create a new user
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    User.findOne({ email: req.body.email }, function (err, user) {
      let team_data = {
        _userId: user._id,
        teamname: req.body.teams.teamname,
      }
      const team = new Team(team_data);

      team.save();

      res.status(201).send({ user, token });
    })


  }
  catch (error) {
    res.status(400).send(error)
  }
});

router.post('/login', async (req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (user === 1) {
      return res.status(401).send({ error: 'Lgoin failed! Check authentication email' });
    }
    else if (user === 2) {
      return res.status(401).send({ error: 'Lgoin failed! Check authentication password' });
    }
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/profile', auth, async (req, res) => {
  //View logged in user profile
  res.send(req.user);
});

router.post('/update_profile', auth, upload.single('file'), async (req, res) => {
  User.findOne({ email: req.user.email }, function (err, user) {
    console.log(req.body);
    if (req.file) {
      let invoice_path = '/upload/profile_avatar/' + req.file.filename;
      user.avatar = invoice_path;
    }

    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.save(function (err, data) {
      if (err) return res.status(500).send({ message: err.message });
      return res.status(200).send(data);
    })
  })
})

router.post('/logout', auth, async (req, res) => {
  //Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    })
  }
  catch (error) {
    res.status(500).send(error)
  }
})

router.post('/logoutall', auth, async (req, res) => {
  //Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length)
    await req.user.save()
    res.send()
  }
  catch (error) {
    res.status(500).send(error);
  }
})

router.post('/password_mail_send', async (req, res) => {
  try {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      if (!user) return res.status(400).send({ message: "This email doesn't exist." });

      //Create a verification token
      var token = new Token({
        _userId: user._id,
        token: crypto.randomBytes(16).toString("hex")
      });

      user.passwordResetToken = token.token;
      user.passwordResetExpires = moment().add(48, "hours");

      user.save(function (err) {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        //Save the token
        token.save(function (err) {
          if (err) {
            return res.status(500).send(err.message);
          }
          //Send the mail

          var smtpTransport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "a9f474f966448e",
              pass: "92a20ec0c3f24b"
            }
          });

          mailOptions = {
            from: 'wmp@admin.com',
            to: req.body.email,
            subject: "Reset password link",
            html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p> <br />
            <a href="localhost:3000/reset-password/${token.token}">localhost:3000/reset-password/${token.token}</a> <br /> <br /> 
            <p> If you did not request this, please ignore this email and your password will remain unchanged.</p>`
          }

          smtpTransport.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
              return res.send(err);
            }
            console.log("Info: ", info);
            res.json({
              message: "Email successfully sent."
            });
          });

        });
      });
    });
  }
  catch (error) {
    res.status(500).send(error);
  }
});

router.post("/reset-password/:token", async (req, res) => {
  //Validate password Input
  // if (error) return res.status(400).send({ message: error.details[0].message });

  //Find a matching token
  Token.findOne({ token: req.params.token }, function (err, token) {

    if (err) return res.status(500).send({ message: err.message });

    if (!token) return res.status(400).send({ message: "this Token is not valid. Your token my have expired" });

    //If we found a token, find a matching user
    User.findById(token._userId, function (err, user) {
      if (err) return res.status(500).send({ message: err.message });

      if (!user) return res.status(400).send({ message: 'We were unable to find ausre for this token' });

      if (user.passwordResetToken !== token.token) return res.status(400).send({ message: "User token and your token didn't match. You may have a more recent token in your mail list" });

      //Verify that the user token expires date has not been passed
      if (moment().utcOffset(0) > user.passwordResetExpires) return res.status(400).send({ message: "Token has expired." });

      //Update user
      user.password = req.body.password;
      user.passwordResetToken = "nope";
      user.passwordResetExpires = moment().utcOffset(0);
      console.log(req.body);

      user.save(function (err) {
        if (err) return res.status(500).send({ message: err.message });
        return res.status(200).send({ message: "The account has been verified. Please log in." });
      })

    })
  })
})

module.exports = router;
