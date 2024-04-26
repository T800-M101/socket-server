import { Router, Request, Response } from 'express';

const router = Router();



router.get('/messages', (req: Request, res: Response) => {
    res.json({
        ok: true,
        message: 'All OK'
    });
});


router.post('/messages', (req: Request, res: Response) => {

    const { message, from } = req.body;

    res.json({
        ok: true,
        message,
        from
    });
});


router.post('/messages/:id', (req: Request, res: Response) => {

    const { message, from } = req.body;
    const id = req.params.id;

    res.json({
        ok: true,
        message,
        from,
        id
    });
});

export default router;