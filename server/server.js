const express = require("express");
const mongoose = require("mongoose");
const usersRoute = require("./Routes/users");
const productRoute = require("./Routes/product");
const orderRoute = require("./Routes/order")
const shippingRoute = require("./Routes/shipping")
const imageRoute = require("./Routes/image")
const cookieSession = require("cookie-session");
const port = process.env.PORT || 5000;
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cookieSession({
    secret: process.env.SECRET || "secretkey",
    maxAge: 1000 * 60 * 60,
    httpOnly: false,
    keys: ["role"],
  })
);


//CORS handling
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header({
    "Access-Control-Allow-Origin": req.headers.origin,
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
  });
  next();
});

//Middlewares
app.use("/users", usersRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/shipping", shippingRoute);
app.use("/image", imageRoute);

//error handling
app.use((err, req, res, next) => {
  // use the error's status or default to 500
  res.status(err.statusCode || 500).send(err.message)
  console.log("Middleware", req.originalUrl)
})

//Connect to database
const options = { useUnifiedTopology: true, useNewUrlParser: true };
mongoose.connect("mongodb://localhost:27017/shoeshop", options, () => {
  console.log("Connected to database");
});

app.listen(port, () =>
  console.log("Express server up and running on port:", port)
);

module.exports = app;
