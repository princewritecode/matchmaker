// create schema and talking to mongodb we need mongoose
const mongoose = require('mongoose');
const connectDb = async () =>
{
    await mongoose.connect('mongodb+srv://princepatel:7747871218@hellonode.oifbthx.mongodb.net/?retryWrites=true&w=majority&appName=hellonode');
};
module.exports = connectDb;
