const express = require('express')
const app = express()
const port = 6554
var exist=false
var firebaseConfig = {
  //apiKey: "AIzaSyCFZm71gA1VwC3gRLwgcuDPeZI-06GLxj4",
  //authDomain:"test1-20b63.firebaseapp.com",
  databaseURL: "https://test1-20b63.firebaseio.com/",
  //projectId: "test1-20b63",
  //storageBucket: "test1-20b63.appspot.com",
  //messagingSenderId: "115050522172",
  //appId: "1:115050522172:web:2a21552bce3355b3df0539",
  //measurementId: "G-2FSBV0C1TM"
}
var firebase = require('firebase');
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})

var members_parent = [
  {"name": "parent1", "password": "0000", "kid": "kid1", "gender": "Daddy", "pic": "1"},
  {"name": "parent2", "password": "0000", "kid": "kid2", "gender": "Mommy", "pic": "2"},
  {"name": "parent3", "password": "0000", "kid": "kid3", "gender": "Mommy", "pic": "3"}
];

var members_kid = [
  {"name": "kid1", "password": "0000", "parent_": "parent1", "pic": "1"},
  {"name": "kid2", "password": "0000", "parent_": "parent2", "pic": "2"},
  {"name": "kid3", "password": "0000", "parent_": "parent3", "pic": "3"}
]

app.use(express.static(`${__dirname}/dist`))


app.get('/login', (req, res) => {
 
  exist=false;
  var search = 'parent/'+req.query.name+"/password/";
  database.ref(search).once('value',v=>{
    if(v.val()==req.query.password){
      database.ref('parent/'+req.query.name+'/').once('value',data=>{
        var kid_ = data.val().kid;
        var gender_ = data.val().gender;
        var pic_ = data.val().pic;
        res.send(`
          {
            "text": "<h1>HELLO! ${kid_}'s ${gender_}, ${req.query.name} </h1>",
            "exist": true,
            "pic": ${pic_}
          }
        `)
      });
    }
  });
  var search_ = 'kid/'+req.query.name+"/password/";
  database.ref(search_).once('value',v=>{
    if(v.val()==req.query.password){
      database.ref('kid/'+req.query.name+'/').once('value',data=>{
        var parent_ = data.val().parent;
        var pic_ = data.val().pic;
        res.send(`
          {
            "text":"<h1>HELLO! ${parent_}'s baby, ${req.query.name}</h1>",
            "exist": true,
            "pic": ${pic_}
          } 
        `)
      });
    }
  });

  database.ref(search).once('value',v1=>{
    if(v1.val()!=req.query.password){
      database.ref(search_).once('value',v2=>{
        if(v2.val()!=req.query.password){
          res.send(`
            {
              "text":"Wrong password or name~!",
              "exist":false
            }
          `)
        }
      });
    }
  });

  /*
  var exist=false;
  for(var i=0; i<members_parent.length; i++){
    if(members_parent[i].name==req.query.name&&members_parent[i].password==req.query.password){
      exist=true;
      var kid = members_parent[i].kid;
      var gender = members_parent[i].gender;
      var pic = members_parent[i].pic;
      console.log(typeof(kid));
      res.send(`
        {
          "text": "<h1>HELLO! ${kid}'s ${gender}, ${req.query.name} </h1>",
          "exist": true, 
          "pic": ${pic}
        }
      `)
      exist=true;
      break;
    }
  }
  for(var i=0; i<members_kid.length; i++){
    if(members_kid[i].name == req.query.name && members_kid[i].password == req.query.password){
      exist=true;
      var parent_ = members_kid[i].parent_;
      var pic = members_kid[i].pic;
      res.send(`
        {
          "text": "<h1>HELLO! ${parent_} 's baby, ${req.query.name}</h1>",
          "exist": true,
          "pic": ${pic}
        }
      `)
      exist=true;
      break;
    }
  } 
  if(exist==false){
    res.send(`
      {
        "text": "Wrong password or name~!",
        "exist": false
      }
    `)
  }*/
 // res.send(`<h1>Hello! ${req.query.name}</h1>`)
})
