
import Server from "./classes/server";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from 'cors';


// Create server
const server = Server.instance;

// BodyParser
server.app.use( bodyParser.urlencoded({ extended: true}));
server.app.use( bodyParser.json());

// CORS
server.app.use( cors({ origin: true, credentials: true}));


// Services Routes
server.app.use('/api', router);


// Run server
server.start( () => {
    console.log(`Server running on port ${server.port}`);
})