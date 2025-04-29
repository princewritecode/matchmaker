// core js file whole node code
//express js to create server
const express = require('express');
// creating new application of express
const app = new express();
// now i have to listen on the port
// handle a request

//remember always the order of the route matters
// app.use("/user", (req, res) =>
// {
//     res.send('ha ha ha ha ...');
// });

// This will only handle the request get
app.get("/user", (req, res) =>
{
    res.send({ firstName: 'prince', lastName: 'patel' });
});
// this will handle the post request

app.post("/user", (req, res) =>
{
    // saving data to the database
    // console.log("save data to the database...");
    res.send("data successfully saved to database...");
});

// app.use("/hello", (req, res) =>
// {
//     res.send('welcome to hello.....');
// });

// app.use("/", (req, res) =>
// {
//     res.send('welcome to home page..');
// });
app.listen(3000, () =>
{
    console.log('server is successfully running on port 3000...');
});
