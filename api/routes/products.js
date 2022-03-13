require('dotenv').config();

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const Product = require("../models/products");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
})

const upload = multer({ storage: storage })

// drop Products that may already exits, also get rid off the duplicates
Product.collection.drop();

router.get("/", (req, res, next) => {
  // find all products in db
  Product.find()
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

router.post("/", upload.single("productImage"), (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    time: req.body.time,
    description: req.body.description,
    price: req.body.price,
  });

  if(req.file&&req.file.path){
    product.productImage=req.file.path
  }

  // store in db
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "POST /products",
        createdProductID: product._id,
        url: `http://localhost:8080/products/${product._id}`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;

  // find single product in db
  Product.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);
     
      if (doc) {
        res.status(200).json(doc);
      } else {
        // correct id length but no entry in DB
        res.status(404).json({ message: "No valid entry for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productId", upload.single("productImage"), (req, res, next) => {
  const id = req.params.productId;
  console.log(req.body)
  const product = new Product({
    name: req.body.name,
    time: req.body.time,
    description: req.body.description,
    price: req.body.price,
  });
  if(req.file&&req.file.path){
    product.productImage=req.file.path
  }

   Product.findByIdAndUpdate(id, { $set: product }, { new: true })
    .then((doc) => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  // remove product by id
  Product.deleteOne({ _id: id })
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
