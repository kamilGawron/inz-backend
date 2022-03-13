const Product = require("../models/products");
const OpeningHour = require("../models/openingHours");
const mongoose = require("mongoose");

const services = [
  {
    name: "Strzyżenie męskie",
    time: 25,
    description: "maszynką",
    price: 45,
  },
  {
    name: "Strzyżenie męskie",
    time: 45,
    description: "nożyczkami",
    price: 70,
  },
  {
    name: "Broda i wąsy",
    time: 90,
    description: "",
    price: 150,
  },
  {
    name: "Cover 5",
    time: 15,
    description: "zabieg dla mężczyzn",
    price: 40,
  },
  {
    name: "Strzyżenie grzywki",
    time: 15,
    description: "",
    price: 30,
  },
  {
    name: "Strzyżenie damskie",
    time: 90,
    description: "z modelowaniem",
    price: 120,
  },
  {
    name: "Modelowanie włosów",
    time: 90,
    description: "z modelowaniem",
    price: 120,
  },
  {
    name: "Farbowanie (strzyżenie i modelowanie)",
    time: 90,
    description: "lnoa, majirel, dia light, dia richesse, luo",
    price: 120,
  },
];

const openingHours = [
  { weekDay: 1, from: "8", to: "22" },
  { weekDay: 2, from: "8", to: "22" },
  { weekDay: 3, from: "8", to: "22" },
  { weekDay: 4, from: "8", to: "22" },
  { weekDay: 5, from: "8", to: "22" },
  { weekDay: 6, from: "8", to: "13" },
];

const createAndSaveOpeningHours = () => {
  openingHours.forEach((openingHour) => {
    const tmpOpeningHour = new OpeningHour({
      _id: new mongoose.Types.ObjectId(),
      ...openingHour,
    });

    tmpOpeningHour
      .save()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const createAndSaveProducts = () => {
  services.forEach((service) => {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      ...service,
    });

    product
      .save()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

module.exports = { createAndSaveProducts, createAndSaveOpeningHours };
