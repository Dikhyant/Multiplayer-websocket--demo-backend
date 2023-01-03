export interface ITransform{
    position: IVector3,
    eulerRotation: IVector3 
}

export interface IVector3 {
    x: number,
    y: number,
    z: number
}

export enum EMoveDirection{
    FORWARD,
    BACKWARD,
    LEFT,
    RIGHT,
    STAY
}

export interface IMessageToServer{
    moveDirection: EMoveDirection
}