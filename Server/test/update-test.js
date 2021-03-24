const assert = require('assert');
const User = require('../models/userModel')

//Describe Tests 
describe('Updating records', function(){

    var user;

    beforeEach(function(done){
 
    user = new User({

        name: 'Shahrukh',
        weight: 50

    });

    user.save().then(function(){

        done();

    });

});

    //Create Tests
    it('Updates one record in the DB', function(done){

        User.findOneAndUpdate({name: 'Shahrukh'},{name: 'Luigi'}).then(function(){

            User.findOne({_id: user._id}).then(function(result){

                assert(result.name === 'Luigi');
                done();

            });

        });

    });
    
    it('Increments one record in the DB by 1', function(done){

       User.updateMany({}, {$inc: {weight: 1}}).then(function(){

            User.findOne({name: 'Shahrukh'}).then(function(result){

                assert(result.weight === 51);
                done();

            })

       });

    });


});