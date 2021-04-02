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

});

// /**********DATABASE CONNECTION TEST DELETE LATER**********************/
// /* open compass while running to see interaction */
// user = new User({
//
//     email:'Mynameisbob223@gmail.com',
//     password: 'asdasdjadasdhasjd',
//
//     UserInfo: [{firstname: 'Bob', lastname: 'King', street: '1234 Avenue blvd.',
//     zip: 77407, city: 'Houston'}],
//
//     History:[{pricePerGallon: 1.50, gallons: 125678}]
//
// });
//
//
// user.save().then(() => {
//
//     console.log('Item stored in DB, will take 10 seconds to delete....')
//
// });
//
//
//
// function clearTest(){
//
//     User.deleteOne({_id: user._id}).then(() => {
//
//         console.log('Removed item from DB');
//
//     })
//
// }
//
// //Clears Test after some time so you can see the database interaction
// setTimeout(clearTest, 10000);

// middleware
app.use(cors());
app.use(express.json());      //req.body



//ROUTES

//Setup user profile for first time
app.post('/mainProfile', async(req, res)=>{
    try
    {
        let {userID, name, street, city, state, zip} = req.body;
        let firstName = name.split(' ')[0];
        let lastName = name.split(' ')[1];
        User.findById(userID, (error, user)=> {
            user.UserInfo = {
                firstName: firstName,
                lastName: lastName,
                street1: street,
                city1: city,
                state1: state,
                zip1: zip
            };
            user.save();
        });
        res.sendStatus(200);
    } catch(err) {
        console.log(err.message);
    }
});

app.get('/getUserById', async(req, res)=> {
    try {
        const {userID} = req.query;
        User.findById(userID, function(error, user){
            if (!user)
            {
                res.sendStatus(404);
            }
            else
            {
                res.status(200).json({
                    history: user.History,
                    userInfo: user.UserInfo
                });
            }
        });
    } catch (err) {
        console.log(err.message);
    }
});

//Update info on user profile
app.put('/mainProfile', async(req, res)=> {
    try {

        let {client, target, field, data} = req.body;

        console.log(`Push to DB for client ${client} with target ${target}, field ${field}, and data ${data}`);
        //TODO User Profile Update
        //PUSH TO DATABASE FOR SPECIFIC CLIENT HERE
        res.sendStatus(200);
    } catch(err) {
        console.log(err.message);
    }
});

app.post('/login', async(req, res)=>{
    try
    {
        let {email, password} = req.body;
        User.findOne({email: email}).then((user)=> {
            if (!user) //User with this email does not exist
            {
                res.sendStatus(404); //404 = Not found
            }
            else
            {
                //Get salt and password hash from DB
                const salt = user.salt;
                const storedHash = user.hashedPassword;
                const hashedPassword = crypto.SHA3(salt + password).toString();
                if (hashedPassword === storedHash) //Correct Password
                {
                    const userID = user.id;
                    res.status(200).json({userID: userID});
                }
                else //Incorrect Password
                {
                    res.sendStatus(401); //401 = Unauthorized
                }
            }
        })

    } catch(err) {
        console.log(err.message);
    }
});

app.post('/purchaseConfirm', async(req, res)=>{
    try
    {
        const {address, quantity, deliveryDate, amount} = req.body;
        //TODO Fuel Quote Purchase
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

        var user = new User({
            email: email,
            hashedPassword: hashedPassword,
            salt: salt
        });
        user.save((error, user)=> {
            const userID = user.id;
            res.status(200).json({userID: userID});
        });

    } catch (err) {
        console.log(err.message);
    }
});

// set up the server listening at port 5000 (the port number can be changed)
app.listen(5000, ()=>{
    console.log("Back-end/database server started on port 5000. Press Ctrl-C to exit.");
});