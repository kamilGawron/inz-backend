const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/orders");
const Product = require("../models/products");
const utils = require("../utils/utils");

Order.collection.drop();

const { authenticateToken, ROLES, authRole } = require("../../services/auth");

utils.createAndSaveProducts();

router.get("/", (req, res, next) => {
  // find all orders in db
  Order.find()
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

const getServices = (services) => {
  const promisesArray = services.map((service) => {
    return Product.findById(service.productID).exec();
  });

  return Promise.all(promisesArray);
};

router.post("/", async (req, res, next) => {
  const apiServices = await getServices(req.body.services);

  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    reservationsTime: {
      from: req.body.reservationsTime.from,
      to: req.body.reservationsTime.to,
    },
    services: req.body.services.map((service) => {
      const apiService = apiServices.find(
        (e) => e._id.toString() === service.productID
      );
      return {
        productID: service.productID,
        amount: service.amount,
        name: apiService.name,
        description: apiService.description,
      };
    }),
    userData: req.body.userData,
  });

  order
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get(
  "/date/:date",
  authenticateToken,
  authRole(ROLES.ADMIN),
  (req, res, next) => {
    const date = req.params.date;
    const endDate = new Date(req.params.date);
    endDate.setDate(endDate.getDate() + 1);

    Order.find({
      "reservationsTime.from": { $gte: date, $lte: endDate },
    })
      .sort("reservationsTime.from")
      .exec()
      .then((doc) => {
        console.log(doc);
        res.status(200).json(doc);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
);

router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  res.status(201).json({ message: "Order details", orderId: id });
});

router.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;

  Order.deleteOne({ _id: id })
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
