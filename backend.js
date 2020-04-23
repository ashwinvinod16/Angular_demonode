const express= require('express');
const app = express();
const bodyparser= require('body-parser');
const cors= require('cors');
const mongoClient=require("mongodb");
const url="mongodb://localhost:27017";


app.use(cors());
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended: true}));

app.set('port',process.env.PORT)


// ..........to get all product 
app.get('/productlist', (req, res) => {
  mongoClient.connect(url, (err, client) => {
      if (err) throw err;

      var db = client.db('abidasdb');

      var userData = db.collection('product').find().toArray();

      userData.then((data) => {
          client.close();
          res.json(data);
      }).catch((err) => {
          client.close();
          res.status(500).json({
              message: 'error'
          })
      })
  })
})

//..to find a particular category products
app.get('/products/:category', (req, res) => {
  var cat=req.params.category;
  mongoClient.connect(url, (err, client) => {
      if (err) throw err;

      var db = client.db('abidasdb');

      var userData = db.collection('product').find({pCategory:cat}).toArray();

      userData.then((data) => {
          client.close();
          res.json(data);
      }).catch((err) => {
          client.close();
          res.status(500).json({
              message: 'error'
          })
      })
  })
})

//...fectch a particular product
 
app.get('/viewprod/:name', (req, res) => {
  var Name=req.params.name;
  mongoClient.connect(url, (err, client) => {
      if (err) throw err;

      var db = client.db('abidasdb');

      var userData = db.collection('product').find({pName:Name}).toArray();

      userData.then((data) => {
          client.close();
          res.json(data);
      }).catch((err) => {
          client.close();
          res.status(500).json({
              message: 'error'
          })
      })
  })
})


//....to get categorylist
app.get('/categorylist', (req, res) => {
  mongoClient.connect(url, (err, client) => {
      if (err) throw err;

      var db = client.db('abidasdb');

      var userData = db.collection('category').find().toArray();

      userData.then((data) => {
          client.close();
          res.json(data);
      }).catch((err) => {
          client.close();
          res.status(500).json({
              message: 'error'
          })
      })
  })
})

//.....to store product in db


//....to store cayegory in db
app.post('/cusers',function(req,res){

  //storing data in db
 
 mongoClient.connect(url,function(err,client){
   if(err) throw err;
   var db = client.db("abidasdb");
   db.collection("category").insert(req.body,function(err,data){
     if(err) throw err;
     client.close();
     res.json({
       message:"saved"
     })
   })
 })
  
 });








app.listen(app.get('port'));
