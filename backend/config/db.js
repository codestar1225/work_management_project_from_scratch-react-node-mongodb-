const mongoose = require("mongoose");

const MONGOURI ="mongodb://localhost:27017/wmp";

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useCreateIndex:  true,
    useUnifiedTopology: true
});
