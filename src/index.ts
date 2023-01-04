import WebSocket from "ws";
import { HandlerUserConnected } from "./event-handlers/HandleUserConnected";
import { HandleUserMessage } from "./event-handlers/HandleUserMessage";
import { EMessageCode, EMoveDirection, IMessageFromServerToClientUserRemoval, IMessageFromServerToClientUserSpawn, IUserData } from "./interfaces/NetworkInterfaces";
import { User, Users } from "./utils/User";
import { getRandomSkinColor } from "./utils/UserCharacter";
const { v4 : uuidv4 } = require("uuid");

const PORT_NO = 4000;

const wsServer = new WebSocket.Server({
    port: PORT_NO
})

console.log("WS Server on port - " + PORT_NO);

wsServer.on("connection", (ws)=>{
    HandlerUserConnected();
    //wsClients.push(ws);
    const user: User = new User(ws);
    user.uid = uuidv4();
    user.getCharacter().skinColor = getRandomSkinColor();
    const usersInfo: IUserData [] = new Array<IUserData>();
    for(let i = 0; i < Users.length; i++) {
        usersInfo.push({
            uid: Users[i].uid,
            skinColor: Users[i].getCharacter().skinColor,
            transform: {
                position: Users[i].getCharacter().getPosition(),
                eulerRotation: Users[i].getCharacter().getEulerRotation()
            }
        })
    }

    user.getWebSocket().send(JSON.stringify({
        code: EMessageCode.SELF_SPAWN,
        users: [{
            uid: user.uid,
            skinColor: user.getCharacter().skinColor,
            transform: {
                position: user.getCharacter().getPosition(),
                eulerRotation: user.getCharacter().getEulerRotation()
            }
        }]
    } as IMessageFromServerToClientUserSpawn));

    user.getWebSocket().send(JSON.stringify({
        code: EMessageCode.SPAWN,
        users: usersInfo
    } as IMessageFromServerToClientUserSpawn))

    for(let i = 0; i < Users.length; i++) {
        const messageForClient: IMessageFromServerToClientUserSpawn = {
            users: [{
                uid: user.uid,
                skinColor: user.getCharacter().skinColor,
                transform: {
                    position: user.getCharacter().getPosition(),
                    eulerRotation: user.getCharacter().getEulerRotation()
                }
            }],
            code: EMessageCode.SPAWN
        }
        Users[i].getWebSocket().send(JSON.stringify(messageForClient));
    }
    Users.push(user);

    user.getWebSocket().on("message", (data)=>{
        HandleUserMessage(user, JSON.parse(data.toString()));
    })

    user.getWebSocket().on("close", (code, reason)=>{
        console.log("User disconnected");
        const tempUsers: User[] = new Array<User>();

        // pop out users one by one from Users array until the user to be removed is found
        while(Users[Users.length - 1] !== user && Users.length > 0) {
            tempUsers.push(Users.pop() as User);
        }
        // once user to be removed is found , pop it out
        Users.pop();
        // put all the other users back in Users array
        while(tempUsers.length > 0) {
            Users.push(tempUsers.pop() as User);
        }

        // inform other users about the removal of this user
        for(let i = 0; i < Users.length; i++) {
            Users[i].getWebSocket().send(JSON.stringify({
                code: EMessageCode.USER_REMOVAL,
                uids: [
                    user.uid
                ]
            } as IMessageFromServerToClientUserRemoval))
        }
    })
})
