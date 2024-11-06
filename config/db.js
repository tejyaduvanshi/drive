const mongoose = require('mongoose');


function connectToDB(){
    mongoose.connect('mongodb://0.0.0.0/men-drive').then(()=>
        console.log('Connected to DB')
)}

module.exports= connectToDB;