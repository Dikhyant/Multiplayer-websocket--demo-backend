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
        this.skinColor = "#ff0000";
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
    public skinColor: string;
}

export function getRandomSkinColor():string{
    const colors: string[] = [
        "#ffffff",
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#1000f0",
        "#09f001",
        "#005209",
        "#002311",
        "#aabbcc",
        "#112233",
        "#010204",
        "#111111",
        "#222222",
        "#333333",
        "#454545",
        "#123456"
    ]

    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}