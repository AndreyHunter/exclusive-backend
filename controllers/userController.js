import { UserService } from '../services/index.js';
import { CartService } from '../services/index.js';

export const signup = async (req, res) => {
    try {
        const user = await UserService.signUp(req.body);

        const sessionId = req.cookies.sessionId;
        const cart = await CartService.updateCartAfterAuth({
            sessionId,
            userId: user._id,
        });

        res.json({ user, cart });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const signin = async (req, res) => {
    try {
        const user = await UserService.signIn(req.body);

        const sessionId = req.cookies.sessionId;
        const cart = await CartService.updateCartAfterAuth({
            sessionId,
            userId: user._id,
        });

        res.json({ user, cart });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};
