const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI).then((data)=> {console.log(`mongoDB connected at ${data.connection.host}`)});