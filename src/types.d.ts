type PlayerMoveDirection = 'up' | 'right' | 'down' | 'left' | 'stop'

type Player = {
    id: string,
    x: number,
    y: number,
}

type PlayerMoveDescription = {
    x: number,
    y: number,
    direction: PlayerMoveDirection
}

type NextPlayerPosition = PlayerMoveDescription & { id: string }