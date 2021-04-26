const chai = require('chai');
const Pricing = require('../models/Pricing');
const ClientProfile = require('../models/ClientProfile');
const FuelQuote = require('../models/FuelQuote');
const UserCredentials = require('../models/UserCredentials');
chai.should()

describe("Models Unit Testing", () => {
  describe("Pricing Model", () => {
      it("Check If It A Function", (done) => {
        chai.assert.isFunction(Pricing, "Its Not A Function")
        done()
      })
      it("Check If It Is Not Null", (done) => {
      chai.assert.isNotNull(Pricing)
        done()
      })
  })
  describe("ClientProfile Model", () => {
      it("Check If It A Function", (done) => {
        chai.assert.isFunction(ClientProfile, "Its Not A Function")
        done()
      })
      it("Check If It Is Not Null", (done) => {
      chai.assert.isNotNull(ClientProfile)
        done()
      })
  })
  describe("FuelQuote Model", () => {
      it("Check If It A Function", (done) => {
        chai.assert.isFunction(FuelQuote, "Its Not A Function")
        done()
      })
      it("Check If It Is Not Null", (done) => {
      chai.assert.isNotNull(FuelQuote)
        done()
      })
  })
  describe("UserCredentials Model", () => {
      it("Check If It A Function", (done) => {
        chai.assert.isFunction(UserCredentials, "Its Not A Function")
        done()
      })
      it("Check If It Is Not Null", (done) => {
      chai.assert.isNotNull(UserCredentials)
        done()
      })
  })
})
