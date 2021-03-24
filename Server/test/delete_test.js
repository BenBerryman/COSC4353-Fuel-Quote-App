const assert = require('assert');
const User = require('../models/userModel')

//Describe Tests 
describe('Deleting records', function(){

    var user;

    beforeEach(function(done){
 
 user = new User({

        name: 'Shahrukh',

    });

 user.save().then(function(){

        done();

    });

});


    //next test
    it('Deletes one record from the DB', function(done){
   
            User.findOneAndRemove({name: 'Shahrukh'}).then(function(){
                
                User.findOne({name: 'Shahrukh'}).then(function(result){

                    assert(result === null);
                    done();

                })

            })

    });

});