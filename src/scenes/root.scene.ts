import * as Phaser from 'phaser'

export default class RootScene extends Phaser.Scene {
    constructor () {
        super('deity-doolhof');
    }

    init() {
        console.log(">> Scene Starts", )
    }

    preload () {
        this.load.image('logo', 'assets/phaser3-logo.png');
    }

    create () {
        const logo = this.add.image(window.innerWidth/2, 70, 'logo');

        this.tweens.add({
            targets: logo,
            y: 350,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        })
    }
}
