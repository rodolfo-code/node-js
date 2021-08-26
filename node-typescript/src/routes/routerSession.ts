import { Router } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth'

import connection from '../database/connection';

const sessionsRouter = Router();

const validateToken = (user: any) => {
  const userData = {
    name: user.name,
    email: user.email,      
  }

  const token = sign(userData, authConfig.jwt.secret, {
    subject: String(user.id),
    expiresIn: authConfig.jwt.expiresIn
  })

  return token
}

sessionsRouter.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    const user = await connection('users').where('email', email).first();

    if (!user) {
      return res.status(400).json({message: 'Credentials not found'})
    }

    const comparePassword = await compare(password, user.password)

    if (!comparePassword) {
      return res.status(400).json({message: 'Credential not found'})
    }

    const userWithoutPass = {
      id: user.id,
      name: user.name,
      email: user.email
    }

    const token = validateToken(user)

    return res.json({userWithoutPass, token})

});

export default sessionsRouter;