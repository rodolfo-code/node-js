import express from 'express'
import path from 'path'
import Router from './routes'

// import router from './routes'
// import itemRouter from './routes/routeItems'

const app = express()
const PORT = 3000

app.use(express.json())

app.use('/items', Router.itemRouter)
app.use('/locations', Router.locationsRouter)

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(PORT, () => `Server running on port ${PORT}`)