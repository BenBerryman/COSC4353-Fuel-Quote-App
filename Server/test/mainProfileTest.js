const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('../index');
const User = require('../models/userModel');

chai.should();
chai.use(chaiHTTP);
require('./loginTest');
describe('Main Profile', () => {
    it('/POST mainProfile', (done) => {
        User.findOne({email: 'johndoe@example.com'}).then((res)=> {
            chai.request(app)
                .post('/mainProfile')
                .send({
                    'userID' : res._id,
                    'firstName' : 'John',
                    'lastName' : 'Doe',
                    'street' : '4385 Example Way',
                    'city' : 'Dallas',
                    'state' : 'TX',
                    'zip' : '77056'
                })
                .end((err, res) => {
                    if (err) {done(err)};
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe('/PUT mainProfile', ()=> {
        it('Benign input', (done) => {
            User.findOne({email: 'johndoe@example.com'}).then((res)=> {
                chai.request(app)
                    .put('/mainProfile')
                    .send({
                        'userID' : res._id,
                        'field' : 'street',
                        'data' : '4385 Example Boulevard'
                    })
                    .end((err, res) => {
                        if (err) {done(err)};
                        res.should.have.status(200);
                        done();
                    });
            });
        });

        it('Invalid alphanumeric input', (done) => {
            User.findOne({email: 'johndoe@example.com'}).then((res)=> {
                chai.request(app)
                    .put('/mainProfile')
                    .send({
                        'userID' : res._id,
                        'field' : 'street',
                        'data' : '4385 Example Way%$'
                    })
                    .end((err, res) => {
                        if (err) {done(err)};
                        res.should.have.status(403);
                        done();
                    });
            });
        });

        it('Invalid numeric input', (done) => {
            User.findOne({email: 'johndoe@example.com'}).then((res)=> {
                chai.request(app)
                    .put('/mainProfile')
                    .send({
                        'userID' : res._id,
                        'field' : 'zip',
                        'data' : '77056abcd'
                    })
                    .end((err, res) => {
                        if (err) {done(err)};
                        res.should.have.status(403);
                        done();
                    });
            });
        });

        it('Invalid state input', (done) => {
            User.findOne({email: 'johndoe@example.com'}).then((res)=> {
                chai.request(app)
                    .put('/mainProfile')
                    .send({
                        'userID' : res._id,
                        'field' : 'state',
                        'data' : 'PC'
                    })
                    .end((err, res) => {
                        if (err) {done(err)};
                        res.should.have.status(403);
                        done();
                    });
            });
        });
    });
});
