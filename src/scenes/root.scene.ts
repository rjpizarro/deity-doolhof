import * as Phaser from 'phaser'
import constants from '../constants'
import Warrior from '../entities/warrior'
import warrior from '../entities/warrior'

export default class RootScene extends Phaser.Scene {
    private warrior;
    private keys;

    constructor () {
        super('deity-doolhof');
    }

    init() {
        this.keys = this.input.keyboard.addKeys("DOWN, UP, RIGHT, LEFT")
    }

    preload () {
        this.load.image('logo', 'assets/phaser3-logo.png');
        this.load.spritesheet(
            constants.textures.entities.warrior,
        'assets/sprites/warrior.png',
        {frameHeight: 97, frameWidth: 84 }
        );
    }

    create () {
        this.warrior = new Warrior(this, 100, 150 )
    }

    update () {
        this.warrior.handleMove(this.keys)
    }
}
