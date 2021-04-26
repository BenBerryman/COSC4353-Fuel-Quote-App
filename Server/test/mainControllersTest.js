const chai = require('chai');
const mainControllers = require('../controllers/mainControllers');

chai.should()

describe("mainControllers File", () => {
  describe("Validation Main File", () => {
    it("Check If It returns An Object", (done) => {
      mainControllers.should.be.an('object')
        done()
    })
  })
  describe("mainControllers login Function", () => {
      it("Check If It A Function", (done) => {
        chai.assert.isFunction(mainControllers.login, "Its Not A Function")
        done()
      })
      it("Check If It Doesn't Throws An Error", (done) => {
        chai.expect(mainControllers.login).not.to.throw()
        done()
      })
  })
  describe("mainControllers register Function", () => {
      it("Check If It A Function", (done) => {
        chai.assert.isFunction(mainControllers.register, "Its Not A Function")
        done()
      })
      it("Check If It Doesn't Throws An Error", (done) => {
        chai.expect(mainControllers.register).not.to.throw()
        done()
      })
  })
  describe("mainControllers clientProfile Function", () => {
      it("Check If It A Function", (done) => {
        chai.assert.isFunction(mainControllers.clientProfile, "Its Not A Function")
        done()
      })
      it("Check If It Doesn't Throws An Error", (done) => {
        chai.expect(mainControllers.clientProfile).not.to.throw()
        done()
      })
  })
  describe("mainControllers fuelQuote Function", () => {
      it("Check If It A Function", (done) => {
        chai.assert.isFunction(mainControllers.fuelQuote, "Its Not A Function")
        done()
      })
      it("Check If It Doesn't Throws An Error", (done) => {
        chai.expect(mainControllers.fuelQuote).not.to.throw()
        done()
      })
  })
  describe("mainControllers indexHomepage Function", () => {
      it("Check If It A Function", (done) => {
        chai.assert.isFunction(mainControllers.indexHomepage, "Its Not A Function")
        done()
      })
  })
  describe("mainControllers homepageRegister Function", () => {
      it("Check If It A Function", (done) => {
        chai.assert.isFunction(mainControllers.homepageRegister, "Its Not A Function")
        done()
      })
  })
  describe("mainControllers homepageClientProfile Function", () => {
      it("Check If It A Function", (done) => {
        chai.assert.isFunction(mainControllers.homepageClientProfile, "Its Not A Function")
        done()
      })
      it("Check If It Doesn't Throws An Error", (done) => {
        chai.expect(mainControllers.homepageClientProfile).not.to.throw()
        done()
      })
  })
  describe("mainControllers homepageDashboard Function", () => {
      it("Check If It A Function", (done) => {
        chai.assert.isFunction(mainControllers.homepageDashboard, "Its Not A Function")
        done()
      })
      it("Check If It Doesn't Throws An Error", (done) => {
        chai.expect(mainControllers.homepageDashboard).not.to.throw()
        done()
      })
  })
  describe("mainControllers homepageFuelQuote Function", () => {
      it("Check If It A Function", (done) => {
        chai.assert.isFunction(mainControllers.homepageFuelQuote, "Its Not A Function")
        done()
      })
      it("Check If It Doesn't Throws An Error", (done) => {
        chai.expect(mainControllers.homepageFuelQuote).not.to.throw()
        done()
      })
  })
  describe("mainControllers homepageFuelQuoteHistory Function", () => {
      it("Check If It A Function", (done) => {
        chai.assert.isFunction(mainControllers.homepageFuelQuoteHistory, "Its Not A Function")
        done()
      })
      it("Check If It Doesn't Throws An Error", (done) => {
        chai.expect(mainControllers.homepageFuelQuoteHistory).not.to.throw()
        done()
      })
  })
  describe("mainControllers error404 Function", () => {
      it("Check If It A Function", (done) => {
        chai.assert.isFunction(mainControllers.error404, "Its Not A Function")
        done()
      })
  })
})
