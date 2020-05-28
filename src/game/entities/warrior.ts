import { GameObjects, Scene } from 'phaser'
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

export default class Warrior extends GameObjects.Sprite {
    private velocityStep: number;

    constructor(scene: Scene, x: number, y: number) {
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

    public moveUp = (y: number) => {
        this.setY(y)
        this.anims.play('walk-up', true)
    }

    public moveRight = (x: number) => {
        if (this.flipX) {
            this.setFlipX(false)
        }

        this.setX(x)
        this.anims.play('walk', true)
    }

    public moveDown = (y: number) => {
        this.setY(y)
        this.anims.play('walk-down', true)
    }

    public moveLeft = (x: number) => {
        if (!this.flipX) {
            this.setFlipX(true)
        }

        this.setX(x)
        this.anims.play('walk', true)
    }

    public stop = () => {
        this.anims.stop()
    }

    public handleMove = (
        keys: any,
        onMove?: (moveDescription: {
            direction: PlayerMoveDirection,
            x: number,
            y: number,
        }) => void
    ) => {
        let direction: PlayerMoveDirection

        if (keys.DOWN.isDown) {
            this.moveDown(this.y + this.velocityStep)
            this.handleRun(keys.DOWN)
            direction = 'down'
        } else if (keys.UP.isDown) {
            this.moveUp(this.y - this.velocityStep)
            this.handleRun(keys.UP)
            direction = 'up'
        } else if (keys.RIGHT.isDown) {
            this.handleRun(keys.RIGHT)
            this.moveRight(this.x + this.velocityStep)
            direction = 'right'
        } else if (keys.LEFT.isDown) {
            this.handleRun(keys.LEFT)
            this.moveLeft(this.x - this.velocityStep)
            direction = 'left'
        } else {
            this.stop()
            direction = 'stop'
        }

        if (onMove) {
            onMove({
                direction,
                x: this.x,
                y: this.y
            })
        }
    }

    private handleRun = (keyEvent: any) => {
        if (keyEvent.shiftKey) {
            this.velocityStep = runSpeed
        } else {
            this.velocityStep = baseSpeed
        }
    }
}