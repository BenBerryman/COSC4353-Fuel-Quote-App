// import purchases from '../core/fuel.js';
const purchases = require('../core/fuel');
class FuelController {
    // Get all students
    static getAllPurchases(req, res) {
          return res.status(200).json({
                purchases,
                message: "All the Purchases",
          });
    }
    // Get a single student
    static getSinglePurchase(req, res) {
           const findFuelPurchase = fuel.find(fuel => fuel.id === parseInt(req.params.id, 10));
           if (findFuelPurchase) {
               return res.status(200).json({
                     fuel: findFuelPurchase,
                     message: "A single student record",
               });
           }
           return res.status(404).json({
                 message: "Fuel Purchase record not found",
           });
    }
}
module.exports = FuelController;