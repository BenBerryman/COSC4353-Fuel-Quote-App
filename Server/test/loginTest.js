const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('../index');
const User = require('../models/userModel');

chai.should();
chai.use(chaiHTTP);
describe('Login', () => {
    it('/POST register', (done) => {
        chai.request(app)
            .post('/register')
            .send({
            'email' : 'johndoe@example.com',
            'password' : 'johndoe'
            })
            .end((err, res) => {
                if (err) {done(err)};
                res.body['userID'].should.not.be.null;
                res.should.have.status(200);
                done();
        });
    });
    describe('/POST login', () => {
        it('Correct login', (done) => {
            chai.request(app)
                .post('/login')
                .send({
                    'email' : 'johndoe@example.com',
                    'password' : 'johndoe'
                })
                .end((err, res) => {
                    if (err) {done(err)};
                    res.body['userID'].should.not.be.null;
                    res.should.have.status(200);
                    done();
                });
        });

        it('Incorrect login', (done) => {
            chai.request(app)
                .post('/login')
                .send({
                    'email' : 'johndoe@example.com',
                    'password' : 'janedoe'
                })
                .end((err, res) => {
                    if (err) {done(err)};
                    res.should.have.status(401);
                    done();
                });
        });
    });


    it('/GET getUserById', (done) => {
        User.findOne({email: 'johndoe@example.com'}).then((res)=> {
            chai.request(app)
                .get('/getUserById')
                .query({'userID' : res._id.toString()})
                .end((err, res) => {
                    if (err) {done(err)};
                    res.should.have.status(200);
                    done();
                });
        });
    });

});
