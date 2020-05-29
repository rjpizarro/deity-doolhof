import _ from 'lodash'
import SocketIO = require('socket.io')
import {PlayerMoveDescription} from '../../types'

export default (socket: SocketIO.Socket, moveDescription: PlayerMoveDescription, players: any,) => {
    const nextPlayerPosition = {
        id: socket.id,
        x: _.get(moveDescription, 'x'),
        y: _.get(moveDescription, 'y'),
        direction: _.get(moveDescription, 'direction'),
    }

    players[socket.id] = Object.assign(
        {},
        players[socket.id],
        {
            x: nextPlayerPosition.x,
            y: nextPlayerPosition.y,
        }
    )

    socket.broadcast.emit('player-move', nextPlayerPosition)
}