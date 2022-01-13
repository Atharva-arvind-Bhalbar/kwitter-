const firebaseConfig = {
      apiKey: "AIzaSyDKtQYnEuEXRyt7o-B71LNfnryREJBHLQo",
      authDomain: "chat-with-us-15b2d.firebaseapp.com",
      databaseURL:"https://chat-with-us-15b2d-default-rtdb.firebaseio.com",
      projectId: "chat-with-us-15b2d",
      storageBucket: "chat-with-us-15b2d.appspot.com",
      messagingSenderId: "65774873051",
      appId: "1:65774873051:web:89c5ea3fd143593611dffe"
    };

firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "welcome" + user_name ; 

function addRoom()
{
      room_name = document.getElementById("room_name").value;
      
      firebase.database().ref("/").child(room_name).update({
         purpose : "adding room name"   
      });

      localStorage.setItem("room_name", room_name);

      window.location = "kwitter_page.html";

}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("Room Name -" + Room_names);
      row = "<div class = 'room_name' id = "+Room_names+" onclick = 'redirecttoRoomName(this.id) ' >#"+ Room_names+ "</div><hr>";
      document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function redirecttoRoomName(name)
{
      console.log(name);
      localStorage.setItem("room_name",name);
         window.location = "kwitter_page.html";
}

function logout()
{
  localStorage.removeItem("user_name");
  localStorage.removeItem("Room_name");
  window.location("index.html");
}

function send()
{
      msg = document.getElementById("msg").value ;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });

}