var chai = require('chai');
const assert = require('chai').assert;
const app = require('../app');
let chaiHttp = require('chai-http');

//Asserstion style
chai.should();

chai.use(chaiHttp);

describe('Fuel Routes', () => {
    //Tests to be performed

    describe('Post Routes tested here.', (done) => {
        it('it should show status of register', (done) => {
            chai.request(app)
                .get('/register')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.length.should.be.eq(3);
                done();
                });
        });
        it('if you visit the wrong register route', (done) => {
            chai.request(app)
                .get('/registers')
                .end((err, res) => {
                    res.should.have.status(404);
                done();
                });
        });
        it('Login route', (done) => {
            chai.request(app)
                .get('/login')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.length.should.be.eq(2);
                    done();
                });


        });
        it('Logout route', (done) => {
            chai.request(app)
                .get('/logout')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('session');
                    res.body.should.have.property('delete');

                    done();
                });
        });
        it('Logout route', (done) => {
            chai.request(app)
                .get('/logoutd')
                .end((err, res) => {
                    res.should.have.status(404);      
                    done();
                });
        });

    
    });
    
    //3.home
    //4.Logout.
    //5.Order.
});
