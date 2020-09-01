const express= require('express')
//const User = require("../models/user");
const dataSchema = require("../models/data");

const data2= [];

// app.post('/data',(req,res)=>{
//   let {id ,price ,RoomType,noOfRooms,desc,Info,src,}=req.body

//   var myData = new dataSchema( {id ,price ,RoomType,noOfRooms,desc,Info,src,});
//   myData.save()
//     .then(item => {
//       res.json(item);
//     })
//     .catch(err => {
//       res.status(400).send("unable to save to database");
//     });

// })

exports.getUsers=(req,res)=>{
  dataSchema.find({}, function(err, data){
    res.json(data)
  });
}


exports.getUser=(req, res)=> {
  let id = req.params.id;
  console.log(id)
  dataSchema.findById(id, function(err, x) {
      res.json(x);
  });
};

exports.createUser=(req, res)=> {
  let data = new dataSchema(req.body);
  data.save()
      .then(data => {
          res.status(200).json({'data': 'data added successfully'});
      })
      .catch(err => {
          res.status(400).send('adding new data failed');
      });
};

exports.updateUser=(req,res)=>{
  dataSchema.findById(req.params.id, function(err, data) {
    if (!data)
        res.status(404).send("data is not found");
    else
        data.id = req.body.id;
        data.price = req.body.price;
        data.noOfRooms = req.body.noOfRooms;
        data.save().then(data => {
            res.json('data updated!');
        })
        .catch(err => {
            res.status(400).send("Update not possible");
        });
});
}



exports.deleteUser=(req, res, next) => {
  dataSchema.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)       //what is next??
}

//===========================================//
//Signup and login logics

// exports.signup= function(req, res){
//   var newUser = new User({name: userName,email:userEmail});
  
//   User.register(newUser, userPassword, function(err, user){
//   if(err){
//   res.send(err);
//   }
//   passport.authenticate("local")(req, res, function(){
//   req.send("success", "Successfully Signed Up! Nice to meet you " + req.body.name);
//   });
// });
// };





//=============================================================
//Payment route
const stripe = require("stripe")("pk_test_51HKJEjCzABIH7VoYTMffatp3AL2x7jpEPQxqq0INDbx23QSXKIi2oFLaAruHTgTCy8jiH9KavUVLPN4L93qjLmMq00CRqpKOu8STRIPE_SECRET_KEY");


exports.payment=(req, res) => {
  res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
};

exports.checkPayment=(async (req, res) => {
     console.log("Request:", req.body);
 
    const { product, token } = req.body;
    const idempotency_key = uuid();

    return  stripe.customers.create({
      email: token.email,
      source: token.id,
    }).then(customer=>{
      stripe.charges.create({
            amount:product.price*100,
            currency:'usd',
            customer:customer.id,
            receipt_email:token.email,
            description:product.name,

      },{idempotency_key}) 
    })
    .then(result=>res.status(200).json(result))
    .catch(err=>console.log(err))
  
  
  })