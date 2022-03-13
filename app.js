const express = require("express");
const app = express();
var cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/user");
const openingHoursRoutes = require("./api/routes/openingHours");

app.use(cors());
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//handle CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Headers", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);
app.use("/opening-hours", openingHoursRoutes);

// create and forward all errors if you could not pass previous routes
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status(404);
  next(error);
});

//handle all errors here:
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
