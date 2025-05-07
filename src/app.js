// core js file whole node code //express js to create server
const express = require('express');
const connectDb = require('./config/database');
// creating new application of express
const app = express(); // Fix: don't use 'new' with express()
const User = require('./model/user');
// creating middleware to convert data in readable format
app.use(express.json());

app.post('/signup', async (req, res) =>
{
    const userObj = req.body;
    // creating new instance of the user model
    const user = new User(userObj);
    // below function will return promise most of the api will return a promise
    await user.save();
    res.send('user added successfully');
});
app.get('/user', async (req, res) =>
{
    const userEmail = req.body.emailId;
    console.log(userEmail);
    try
    {
        const user = await User.find({ emailId: userEmail });
        if (user.length === 0)
        {
            res.status(404).send('user not found');
        }
        else
        {
            res.send(user);
        }
    }
    catch (err)
    {
        console.log(err);
    }
});
// feed api get feed get all the data from the database
app.get('/feed', async (req, res) =>
{
    try
    {
        const users = await User.find({});
        res.send(users);
    }
    catch (err)
    {
        console.log(err);
    }
});
// delete user by id
app.delete('/user', async (req, res) =>
{
    const userId = req.body.userId;
    try
    {
        const user = await (User.findOneAndDelete(userId));
        res.send('deleted user successfully...');
    }
    catch (err)
    {
        res.status(400).send('something went wrong...');
    }
});
// update user
app.patch('/user', async (req, res) =>
{
    const userId = req.body.userId;
    const data = req.body;
    try
    {
        await User.findByIdAndUpdate({ _id: userId }, data);
        res.send('user updated successfully...');
    }
    catch (err)
    {
        res.status(400).send('something went wrong...');
    }
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

