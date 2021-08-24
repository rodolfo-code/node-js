import express from 'express'

import router from './routes'

const app = express()
const PORT = 3000

app.use('/rota', router)

app.listen(PORT, () => `Server running on port ${PORT}`)