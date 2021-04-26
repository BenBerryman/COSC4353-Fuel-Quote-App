const chai = require('chai');
const setPricingData = require("../inputPricingData")

chai.should()
describe("inputPricingData setPricingData Function", () => {
    it("Check If It A Function", (done) => {
      chai.assert.isFunction(setPricingData, "Its Not A Function")
      done()
    })
    it("Check If It Doesn't Throws An Error", (done) => {
      chai.expect(setPricingData).not.to.throw()
      done()
    })
    it("Check If It Is Not Null", (done) => {
    chai.assert.isNotNull(setPricingData)
      done()
    })
})
