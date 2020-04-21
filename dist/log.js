/*
var config={
  //apiKey:"AIzaSyCFZm71A1VwC3gRLwgcuDPeZI-06GLxj4",
  //authDomain: "test1-20b63.firebaseapp.com",
  databaseURL: "https://test1-20b63.firebaseio.com",
  //projectId: "test1-20b63",
  //storageBucket: "test1-20b63appspot.com",
  //messagingSenderId: "115050522172",
  //appId: "1:115050522172:web:2a2155bce3355b3df0539",
  //measurementId:"G-2FSBV0C1TM"
};
firebase.initializeApp(config);
//firebase.analytics();
const database = firebase.database();
*/
$(document).ready(function () {
  $('#typein button[type="submit"]').click(event => {
    event.preventDefault();

    //button animate
    //
    $.get('./login', {
      name: $('#typein input[name=name]').val(),
      password: $('#typein input[name=password]').val()
    }, data => {
      var list = JSON.parse(data);
      if (list.exist == true) {
        $('#ajax-output').html(list.text);
        $('#pic').html("<img src=\"./res/pic" + list.pic + ".png\"/>");
        document.getElementById("typein").style.visibility = "hidden";
      } else {
        alert(list.text);
        document.getElementById("name_input").value = "";
        document.getElementById("password_input").value = "";
      }
      console.log(data);
    });
  });
});
