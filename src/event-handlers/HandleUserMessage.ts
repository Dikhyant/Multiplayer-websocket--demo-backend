import { EMessageCode, EMoveDirection, IMessageFromServerToClientPositionSync, IMessageToServer, ITransform } from "../interfaces/NetworkInterfaces";
import { User, Users } from "../utils/User";
import { UserCharacter } from "../utils/UserCharacter";

export function HandleUserMessage( user: User, message: IMessageToServer){
    const character: UserCharacter = user.getCharacter();
    if(message.moveDirection === EMoveDirection.FORWARD) {
        character.moveInDirection( {
            x: 0,
            y: 0,
            z: 1
        })
    } else if (message.moveDirection === EMoveDirection.BACKWARD) {
        character.moveInDirection( {
            x: 0,
            y: 0,
            z: -1
        })
    } else if (message.moveDirection === EMoveDirection.RIGHT) {
        character.moveInDirection( {
            x: -1,
            y: 0,
            z: 0
        })
    } else if (message.moveDirection === EMoveDirection.LEFT) {
        character.moveInDirection( {
            x: 1,
            y: 0,
            z: 0
        })
    }

    const newTransform: ITransform = {
        position: character.getPosition(),
        eulerRotation: character.getEulerRotation()
    }

    const messageForClient: IMessageFromServerToClientPositionSync = {
        code: EMessageCode.MOVEMENT,
        users: [{
            uid: user.uid,
            transform: newTransform
        }]
    }

    for(let i = 0; i < Users.length; i++) {
        Users[i].getWebSocket().send(JSON.stringify(messageForClient));
    }

    //user.getWebSocket().send(JSON.stringify(messageForClient));
}