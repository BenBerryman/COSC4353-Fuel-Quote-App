/*const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const URI = "mongodb+srv://fulr:fulr@cluster0.3vuf3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


before(function(done){

    //connect to mongo
    mongoose.connect(URI); 
    
    //What to do once  connection  is successful
    mongoose.connection.once('open', function(){

    console.log('connection has been made');
    done();

}).on('error', function(error){

    console.log('Connection Error:', error);

    });

    //Drop the characters collection before each test
        beforeEach(function(done){

        //Drop the collection
        mongoose.connection.collections.users.drop(function(){

            done();

        });     

    });

});


*/

