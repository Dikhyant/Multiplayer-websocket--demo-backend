import { UserCharacter } from "./UserCharacter";
import WebSocket from "ws";

export const Users: User[] = new Array<User>();

export class User{
    constructor(ws: WebSocket.WebSocket) {
        this.character = new UserCharacter();
        this.webSocket = ws;
        this.uid = "";
    }

    public getWebSocket(): WebSocket.WebSocket {
        return this.webSocket;
    }

    public getCharacter(): UserCharacter {
        return this.character;
    }

    private webSocket: WebSocket.WebSocket
    private character: UserCharacter;
    public uid: string;
}