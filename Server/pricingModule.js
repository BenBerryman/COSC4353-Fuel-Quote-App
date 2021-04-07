const mongoose = require('mongoose');

//User model import
const User = require('./models/userModel');

const getPrice = async(userID, gallons)=>
{
    const user = await User.findById(userID);
    if (!user)
    {
        throw '404';
    }
    const currentPrice = 1.5;
    const locationFactor = (user.UserInfo[0].state === 'TX') ? 0.02 : 0.04;
    const historyFactor = (user.History.length === 0) ? 0 : 0.01;
    const gallonsRequestedFactor = (gallons > 1000) ? 0.02 : 0.03;
    const companyProfitFactor = 0.1;

    const pricePerGal = currentPrice + currentPrice*(locationFactor - historyFactor +
        gallonsRequestedFactor + companyProfitFactor);
    return [pricePerGal, pricePerGal*gallons];

}

module.exports = {getPrice};