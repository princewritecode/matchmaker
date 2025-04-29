// core js file whole node code
//express js to create server

const express = require('express');
// creating new application of express
const app = new express();
// now i have to listen on the port
// handle a request

app.use("/test", (req, res) =>
{
    res.send('hello from the server...');
});
app.use("/hello", (req, res) =>
{
    res.send('welcome to hello.....');
});
app.listen(3000, () =>
{
    console.log('server is successfully running on port 3000...');
});
