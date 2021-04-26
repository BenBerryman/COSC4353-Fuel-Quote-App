const mongoose = require("mongoose")

const fuelQuoteSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true,
    min: 8
  },
  userFuelQuotes: [
    {
      fuelType: {
        type: String,
        required: true,
      },
      gallons: {
        type: Number,
        required: true
      },
      deliveryAddress: {
        type: String,
        required: true,
      },
      deliveryDate: {
        type: Date,
        required: true,
      },
      price: {
        type: Number,
        required: true
      },
      totalAmount: {
        type: Number,
        required: true
      },
      dateCreated: {
        type: Date,
        default: Date.now
      },
      state: {
        type: String,
        required: true
      }
    }
  ]
})

module.exports = mongoose.model("FuelQuote", fuelQuoteSchema)
