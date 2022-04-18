var express = require('express');
var router = express.Router();
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWT_TOKEN




router.post('/login',(req,res)=>{
  const { email, password } = req.body
  try {
      let user = User.findOne({email})
      if(!user){
        res.status(401).json({'error': 'Incorrect password or email'})
      }else{
        user.isCorrectPassword(password, (err, same)=>{
          if(!same){
            res.status(401).json({'error': 'Incorrect password or email'})
          }else{
            const token = jwt.sign({email}, secret, {expiresIn: '30d'})
            res.json({
              user: user,
              token: token
            })
          }
        })
      }
  } catch (error) {
    res.status(500).json({'message': 'Internal error, try again'})
  }
})






router.post('/register',(req, res)=>{
  const { name, email, password } = req.body
  const user = new User({
    name, email, password
  })
  try {
      user.save()
      res.status(200).json(user)
  } catch (err) {
    res.status(500).json({
      'error':'Error registering a new user'
    })
  }
})

module.exports = router;
