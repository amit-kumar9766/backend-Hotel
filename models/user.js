const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: String,
  password: String,
  username:String
});

module.exports = mongoose.model("User", user);

//==============================================================
// const mongoose = require("mongoose");
// const crypto = require("crypto")



// const userSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true, minlength: 5 },
//     name: { type: String },
//   });
  
//  // userSchema.plugin(passportLocalMongoose)
  
//   const User = mongoose.model("user", userSchema);

//   module.exports = User;

  