import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }

        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
        });
    } catch (error) {
        // Handle the error appropriately (e.g., log it or send an error response)
        console.error('Error generating token:', error.message);
        // You might want to throw the error or return an error response here.
    }
};

export default generateToken;
