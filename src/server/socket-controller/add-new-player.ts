import SocketIO = require('socket.io')

export default (socket: SocketIO.Socket, players: any,) => {
    const newPlayer = {
        id: socket.id,
        x: Math.random() * 400,
        y: Math.random() * 400,
    }

    players[socket.id] = newPlayer

    socket.emit('all-players', players)
    socket.broadcast.emit('new-player-added', newPlayer)
}