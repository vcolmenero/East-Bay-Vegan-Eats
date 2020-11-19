mongodb+srv://admin:1234@cluster0.owbib.mongodb.net/East-Bay_Vegan_Eats?retryWrites=true&w=majority

//require modules
const mongoose = require('mongoose')

//create the shortcut variable
const db = mongoose.connection


//connect to the database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true 
})

//listen for the connection
db.on('connected', function(){
    console.log(`connected to MongoDB on ${db.host}:${db.port}`)
})
