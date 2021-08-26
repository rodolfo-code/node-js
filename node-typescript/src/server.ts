import express from 'express'
import cors from 'cors'
import path from 'path'
import { errors } from 'celebrate'
import Router from './routes'

const app = express()
const PORT = 3000

app.use(cors());

app.use(express.json())

app.use('/items', Router.itemRouter)
app.use('/locations', Router.locationsRouter)
app.use('/users', Router.userRouter)
app.use('/sessions', Router.sessionsRouter)

app.use(errors());

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(PORT, () => `Server running on port ${PORT}`)