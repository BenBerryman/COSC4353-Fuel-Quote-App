const express = require('express');
const app = express();
// const pool = require('./db');
const cors = require('cors');


// middleware
app.use(cors());
app.use(express.json());      //req.body

//ROUTES

// pool.connect(async(err, client, done) => {
//
//     done();
// });

app.get('/', async(req, res)=>{
    try{

    }
    catch(err){
        console.log(err.message);
    }
});

app.post('/', async(req, res)=>{
    try
    {

    } catch(err) {
        console.log(err.message);
    }
});

app.put('/mainProfile', async(req, res)=> {
    try {


        let data = req.body.data;
        console.log("Push to DB for client ___ with data " + data);
        //PUSH TO DB FOR SPECIFIC CLIENT HERE

    } catch(err) {
        console.log(err.message);
    }
})

app.delete('/', async(req, res) => {
    try {

    } catch(err) {
        console.log(err.message);
    }
});


// set up the server listening at port 5000 (the port number can be changed)
app.listen(5000, ()=>{
    console.log("Database server started on port 5000");
});