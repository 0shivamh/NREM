let express = require("express");
let app = express();
let port = 3002;
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/demodb");

let nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});
let User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
  let myData = new User(req.body);
  myData.save()
      .then(item => {
          res.send("Name saved to database");
      })
      .catch(err => {
          res.status(400).send("Unable to save to database");
      });
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});