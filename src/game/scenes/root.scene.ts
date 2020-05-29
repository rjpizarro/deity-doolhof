import { Scene } from 'phaser'
import constants from '../constants'
import Warrior from '../entities/warrior'
import SocketIOClient from 'socket.io-client'
import map from "lodash/map"
import get from "lodash/get"
import {NextPlayerPosition, Player} from '../../types'

export default class RootScene extends Scene {
    private warriors: { [id: string]: Warrior };
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
        {frameHeight: 150, frameWidth: 150 }
        );
    }

    create () {
        this.ioClient.emit('new-player')
        this._handleSocketMessages()
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

    private _handleSocketMessages = () => {
        // get all game players connected
        this.ioClient.on('all-players', (players: [Player]) => {
            map(players, (p) => {
                this.warriors[p.id] = new Warrior(this, p.x, p.y)
            })
        })

        // listen to new player connection
        this.ioClient.on('new-player-connected', (player: Player) => {
            this.warriors[player.id] = new Warrior(this, player.x, player.y)
        })

        // listen to player move
        this.ioClient.on('player-move', (player: NextPlayerPosition) => {
            const warrior = get(this.warriors, [player.id])

            if (warrior) {
                const actionByDirection = {
                    up: () => warrior.moveUp(player.y),
                    right: () => warrior.moveRight(player.x),
                    down: () => warrior.moveDown(player.y),
                    left: () => warrior.moveLeft(player.x),
                    stop: warrior.stop,
                }

                actionByDirection[player.direction]()
            }
        })

        // listen to player disconnect
        this.ioClient.on('player-disconnect', (playerId: string) => {
            this.warriors[playerId].destroy()

            delete this.warriors[playerId]
        })
    }
}
