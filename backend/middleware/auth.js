const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async(req, res, next) => {
    const token = req.header('Authorization');
    JWT_KEY = 'WinterIsComingGOT2019';
    const data = jwt.verify(token, JWT_KEY)
    try {
        const user = await User.findOne({_id: data._id, 'tokens.token': token})
        if (!user) {
            throw new Error()
        }
        req.user = user;
        req.token = token;
        next()
    }
    catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resuour'})
    }
}

module.exports = auth