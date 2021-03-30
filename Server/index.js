const express = require('express');
const app = express();
const mongoose = require('mongoose');

//User model import
const User = require('./models/userModel')

const cors = require('cors');
const crypto = require('crypto-js');


//Database Connection
const URI = "mongodb+srv://fulr:fulr@cluster0.3vuf3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(URI, {

    useUnifiedTopology: true,
    useNewUrlParser: true

}).then(() => {

    console.log('Database Connection established')

})


/**********DATABASE CONNECTION TEST DELETE LATER**********************/
user = new User({

    email:'Mynameisbob223@gmail.com',
    password: 'asdasdjadasdhasjd', 

    UserInfo: [{firstname: 'Bob', lastname: 'King', street: '1234 Avenue blvd.',
    zip: 77407, city: 'Houston'}], 

    History:[{pricePerGallon: 1.50, gallons: 125678}]

})

user.save();

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
        let {name, street, city, state, zip} = req.body;

        console.log(`Push to DB for client ${name} with info: Street ${street}, City ${city}, State ${state}, ZIP ${zip}`);
        res.sendStatus(200);
    } catch(err) {
        console.log(err.message);
    }
});

//Update info on user profile
app.put('/mainProfile', async(req, res)=> {
    try {

        let {client, target, field, data} = req.body;

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
        let {email, password} = req.body;

        //Get salt and password hash from DB
        //const salt, storedHash = DB GET
        //hashedPassword = crypto.SHA3(salt + password).toString();
        //if (hashedPassword == storedHash) CORRECT PW


        console.log('Logged in!');
        res.sendStatus(200);
    } catch(err) {
        console.log(err.message);
    }
});

app.post('/purchaseConfirm', async(req, res)=>{
    try
    {
        const {address, quantity, deliveryDate, amount} = req.body;

        console.log(`Purchase confirmed: Address ${address}, Quantity ${quantity}, Delivery Date ${deliveryDate}, Amount ${amount}`);
        res.sendStatus(200);
    } catch(err) {
        console.log(err.message);
    }
});
app.post('/register', async(req, res)=> {
    try {

        const {email, password} = req.body;
        const salt = Math.random().toString(36).substring(10); //Password salting to prevent pre-computation attacks
        const hashedPassword = crypto.SHA3(salt + password).toString();

        // DB REGISTRATION HERE

        console.log('Registered!');
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