const assert = require('assert');
const User = require('../models/userModel');

//Describe Tests 
describe('Saving records', function(){
    
    console.log('Connection Successfully established.....')
    //Create Tests
    it('saves a record to the DB', function(){

        var person = new User({

            email: 'bobisthebest23@gmail.com',
            UserInfo: [{firstName: 'bob', lastName: 'crazy' }]

        });

        person.save().then(function(){

            assert(person.isNew === false);

        });

    });

});