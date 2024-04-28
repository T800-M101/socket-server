import { Router, Request, Response } from 'express';
import Server from '../classes/server';


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

export default router;