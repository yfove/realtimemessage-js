const chatApp = {};

chatApp.config = () => {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCNqKsdIceXIQLdlfYWcpfBDTXArPusCJc",
        authDomain: "messaging-8f428.firebaseapp.com",
        databaseURL: "https://messaging-8f428.firebaseio.com",
        projectId: "messaging-8f428",
        storageBucket: "messaging-8f428.appspot.com",
        messagingSenderId: "172403480082",
        appId: "1:172403480082:web:0df72bf60782b5798e2acb"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // console.log(firebase); //too see all the methods in firebase
    //getting reference to firebase database
    chatApp.database = firebase.database(); //database is a method
    //getting reference to chat object in database
    chatApp.chat = chatApp.database.ref(`/chat`);
};