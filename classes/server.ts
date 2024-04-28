import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';


export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port!: number;

    private httpServer: http.Server;
    public io: socketIO.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = new socketIO.Server(this.httpServer, {
            cors: {
                origin: "http://localhost:4200",
                methods: ["GET", "POST"],
                credentials: true
            }
        });

        this.listeSockets();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private listeSockets() {
        console.log('listen Connections...');
        this.io.on('connection', client => {
             // STEP 1: Connect client
             socket.connectClient(client);
            // STEP 2: Configure user
            socket.configureUser(client, this.io);
            // Listen messages
            socket.message(client, this.io);

            // Disconnect
            socket.disconnect(client);
        });

    }

    start(callback: any) {
        this.httpServer.listen(this.port, callback);
    }
}