import { signUpService, signInService } from '../services/userService.js';
import { updateCartAfterAuthService } from '../services/cart/cartService.js';

export const signup = async (req, res) => {
    try {
        const user = await signUpService(req.body);

        const sessionId = req.cookies.sessionId;
        const cart = await updateCartAfterAuthService({
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
        const user = await signInService(req.body);

        const sessionId = req.cookies.sessionId;
        const cart = await updateCartAfterAuthService({
            sessionId,
            userId: user._id,
        });

        res.json({ user, cart });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};
