const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const users = require('../Models/userSchema')

//Register logic
exports.registerAPI = async (req, res) => {
   console.log('Inside Register API');
   const { username, email, password } = req.body;
   // if user already in db?
   const existingUser = await users.findOne({ email })
   if (existingUser) {
      res.status(402).json({ message: "user already existing" })
   }
   else {
      const newUser = new users({
         username: username,
         email: email,
         password: password,
         github: "",
         linkedIn: "",
         profilePic: ""
      })
      //to save the details in mogoose
      await newUser.save()
      res.status(200).json("User Registration successfull...")
   }
}

//Register logic
exports.loginAPI = async (req, res) => {
   console.log('Inside Login API');
   const { email, password } = req.body;
   try {
      // if user already in db?
      const existingUser = await users.findOne({ email, password })
      if (existingUser) {


         const token = jwt.sign({ userId: existingUser._id }, process.env.jwtkey)
         console.log(token);
         res.status(200).json({ currentUser: existingUser, token })

      }
      else {
         res.status(404).json("Incorrect Email or Password")
      }
   }
   catch (err) {
      res.status(401).json(err)
   }

}

