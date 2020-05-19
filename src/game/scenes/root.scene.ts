import * as Phaser from 'phaser'
import constants from '../constants'
import Warrior from '../entities/warrior'
import SocketIOClient from 'socket.io-client'
import map from "lodash/map"

export default class RootScene extends Phaser.Scene {
    private warriors: any;
    private keys: any;
    private ioClient: SocketIOClient.Socket

    constructor () {
        super('deity-doolhof');
        this.warriors = {}
        this.ioClient = SocketIOClient.connect()
    }

    init() {
        this.keys = this.input.keyboard.addKeys("DOWN, UP, RIGHT, LEFT")
    }

    preload () {
        this.load.spritesheet(
            constants.textures.entities.warrior,
        'assets/sprites/warrior.png',
        {frameHeight: 97, frameWidth: 84 }
        );
    }

    create () {
        this.ioClient.emit('new-player')
        this.ioClient.on('all-players', (players: any) => {
            map(players, (p: any) => {
                this.warriors[p.id] = new Warrior(this, p.x, p.y)
            })
        })

        this.ioClient.on('new-player-added', (player: any) => {
            this.warriors[player.id] = new Warrior(this, player.x, player.y)
        })

        this.ioClient.on('player-disconnect', (playerId: string) => {
            this.warriors[playerId].destroy()

            delete this.warriors[playerId]
        })

        this.ioClient.on('player-move', (player: any) => {
            this.warriors[player.id].setY(player.y)
            this.warriors[player.id].setX(player.x)
            this.warriors[player.id].walkAnimation(player.direction)
        })
    }

    update () {
        if (this.warriors[this.ioClient.id]) {
            this.warriors[this.ioClient.id].handleMove(
                this.keys,
                (moveDescription: any) => {
                    this.ioClient.emit('player-move', moveDescription)
                }
            )
        }
    }
}
