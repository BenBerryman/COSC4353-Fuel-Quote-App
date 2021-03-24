const assert = require('assert');
const User = require('../models/userModel')

//Describe Tests 
describe('Finding records', function(){

    var user;

    beforeEach(function(done){
 
    user = new User({

        name: 'Mario',

    });

    user.save().then(function(){

        done();

    });

});

    //Create Tests
    it('Finds one record by ID from the DB', function(done){

        User.findOne({_id: user._id}).then(function(result){

            assert(result._id.toString() === user._id.toString());
            done();

        })

    });

    //next test
    it('Finds one record from the DB', function(done){

        User.findOne({name: 'Mario'}).then(function(result){

            assert(result.name === 'Mario');
            done();

        })

    });

});