import _ from 'lodash'
import SocketIO = require('socket.io')

export default (socket: SocketIO.Socket, moveDescription: any ) => {
    const nextPlayerPosition = {
        id: socket.id,
        x: _.get(moveDescription, 'x'),
        y: _.get(moveDescription, 'y'),
        direction: _.get(moveDescription, 'direction'),
    }

    socket.broadcast.emit('player-move', nextPlayerPosition)
}