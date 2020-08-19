const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageImput = document.getElementById('message-input')

//クライアントの名前を入力
const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  // console.log(data);
  appendMessage(data)
})

socket.on('user-connected', name => {
  appendMessage(name + ': connected')
})

socket.on('user-disconnected', name => {
  appendMessage(name + ': disconnected')
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageImput.value
  appendMessage('You: ' + message)
  socket.emit('send-chat-message', message)
  messageImput.value = ''
})

function appendMessage(message){
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}
