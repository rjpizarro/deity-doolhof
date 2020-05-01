import * as Phaser from 'phaser'
import constants from '../constants'

const animationConfigs = [
    {
        key: 'walk',
        frames: {
            start: 0,
            end: 4,
        },
        frameRate: 6,
        repeat: -1,
    },
    {
        key: 'walk-down',
        frames: {
            start: 6,
            end: 9,
        },
        frameRate: 6,
        repeat: -1,
    },
    {
        key: 'walk-up',
        frames: {
            start: 11,
            end: 14,
        },
        frameRate: 6,
        repeat: -1,
    },
]

const baseSpeed = 2
const runSpeed = baseSpeed * 2

export default class Warrior extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, constants.textures.entities.warrior)
        this.velocityStep = baseSpeed

        for (let i in animationConfigs) {
            const config = animationConfigs[i]

            this.scene.anims.create({
                ...config,
                frames: this.scene.anims.generateFrameNumbers(
                    constants.textures.entities.warrior,
                    {
                        start: config.frames.start,
                        end: config.frames.end,
                    })
            })

            this.anims.load(config.key)
        }

        this.scene.add.existing(this)
    }

    public handleMove = (keys) => {
        
        if (keys.DOWN.isDown) {
            this.handleRun(keys.DOWN)
            this.setY(this.y + this.velocityStep)
            this.anims.play('walk-down', true)
        } else if (keys.UP.isDown) {
            this.handleRun(keys.UP)
            this.setY(this.y - this.velocityStep)
            this.anims.play('walk-up', true)
        } else if (keys.RIGHT.isDown) {
            this.handleRun(keys.RIGHT)
            this.setX(this.x + this.velocityStep)
            this.setFlipX(false)
            this.anims.play('walk', true)
        } else if (keys.LEFT.isDown) {
            this.handleRun(keys.LEFT)
            this.setX(this.x - this.velocityStep)
            this.setFlipX(true)
            this.anims.play('walk', true)
        } else {
            this.anims.stop()
        }
    }

    private handleRun = (keyEvent) => {
        if (keyEvent.shiftKey) {
            this.velocityStep = runSpeed
        } else {
            this.velocityStep = baseSpeed
        }
    }
}