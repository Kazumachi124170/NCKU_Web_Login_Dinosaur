const express = require('express')
const app = express()
const port = 7888
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

  var exist=false;

  for(var i=0; i<members_parent.length; i++){
    if(members_parent[i].name==req.query.name&&members_parent[i].password==req.query.password){
      exist=true;
      var kid = members_parent[i].kid;
      var gender = members_parent[i].gender;
      var pic = members_parent[i].pic;
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
  }
 // res.send(`<h1>Hello! ${req.query.name}</h1>`)
})
