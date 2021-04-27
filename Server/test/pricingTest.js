const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('../index');
const User = require('../models/userModel');

chai.should();
chai.use(chaiHTTP);
require('./mainProfileTest');
describe('Pricing Module', () => {
    describe('/POST price', () => {
        it('User exists', (done) => {
            User.findOne({email: 'johndoe@example.com'}).then((res)=> {
                chai.request(app)
                    .post('/price')
                    .send({
                        'userID' : res._id,
                        'gallons' : '100'
                    })
                    .end((err, res) => {
                        if (err) {done(err)};
                        res.should.have.status(200);
                        done();
                    });
            })
        });
        it('User does not exist', (done) => {
            chai.request(app)
                .post('/price')
                .send({
                    'userID' : 'aaaaaaaaaaaaaaaaaaaaaaaa',
                    'gallons' : '100'
                })
                .end((err, res) => {
                    if (err) {done(err)};
                    res.should.have.status(404);
                    done();
                });
        });
    })

    it('/POST purchaseConfirm', (done) => {
        let date = new Date();
        date.setDate(date.getDate()+5);
        User.findOne({email: 'johndoe@example.com'}).then((res)=> {
            chai.request(app)
                .post('/purchaseConfirm')
                .send({
                    'userID' : res._id,
                    'gallons' : '100',
                    'deliveryDate' : date
                })
                .end((err, res) => {
                    if (err) {done(err)};
                    res.should.have.status(200);
                    done();
                });
        })

    });


});
