import { IVector3 } from "../interfaces/NetworkInterfaces";

export class UserCharacter {
    constructor(){
        this.position = {
            x: 0,
            y: 0,
            z: 0
        };

        this.eulerRotation = {
            x: 0,
            y: 0,
            z: 0
        };

        this.speed = 1;
    }

    moveInDirection(direction: IVector3){
        this.position = {
            x: (this.position.x + direction.x) * this.speed,
            y: (this.position.y + direction.y) * this.speed,
            z: (this.position.z + direction.z) * this.speed,
        }
    }

    getPosition(): IVector3 {
        return this.position;
    }

    getEulerRotation(): IVector3 {
        return this.eulerRotation;
    }

    private position: IVector3;
    private eulerRotation: IVector3;
    private speed: number;
}