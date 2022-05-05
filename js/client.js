const socket = io('http://localhost:8080')
const form = document.getElementById('send-container')
const messageinput = document.getElementById('messageinp')
const messagecontainer = document.querySelector('.container')
var audio = new Audio('Notification.mp3');


const name = prompt('Enter you name to join')
// console.log(names)
socket.emit('new-user-joined', name)

const append = (message, position) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messagecontainer.append(messageElement)
    if (position == 'left') {

        audio.play();
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageinput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message)
    messageinput.value = ''

})
socket.on('user-joined', name => {
    console.log(`${name} joined the chat`)
    //     let app = document.querySelector('.container');
    append(`${name} joined the chat`, 'left')

})
socket.on('receive', data => {
    append(`${data.name} :${data.message}`, 'left')
})

socket.on('left', name => {
    append(`${name} :left the chat`, 'left')
})