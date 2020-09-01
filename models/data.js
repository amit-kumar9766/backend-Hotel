const mongoose = require("mongoose");
const crypto = require("crypto")


var Schema = mongoose.Schema;

var Schema = new Schema({
    id:String,
    type: String,
    price: String,
    size: String,
    city:String,
    capacity: String,
    description:String,
    extras: Array
  });


  var dataSchema=mongoose.model('data',Schema);
  module.exports = dataSchema;