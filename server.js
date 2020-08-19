const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
  // console.log('new User')
  // socket.emit('chat-message', 'Hello World')

  //クライアント側のユーザー名を登録
  socket.on('new-user', name => {
    users[socket.id] = name

    //新しいクライアント名を配信
    socket.broadcast.emit('user-connected', name)
  })

  socket.on('send-chat-message', message => {
    // console.log(message)

    //全てのクライアントにメッセージを配信
    socket.broadcast.emit('chat-message', 'message:' + message + '  name:' + users[socket.id] )
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id] )
    delete users[socket.id]
  })
})



