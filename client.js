const socket = io("http://localhost:8000");

const form = document.getElementById("formsection");
const messageInput = document.getElementById("sendmsg");
const sendbtn = document.getElementById("sendbtn");
const msgcontainer = document.querySelector(".container")


 const name = prompt("Enter you Name");
socket.emit('new-user-joined', name)

let audio = new Audio('ring.mp3') 

const append =( message, position)=>{
    const messageElement = document.createElement('div');
    // const messageElement = document.getElementsByClassName("container");
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    msgcontainer.append(messageElement);
    if(position=='left'){
    audio.play();
}
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`me : ${message}`,'right')
    socket.emit('send',message);
    messageInput.value =''
})

function msgsend(){
    const message = messageInput.value;
    append(`me : ${message}`,'right')
    socket.emit('send',message);
    messageInput.value =''

}


socket.on('user-joined',name =>{
    append(`${name} joined the chat`,'left')
})

    socket.on('receive',data =>{
        append(`${data.name} : ${data.message}`,'left')

})
 

socket.on('left',name=>{
    append(`${name} left the chat`, 'left')
})