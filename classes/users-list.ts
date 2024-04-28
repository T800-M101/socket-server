import { User } from "./user";

export class UsersList {
    private _userslist: User[] = [];


    constructor() { }

    //Add user
    public addUser(user: User): User {
        this._userslist.push(user);
        console.log("======== Adding new user ===========");
        console.log(this._userslist)
        return user;
    }

    // Assign user id
    public updateUserName(id: string, name: string): void {
        for (let user of this._userslist) {
            if (user.id === id) {
                user.name = name;
                break;
            }
        }
        console.log("======== Updatating user ===========");
        console.log(this._userslist)
    }

    //Get list of users
    public getUsersList(): User[] {
        console.log("======== Users list ===========");
        return this._userslist;
    }

    // Get user
    public getUser(id: string): User | undefined {
        return this._userslist.find(user => user.id === id);
    }

    // Get users in a room
    public getUsersInRoom(room: string): User[] {
        console.log("======== User in room ===========");
        return this._userslist.filter(user => user.room === room);
    }

    // Erase  user
    public removeUser(id: string): User | undefined {
        const deletedUser = this.getUser(id);
        this._userslist = this._userslist.filter(user => user.id !== id);
        console.log("======== removing user ===========");
        console.log(this._userslist)
        return deletedUser;
    }



} 