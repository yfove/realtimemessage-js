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
    //must load database script underneath initial firebase script
    //getting reference to chat object in database
    chatApp.chat = chatApp.database.ref(`/chat`);
    //create a database on firebase website
};

chatApp.init = () => {
    //Add message
    //on form submission
    $('.chat').on('submit', function (e) {
        e.preventDefault(); //when submit prevent refresh screen
        //save input from form
        const message = {
            name: chatApp.nameField.val(),
            text: chatApp.messageField.val(),
        };
        console.log(message);
        //pushing to database
        chatApp.chat.push(message);
        chatApp.messageField.val("");
    });

    //listen to changes in firebase database, listenining to the chat reference to see if anything is added
    //limited to 10 messages
    //limitToLast is only for firebase
    //child_added is only for firebase
    chatApp.chat.limitToLast(10).on('child_added', function (message) {
        const id = message.key;
        const data = message.val();
        const text = data.text;
        //name is optional
        const name = data.name || 'Unknown';
        const li = `<li>
                        <strong>${name}</strong>
                        <p>${text}</p>
                        <button class="delete" id=${id}>
                            <i class="fas fa-times-circle"></i>
                        </button>
                    </li>`;

        //adds new message to page
        chatApp.messageList.append(li);
        //always scroll to the bottom;
        chatApp.messageList[0].scrollTop = chatApp.messageList[0].scrollHeight;
    });

    // Remove Message
    chatApp.messageList.on('click', '.delete', function () {
        const id = $(this).attr('id');
        console.log(id);
        chatApp.database.ref(`/chat/${id}`).remove();
    });

    //listening to the delete of data on firebase
    chatApp.chat.limitToLast(10).on('child_removed', function (message) {
        //get the id of the message being deleted
        const id = message.key;
        //find the message with that id and delete the li closest to it
        //if you don't use closest li then it will only remove the button
        chatApp.messageList.find(`#${id}`).closest('li').remove();
    });

};

$(function () {
    chatApp.config();
    chatApp.messageField = $('#messageInput');
    chatApp.nameField = $('#nameInput');
    chatApp.messageList = $('.messages');
    //init will have all the event handlers
    chatApp.init();
});
