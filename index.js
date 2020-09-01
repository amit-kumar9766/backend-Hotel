
//const port = 8000
const passportLocalMongoose=require('passport-local-mongoose')
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
//const passportLocal = require("passport-local").Strategy;
const LocalStrategy = require("passport-local");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const { v4: uuidv4 } = require('uuid')
const User = require("./models/user");
//=============================================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react connecting 
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------


const  usersRoutes =require("./routes/users.js");


app.use("/", usersRoutes);
app.use(cookieParser('secret'))

app.use(bodyParser.json())

mongoose.connect('mongodb+srv://Amit:Amit@123@cluster0.yiy2q.mongodb.net/Cluster0?retryWrites=true&w=majority',
{useNewUrlParser:true},()=>console.log('connected to db'))

// var conn1=mongoose.createConnection('mongodb+srv://Amit:Amit@123@cluster0.yiy2q.mongodb.net/Cluster1?retryWrites=true&w=majority',
// {useNewUrlParser:true},()=>console.log('connected to db'))


// PASSPORT CONFIGURATION
// app.use(require("express-session")({
// secret: "Once again Rusty wins cutest dog!",
// resave: false,
// saveUninitialized: false
// }));

// //app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(function(req, res, next){
// res.locals.currentUser = req.user;
// res.locals.success = req.flash('success');
// res.locals.error = req.flash('error');
// next();
// }); 





//====================================================/


// Routes
app.post("/login", (req, res, next) => {
  console.log(req.body.password);
  console.log(req.body.email)
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    console.log(user)
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(user);
        console.log(req.user);
      });
    }
  })(req, res, next);
});


app.post("/register", (req, res) => {
  console.log(req.body.username,req.body.password,req.body.email)
  User.findOne({ username:req.body.username}, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
       console.log("hashed", hashedPassword);
      const newUser = new User({
        name: req.body.name,
        password: hashedPassword,
        username:req.body.username,
      });
      await newUser.save()
      .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(400).send('adding new data failed');
    });
      // res.send("User Created");
    }
  });
});
app.get("/user", (req, res) => {
  res.send(req.user); //  the entire user that has been authenticated.
});
//----------------------------------------- END OF ROUTES---------------------------------------------------



//Start Server
app.listen(5000, () => {
  console.log('Example app listening at http://localhost:5000')
})



//======================================================/















// const stripe = require("stripe")("pk_test_51HKJEjCzABIH7VoYTMffatp3AL2x7jpEPQxqq0INDbx23QSXKIi2oFLaAruHTgTCy8jiH9KavUVLPN4L93qjLmMq00CRqpKOu8STRIPE_SECRET_KEY");


// app.get("/payment", (req, res) => {
//   res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
// });

// app.post("/payment/checkout", async (req, res) => {
//      console.log("Request:", req.body);
 
//     const { product, token } = req.body;
//     const idempotency_key = uuid();

//     return  stripe.customers.create({
//       email: token.email,
//       source: token.id,
//     }).then(customer=>{
//       stripe.charges.create({
//             amount:product.price*100,
//             currency:'usd',
//             customer:customer.id,
//             receipt_email:token.email,
//             description:product.name,

//       },{idempotency_key}) 
//     })
//     .then(result=>res.status(200).json(result))
//     .catch(err=>console.log(err))
  
  
//   })