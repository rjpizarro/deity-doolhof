import map from 'lodash/map'
import SocketIOClient from 'socket.io-client'
import Warrior from './entities/warrior'

const host = 'http://localhost:8000/'

class SocketClient {
    private readonly scene: Phaser.Scene;
    private socket: SocketIOClient.Socket;

    constructor(scene: Phaser.Scene) {
        this.scene = scene
        this.socket = SocketIOClient.connect(host)
    }

    public connectPlayer = () => {
        this.socket.emit('new-player')
    }

    public startListener = () => {
        this.socket.on('all-players', (players: any) => {
            console.log(">> all-players emitted", players)

            map(players, (p) => {
                new Warrior(this.scene, p.x, p.y)
            })
        })
    }
}

//
// let Client = {
//     socket: SocketIO.connect(host),
//     test: () => {
//         Client.socket.emit('test')
//     },
//     newPlayer: () => {
//         Client.socket.emit('new-player')
//     },
// }

export default SocketClient