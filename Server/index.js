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
        let name = req.body.name;
        let street = req.body.street;
        let city = req.body.city;
        let state = req.body.state;
        let zip = req.body.zip;
        console.log(`Push to DB for client ${name} with info: Street ${street}, City ${city}, State ${state}, ZIP ${zip}`);
        res.sendStatus(200);
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
        //PUSH TO DATABASE FOR SPECIFIC CLIENT HERE
        res.sendStatus(200);
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
        const address = req.body.address;
        const quantity = req.body.quantity;
        const deliveryDate = req.body.deliveryDate;
        const amount = req.body.amount;
        console.log(`Purchase confirmed: Address ${address}, Quantity ${quantity}, Delivery Date ${deliveryDate}, Amount ${amount}`);
        res.sendStatus(200);
    } catch(err) {
        console.log(err.message);
    }
});
app.post('/register', async(req, res)=> {
    try {
    console.log('Registered!');

    // DB REGISTRATION HERE

    res.sendStatus(200);
    } catch (err) {
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