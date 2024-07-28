import { v4 as uuidv4 } from 'uuid';

const createSessionId = (req, res, next) => {
    if (!req.cookies.sessionId) {
        const sessionId = uuidv4();
        res.cookie('sessionId', sessionId, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    }
    next();
};

export default createSessionId;
