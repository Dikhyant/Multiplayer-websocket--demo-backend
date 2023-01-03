import WebSocket from "ws";
import { HandlerUserConnected } from "./event-handlers/HandleUserConnected";
import { HandleUserMessage } from "./event-handlers/HandleUserMessage";
import { EMoveDirection } from "./interfaces/NetworkInterfaces";
import { User, Users } from "./utils/User";

const PORT_NO = 4000;

const wsServer = new WebSocket.Server({
    port: PORT_NO
})

console.log("WS Server on port - " + PORT_NO);

wsServer.on("connection", (ws)=>{
    HandlerUserConnected();
    //wsClients.push(ws);
    const user: User = new User(ws);
    Users.push(user);

    user.getWebSocket().on("message", (data)=>{
        console.log(data.toString());
        HandleUserMessage(user, JSON.parse(data.toString()));
    })
})
