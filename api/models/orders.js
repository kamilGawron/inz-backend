const mongoose = require("mongoose");

const reservationsTimeSchema = mongoose.Schema({
  from: Date,
  to: Date,
});

const userDataSchema = mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  phone: String,
});

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  reservationsTime: reservationsTimeSchema,
  services: [
    {
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      amount: {
        type: Number,
        default: 1,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
    },
  ],
  userData: userDataSchema,
});

module.exports = mongoose.model("Order", orderSchema);
