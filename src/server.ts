import path from 'path'
import express from 'express'
import { listen } from 'socket.io'
import {
    addNewPlayer,
    updatePlayerPosition,
    removePlayer,
} from './server/socket-controller'

const app: express.Application = express();
const port = process.env.PORT || 8000

app.use(express.static(path.resolve(__dirname, '../dist')))

app.get("/", (req, res) => {
    res.sendFile('/dist/index.html')
})

const AppServer = app.listen(port, function () {
    console.log(`App running on port ${port}`);
});

const ioServer = listen(AppServer)
const players = {}

ioServer.on('connection', (socket) => {
    socket.on('new-player', () => {
        addNewPlayer(socket, players)
    })

    socket.on('player-move', (playerMoveDescription: PlayerMoveDescription) => {
        updatePlayerPosition(socket, playerMoveDescription, players)
    })

    socket.on('disconnect', () => {
        removePlayer(socket, players)
    })
})