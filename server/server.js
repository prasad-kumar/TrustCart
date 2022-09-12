const app = require('./app');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

//uncaughtException error handling

process.on('uncaughtException', (err)=>{
    console.log(`sutting down server due to ${err.message}`);
    process.exit(1);
})

// dotenv config
dotenv.config({path:"./config.env"});
const port = process.env.PORT || 8000;

//database connection
const db = require('./db/connect');

//cloudinary config
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const server = app.listen(port, ()=>{console.log(`server connected at http://localhost:${process.env.PORT} `)});

process.on('unhandledRejection', (err)=> {
    console.log(`sutting down server due to ${err.message}`);
    server.close(()=>{
        process.exit(1);
    })
})