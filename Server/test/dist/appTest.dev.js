"use strict";

var chai = require('chai');

var assert = require('chai').assert;

var app = require('../app');

var chaiHttp = require('chai-http'); //Asserstion style


chai.should();
chai.use(chaiHttp);
describe('Fuel Routes', function () {
  //Tests to be performed
  describe('Post Routes tested here.', function (done) {
    //Purchase simulation.
    it('Fuel Purchase Simulation', function (done) {
      chai.request(app).get('/purchase').end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });
    it('Home Page', function (done) {
      chai.request(app).get('/').end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });
    it('it should show status of register', function (done) {
      chai.request(app).get('/register').end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });
    it('if you visit the wrong register route', function (done) {
      chai.request(app).get('/registers').end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });
    it('Login route', function (done) {
      chai.request(app).get('/login').end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.length.should.be.eq(2);
        done();
      });
    });
    it('Logout route', function (done) {
      chai.request(app).get('/logout').end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('session');
        res.body.should.have.property('session');
        res.body.should.have.property('delete');
        done();
      });
    });
    it('Logout route', function (done) {
      chai.request(app).get('/logoutd').end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });
  }); //3.home
  //4.Logout.
  //5.Order.
});