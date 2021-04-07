const express = require('express');
const app = express();
const mongoose = require('mongoose');

//User model import
const User = require('./models/userModel');
const pricing = require('./pricingModule');
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
                street: street,
                city: city,
                state: state,
                zip: zip
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

        let {userID, field, data} = req.body;
        User.findById(userID, (error, user)=>{
            if (!user) {
                res.sendStatus(404);
            }
            else {
                console.log(data);
                if (field == 'street') {
                    user.UserInfo[0].street = data;
                } else if (field =='city') {
                    user.UserInfo[0].city = data;
                } else if (field == 'state') {
                    user.UserInfo[0].state = data;
                } else if (field == 'zip') {
                    user.UserInfo[0].zip = data;
                }
                user.save();
                res.sendStatus(200);
            }
        });
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
        const {userID, gallons, deliveryDate} = req.body;
        const prices = await pricing.getPrice(userID, gallons);
        User.findById(userID, (error, user)=>{
            if (error)
            {
                res.sendStatus(500); //500=Internal error
            }
            const street = user.UserInfo[0].street;
            const city = user.UserInfo[0].city;
            const state = user.UserInfo[0].state;
            const zip = user.UserInfo[0].zip;
            user.History.push({
                    street: street,
                    city: city,
                    state: state,
                    zip: zip,
                    gallons: gallons,
                    deliveryDate: deliveryDate,
                    pricePerGallon: prices[0],
                    amount: prices[1]
                });
            user.save();
            res.sendStatus(200);
        });
    } catch(err) {
        console.log(err.message);
    }
});

app.post('/price', async(req, res)=> {
    try {
        const {userID, gallons} = req.body;
        const prices = await pricing.getPrice(userID, gallons);
        res.status(200).json({
            pricePerGal: prices[0],
            amtDue: prices[1]
        });
    } catch (err) {
        if (err == '500')
        {
            res.sendStatus(500);
        }
        else if (err == '404')
        {
            res.sendStatus(404);
        }
        console.log(err.message);
    }
});

app.post('/register', async(req, res)=> {
    try {
        const {email, password} = req.body;
        const salt = Math.random().toString(36).substring(3); //Password salting to prevent pre-computation attacks
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