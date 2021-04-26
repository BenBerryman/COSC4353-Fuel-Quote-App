const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = 'http://localhost:5000';
// const setPricingData = require("../inputPricingData")

chai.should()
describe("inputPricingData setPricingData Function", () => {
    it("Check If It A Function", (done) => {
      chai.request(server)
          .post('/price')
          .send({
              '_method' : 'post',
              'userID' : '606d00b45e9c9b728c9ee5f2',
              'gallons' : 100
          })
          .end((error, response) => {
              response.should.have.status(200);
          });
      done();
    })
    // it("Check If It Doesn't Throws An Error", (done) => {
    //   chai.expect(setPricingData).not.to.throw()
    //   done()
    // })
    // it("Check If It Is Not Null", (done) => {
    // chai.assert.isNotNull(setPricingData)
    //   done()
    // })
});
