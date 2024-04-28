import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usersConnected } from '../sockets/socket';


const router = Router();



router.get('/messages', (req: Request, res: Response) => {
    res.json({
        ok: true,
        message: 'All OK'
    });
});


router.post('/messages', (req: Request, res: Response) => {

    const { message, from } = req.body;

    const server = Server.instance;

    const payload = {
        from,
        message
    }

    server.io.emit('new-message', payload);


    res.json({
        ok: true,
        message,
        from
    });
});
 

router.post('/messages/:id', (req: Request, res: Response) => {

    const { message, from } = req.body;
    const id = req.params.id;

    const server = Server.instance;

    const payload = {
        from,
        message
    }

    server.io.in( id ).emit('private-message', payload);

    res.json({
        ok: true,
        message,
        from,
        id
    });
});

// Get all users ids
router.get('/users', async (req: Request, res: Response) => {
    const server = Server.instance;
    await server.io.fetchSockets().then( sockets => {
        if ( sockets.length > 0) {
            let clients: string [] = [];
            for ( let socket of sockets ) {
                clients.push(socket.id);
            }
            return res.json({
                ok: true,
                clients
            });
        } else {
            return res.json({
                ok: false,
                clients: []
            });
        }
    }).catch( err => {
        return res.json({
            ok: false,
            clients: []
        });
    });   
});

// Get users names
router.get('/users/detail', (req: Request, res:Response) => {
    res.json({
        ok: true,
        clients: usersConnected.getUsersList();
    }); 
    
});

export default router;