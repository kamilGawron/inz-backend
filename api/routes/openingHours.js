const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const OpeningHour = require("../models/openingHours");

OpeningHour.collection.drop();

const utils = require("../utils/utils");
utils.createAndSaveOpeningHours();

router.get("/", (req, res, next) => {
  // find all orders in db
  OpeningHour.find()
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
