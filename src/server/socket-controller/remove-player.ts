import SocketIO = require('socket.io')

export default (socket: SocketIO.Socket, players: any,) => {
    delete players[socket.id]

    socket.broadcast.emit('player-disconnect', socket.id)
}