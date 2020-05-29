export type PlayerMoveDirection = 'up' | 'right' | 'down' | 'left' | 'stop'

export type Player = {
    id: string,
    x: number,
    y: number,
}

export type PlayerMoveDescription = {
    x: number,
    y: number,
    direction: PlayerMoveDirection
}

export type NextPlayerPosition = PlayerMoveDescription & { id: string }