const mongoCollections = require('../config/mongoCollections');
const express = require("express");
const router = express.Router();
const data = require('../data');
const userData = data.users

router
  .route('/')
  .get(async (req, res) => {
    if(req.session.user){
      res.redirect("/protected")
    } else {
      res.render('../views/userLogin', {title: 'User Login'})
    }
  })

router
  .route('/register')
  .get(async (req, res) => {
    if(req.session.user) {
      res.redirect("/protected")
    } else {
      res.render("../views/userRegister", {title: 'User Registration'})
      return 
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let userinfo = req.body
    if(!userinfo){
      res.status(400).render("../views/userRegister",{title: 'User Registration',error: "Provide registration details"})
      return 
    }

    const username = userinfo.usernameInput
    const password = userinfo.passwordInput

    if (!username) {
      res.status(400).render("../views/userRegister",{title: 'User Registration',error: "Provide a username"})
      return 
    }
      
    if (typeof username !== 'string') {
      res.status(400).render("../views/userRegister",{title: 'User Registration',error: "Username should be string"})
      return 
    }
      
    if(username.length < 4) {
      res.status(400).render("../views/userRegister",{title: 'User Registration',error: "Username should be atleast 4 characters"})
      return 
    }
      
    if(!/^[A-Za-z0-9]+$/.test(username)) {
      res.status(400).render("../views/userRegister",{title: 'User Registration',error: "Username should only contain letters, numbers and no spaces"})
      return 
    }
      
    let revised_username = username.toLowerCase()

    if(!password){
      res.status(400).render("../views/userRegister",{title: 'User Registration',error: "Provide a password"})
      return 
    }
      
    if (typeof password !== 'string') {
      res.status(400).render("../views/userRegister",{title: 'User Registration',error: "Password must be a string"})
      return 
    }
      
    var password_check=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

    if(!password.match(password_check)) {
      res.status(400).render("../views/userRegister",{title: 'User Registration',error: "Invalid Password:Password should contain 1 uppercase letter, 1 number, atleast 1 special character, no spaces and of length 6"})
      return 
    }

    try {
      const newuser = await userData.createUser(
        revised_username,
        password
      )
      if(newuser['insertedUser'] === true){
        res.redirect("/")
      } else {
        res.status(500).render("../views/forbiddenAccess", {title:'Error', error: 'Internal Server Error'})
        return
      }
    }catch(e){
      if (e === "Internal Server Error") {
        res.status(500).render("../views/forbiddenAccess", {title: "Error", error: "Internal Server Error"})
        return
      } else {
        res.status(400).render("../views/userRegister", {title: "User Registration", error: e})
        return
      }
    }
  })
 
router
  .route('/login')
  .post(async (req, res) => {
    //code here for POST
    let userinfo = req.body
    if(!userinfo){
      res.status(400).render("../views/userLogin",{title: 'User Login',error: "Provide login details"})
      return 
    }
    const username = userinfo.usernameInput
    const password = userinfo.passwordInput

    if (!username) {
      res.status(400).render("../views/userLogin",{title: 'User Login',error: "Provide Username"})
      return 
    }
      
    if (typeof username !== 'string') {
      res.status(400).render("../views/userLogin",{title: 'User Login',error: "Username should be string"})
      return 
    }
      
    let user_name = username.toLowerCase()

    if(!password){
      res.status(400).render("../views/userLogin",{title: 'User Login', error: "Provide a password"})
      return 
    }

    try {
      const existing_user = await userData.checkUser(
        user_name,
        password
      )
      console.log(existing_user)
      if(existing_user['authenticatedUser'] === true){
        req.session.user = { username: username }
        return res.redirect("/protected")
      } else {
        res.status(500).json({ error: "Internal Server error" })
        return
      }
    }catch(e){
      res.status(400).render("../views/userLogin", {title: "User Login", error: e });
      return;
    }
  })

router
  .route('/protected')
  .get(async (req, res) => {
    date = new Date()
    if (req.session.user) {
      return res.render("../views/private", {title: "Private", user: req.session.user.username, date: date.toUTCString()})
    } else {
      return res.redirect("/")
    }
  })

router
  .route('/logout')
  .get(async (req, res) => {
    req.session.destroy()
    res.clearCookie("AuthCookie")
    res.render("../views/logout", {title:"Logged out"})
  })

module.exports = router
