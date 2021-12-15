const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const md5 = require('md5')

const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
   extended: true
}))
app.set("view engine", "ejs")

mongoose.connect("mongodb://localhost:27017/games")

const gamesSchema = new mongoose.Schema({
   email:String,
   password: String
})


const Games = new mongoose.model("Games", gamesSchema);

app.get("/", (req, res) => {
   res.render("first-page")
})

app.get("/login", (req, res) => {
   res.render("login")
});

app.get("/registration", (req, res) => {
   res.render("registration")
});

app.get("/guss-number",(req, res)=>{
   res.render("guss-number")
})

app.get("/pig-game",(req,res)=>{
   res.render("pig-game")
})

app.post("/login", (req, res) => {

   const username = req.body.username
   const password = md5(req.body.password)

   Games.findOne({
      email: username
   }, function(err, foundUser) {
      if (err) {
         console.log("error")
      } else {
         if (foundUser) {
            if (foundUser.password === password) {
               res.render("games")
               console.log("working");
            }
         }
      }
   })
})

app.post("/registration", (req, res) => {
   const newUser = new Games({
      email: req.body.username,
      password: md5(req.body.password)
   })

   newUser.save((err) => {
      if (err) {
         console.log("error")
      } else {
         res.render('games')
      }
   })
})


app.listen(3000, (req, res) => {
   console.log("running on port 3000")
})
