// core js file whole node code //express js to create server
const express = require('express');
const connectDb = require('./config/database');
// creating new application of express
const app = express(); // Fix: don't use 'new' with express()
const User = require('./model/user');
app.post('/signup', async (req, res) =>
{
    const userObj = {
        firstName: 'prince',
        lastName: 'patel',
        emailId: 'princepatel.dev@gmail.com',
        password: 'prince@123'
    };
    // creating new instance of the user model
    const user = new User(userObj);

    // below function will return promise most of the api will return a promise
    await user.save();
    res.send('user added successfully');

});


connectDb().then(() =>
{
    console.log('connected successfully');
    app.listen(3000, () =>
    {
        console.log('server is successfully running on port 3000...');
    });
}).catch((err) =>
{
    console.log(err);
});

