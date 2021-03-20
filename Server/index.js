const express = require('express');
const app = express();
// const pool = require('./db');
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());      //req.body

//ROUTES

// pool.connect(async(err, client, done) => {
//
//     done();
// });

app.get('/', async(req, res)=>{
    try{

    }
    catch(err){
        console.log(err.message);
    }
});

//Setup user profile for first time
app.post('/mainProfile', async(req, res)=>{
    try
    {

        //Successful post!
        res.sendStatus(200);
        console.log(req.body);
    } catch(err) {
        console.log(err.message);
    }
});

//Update info on user profile
app.put('/mainProfile', async(req, res)=> {
    try {

        let client = req.body.client;
        let target = req.body.target;
        let field = req.body.field;
        let data = req.body.data;
        console.log(`Push to DB for client ${client} with target ${target}, field ${field}, and data ${data}`);
        res.sendStatus(200);
        //PUSH TO DATABASE FOR SPECIFIC CLIENT HERE

    } catch(err) {
        console.log(err.message);
    }
})

app.post('/login', async(req, res)=>{
    try
    {
        let email = req.body.email;
        let password = req.body.password;

        //DATABASE LOGIN VALIDATION HERE

        console.log('Logged in!');
        res.sendStatus(200);
    } catch(err) {
        console.log(err.message);
    }
});

app.post('/purchaseConfirm', async(req, res)=>{
    try
    {
        res.sendStatus(200);

    } catch(err) {
        console.log(err.message);
    }
});
app.delete('/', async(req, res) => {
    try {

    } catch(err) {
        console.log(err.message);
    }
});


// set up the server listening at port 5000 (the port number can be changed)
app.listen(5000, ()=>{
    console.log("Back-end/database server started on port 5000. Press Ctrl-C to exit.");
});