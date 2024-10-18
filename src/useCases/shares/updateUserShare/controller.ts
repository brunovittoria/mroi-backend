import { RequestHandler } from 'express';
import { updateUserShareService } from './service';

export const updateUserShareController: RequestHandler = async (req, res) => {
    await updateUserShareService({
        userId: req.user?.id,
        destination: req.body.destination,
    });

    res.status(200).send();
};
