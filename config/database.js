//mongodb+srv://admin:1234@cluster0.owbib.mongodb.net/East-Bay_Vegan_Eats?retryWrites=true&w=majority

//require modules
const mongoose = require('mongoose')

//create the shortcut variable
const db = mongoose.connection


//connect to the database

mongoose.connect("mongodb+srv://admin:1234@cluster0.owbib.mongodb.net/East-Bay_Vegan_Eats?retryWrites=true&w=majority", {
  	useNewUrlParser: true, 
  	useCreateIndex: true, 
  	useUnifiedTopology: true
});

// shortcut to mongoose.connection object


db.on('connected', function() {
console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});


//listen for the connection
db.on('connected', function(){
    console.log(`connected to MongoDB on ${db.host}:${db.port}`)
})

// mongodb error / success ===============
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
// db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));