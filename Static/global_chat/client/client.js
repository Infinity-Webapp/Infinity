const socket = io('http://127.0.0.1:8000');
const senderButton = document.getElementById('send-short');
const message = document.getElementById('message-short');
const chatbox = document.getElementById('chat-container');
const senderButtonRight = document.getElementById('send-long');
const messageRight = document.getElementById('message-long');

var username = null;
while (username == null || username == ' ' || username == '') {
    username = prompt("What is your Name");
}

socket.emit('i_joined', username);

socket.on('someone_joined', username_sender =>{
    appendMessage({username: username_sender, message : 'Has joined the chat!!'}, 'message-recieved');
});

socket.on('message_recieved', message_data =>{
    appendMessage(message_data, 'message-recieved');
});

socket.on('someone-left', username_left =>{
    appendMessage({username: username_left, message : 'Has left the chat!!'}, 'message-recieved');
});

senderButton.addEventListener('click', (e) => {
    const sender_data = {username : 'you', message : message.value};
    appendMessage(sender_data, 'message-sent');
    socket.emit('message-sent', sender_data);
    message.value = null;
});

senderButtonRight.addEventListener('click', (e) => {
    const sender_data = {username : 'you', message : messageRight.value};
    appendMessage(sender_data, 'message-sent');
    socket.emit('message-sent', sender_data);
    messageRight.value = null;
});

const appendMessage = (message_data, type) => {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('msg');
    messageWrapper.classList.add(type);
    const username_chatbox = document.createElement('p');
    const message_chatbox = document.createElement('p');
    username_chatbox.classList.add('username');
    username_chatbox.innerText = message_data.username;
    message_chatbox.classList.add('message');
    message_chatbox.innerText = message_data.message;
    messageWrapper.append(username_chatbox);
    messageWrapper.append(message_chatbox);
    chatbox.append(messageWrapper);
}