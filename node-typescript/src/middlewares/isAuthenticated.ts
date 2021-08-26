import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
	const token = request.headers.authorization;
  // console.log(token)

	if (!token) {
		return response.status(401).json({message: 'JWT Token is missing.' });
	}

	try {
		const decodedToken = verify(token, authConfig.jwt.secret);

		console.log(decodedToken);

		return next();
	} catch (error) {
		return response.status(401).json({message: 'Invalid JWT Token.' });
	}
}