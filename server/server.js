const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var mongoose = require('mongoose')
const PORT = 4000;



app.use(cors());
app.use(bodyParser.json());


var mongo_Url = 'mongodb://harshit987:h8a1r18s19@ds139934.mlab.com:39934/mydb'
mongoose.connect(
  mongo_Url,
  { useNewUrlParser: true }
)
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.on('connected',() => {
  console.log('Connected to MongoDB');
});

const user=require('./routes/api/signin');
app.use('/api/account',user);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

