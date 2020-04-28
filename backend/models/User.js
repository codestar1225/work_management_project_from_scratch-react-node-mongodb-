const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required:  true,
        minLength: 7
    },
    teams: {
        type: Array,
        required: true
    },
    passwordResetToken: {
        type: String,
        default: ""
    },
    passwordResetExpires: {
        type:Date,
        default: Date.now
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.pre('save', async function (next) {
    //Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
})

UserSchema.methods.generateAuthToken = async function() {
    //Generate an auth token for the user
    const user = this;
    JWT_KEY = 'WinterIsComingGOT2019';
    const token = jwt.sign({_id: user._id}, JWT_KEY);
    user.tokens = user.tokens.concat({token})
    await user.save();
    return token;
}

UserSchema.statics.findByCredentials = async (email, password) => {
    //Search for a user by email and password.
    const user = await User.findOne({email} )
    if (!user) {
        // throw new Error({error: 'Invalid login credentials' });
        return 1;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch) {
        // throw new Error({error: 'Invalid login credentials '});
        return 2;
    }
    return user;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;