const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middleware/errorMiddleware');
const dotenv = require('dotenv');
dotenv.config({path:"./config.env"});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload());


//routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes  = require('./routes/orderRoutes');
const cartRoutes  = require('./routes/cartRoutes');
const paymentRoutes  = require('./routes/paymentRoutes');

app.use("/api/v1", userRoutes)
app.use("/api/v1", productRoutes)
app.use("/api/v1", orderRoutes)
app.use("/api/v1", cartRoutes)
app.use("/api/v1", paymentRoutes)


//middleware for errors
app.use(errorMiddleware);


module.exports = app;