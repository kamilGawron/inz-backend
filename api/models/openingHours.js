const mongoose = require("mongoose");

const openingHour = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  weekDay:{ 
    type: Number,
    required: true,
  },
  from: { 
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("OpeningHour", openingHour);
