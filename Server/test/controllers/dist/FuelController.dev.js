"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import purchases from '../core/fuel.js';
var purchases = require('../core/fuel');

var FuelController =
/*#__PURE__*/
function () {
  function FuelController() {
    _classCallCheck(this, FuelController);
  }

  _createClass(FuelController, null, [{
    key: "getAllPurchases",
    // Get all students
    value: function getAllPurchases(req, res) {
      return res.status(200).json({
        purchases: purchases,
        message: "All the Purchases"
      });
    } // Get a single student

  }, {
    key: "getSinglePurchase",
    value: function getSinglePurchase(req, res) {
      var findFuelPurchase = fuel.find(function (fuel) {
        return fuel.id === parseInt(req.params.id, 10);
      });

      if (findFuelPurchase) {
        return res.status(200).json({
          fuel: findFuelPurchase,
          message: "A single student record"
        });
      }

      return res.status(404).json({
        message: "Fuel Purchase record not found"
      });
    }
  }]);

  return FuelController;
}();

module.exports = FuelController;