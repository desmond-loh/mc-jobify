import { UnAuthenticatedError } from '../errors/index.js';
import jwt from 'jsonwebtoken';

const auth = async function(req,res,next) {
    //console.log(req.cookies);

    const token = req.cookies.token;
    if (!token) {
        throw new UnAuthenticatedError('Authentication Invalid');
    }

    // const authHeader = req.headers.authorization;
    // if(!authHeader || !authHeader.startsWith('Bearer')) {
    //     throw new UnAuthenticatedError("Authentication Invalid");
    // }
    // const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        //console.log(payload);
        //req.user = payload;

        const testUser = payload.userId === "63ce2d1ed52eeff805c37895";

        req.user = { userId: payload.userId, testUser };
        next();
    }
    catch (error)
    {
        throw new UnAuthenticatedError("Authentication Invalid");
    }
};

export default auth