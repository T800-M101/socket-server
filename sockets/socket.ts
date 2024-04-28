import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsersList } from "../classes/users-list";
import { User } from "../classes/user";

export const usersConnected = new UsersList();

// Connect client
export const connectClient = (client: Socket, io:socketIO.Server) => {
    const user = new User(client.id);
    usersConnected.addUser(user);
}



export const disconnect = (client: Socket, io: socketIO.Server) => {
    client.on('disconnect', () => {
       const userDisconnected = usersConnected.removeUser(client.id);
       console.log(`User: ${userDisconnected?.name}, left the room.`);
       io.emit('active-users', usersConnected.getUsersList()); 
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
        io.emit('active-users', usersConnected.getUsersList()); 

        callback({
            ok: true,
            message: `User ${payload.name}, configured.`
        });
    });    
}

// Get active users
export const getActiveUsers = ( client: Socket, io: socketIO.Server) => {
    client.on('get-users', () => {
        io.to(client.id).emit('active-users', usersConnected.getUsersList()); 
    });    
}
