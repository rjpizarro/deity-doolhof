import * as Phaser from 'phaser'
import RootScene from './scenes/root.scene'

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: RootScene
};

const game = new Phaser.Game(config)