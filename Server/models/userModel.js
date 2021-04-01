const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    street: String,
    city: String,
    state: String,
    zip: Number
});

const QuoteHistorySchema = new Schema({
  
    street: String, 
    city: String, 
    state:String ,  
    zip: Number,
    deliveryDate: Date, 
    gallons: Number ,
    pricePerGallon: Number, 
    amount: Number
});

const AuthenticationSchema = new Schema({
    
    email:String,
    hashedPassword: String,
    salt: String,

    UserInfo: [UserSchema],
    History: [QuoteHistorySchema]
});

const User = mongoose.model('users', AuthenticationSchema);
module.exports  = User;