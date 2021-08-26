import { Router } from 'express';
import { hash } from 'bcryptjs';
import connection from '../database/connection';

const userRouter = Router();

userRouter.get('/', async (request, response) => {
    const users = await connection('users').select('*');

    return response.json(users);
});

userRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const passwordHashed = await hash(password, 8)

    const user = {
        name,
        email,
        password: passwordHashed
    };

    const newIds = await connection('users').insert(user);

    return response.json({
        id: newIds[0],
        ...user
    });
});

export default userRouter;