const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const configRoutes = require('./routes');
app.use(cookieParser());

app.use(express.json());
const session = require('express-session')

const static = express.static(__dirname + "/public")
  
const { engine } = require("express-handlebars")

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
}))

app.use("/protected", (req, res, next) => {
  if(!req.session.user) {
    return res.status(403).render("forbiddenAccess", {title: "Unauthorized Access", error:"Login to access private page"})
  } else {
    next()
  }
})

app.use((req, res, next) => {
  date = new Date();
  console.log(
    `[${date.toUTCString()}]:\t${req.method}\t${req.originalUrl}\t\t${
      req.session.user ? "(Authenticated User)" : "(Non-Authenticated User)"
    }`
  )
  next()
})


app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});