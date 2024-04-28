import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsersList } from "../classes/users-list";
import { User } from "../classes/user";

export const usersConnected = new UsersList();

// Connect client
export const connectClient = (client: Socket) => {
    const user = new User(client.id);
    usersConnected.addUser(user);
}



export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
       const userDisconnected =  usersConnected.removeUser(client.id);
       console.log(`User: ${userDisconnected?.name}, left the room.`)
    });
}

// Listen to messages
export const message = (client: Socket, io: socketIO.Server) => {
    client.on('message', (payload: { from: string, message: string }) => {
        console.log('message received', payload);
        io.emit('new-message', payload);
    });


}

// Configure client
export const configureUser = (client: Socket, io: socketIO.Server) => {
    client.on('configure-user', (payload: { name: string }, callback: Function) => {
        usersConnected.updateUserName(client.id, payload.name);
        callback({
            ok: true,
            message: `User ${payload.name}, configured.`
        });
    });    
}
