//installing packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const session = require('express-session');

//imported global error handler and utility functions 
const globalErrorHandler = require('./src/helpers/errorHandler');


//call database and sync
require('./src/models/index');
require('./src/models/sync');


//imprting api routes
const authRouter = require("./src/route/auth");
const walletRouter = require("./src/route/wallet");
const donationRouter = require("./src/route/donation");
const transactionRouter = require("./src/route/transactionPin");

// create an express app
const app = express()



//middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));




// Enable CORS
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);



//basic routes
app.get( "/", (req,res) => {
    res.status(200).json({
      message: "Fastamoni Backend Test"
    })
})


//routes as middleware
app.use("/api/auth", authRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/donation", donationRouter);
app.use("/api/pin", transactionRouter);



// Handle undefined routes
app.all("*", (req, res, next) => {
  const message = `Can't find ${req.originalUrl} on this server!`;
  return next(new AppError(message, 404));
});


// Global error handler
app.use(globalErrorHandler);


//my port
const port = process.env.PORT||7000

app.listen( port, () =>{
   console.log(`Server is listening on port ${port}.`)
})