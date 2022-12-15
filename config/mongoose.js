const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://parag:paragv011@tododb.wckgimv.mongodb.net/?retryWrites=true&w=majority");
// mongoose.connect("mongodb+srv://diogop:parag@_%5P%JiFg66hE*d-1ylat.mongodb.net/test?retryWrites=true")

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to db'));

db.once('open', function(){
    console.log('Connected to database :: MongoDB')
});

module.exports = db;