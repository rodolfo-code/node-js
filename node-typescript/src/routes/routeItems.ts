import {Router} from 'express'
import connection from '../database/connection'

const itemRouter = Router()

itemRouter.get('/', async (req, res) => {
  const items = await connection('items').select('*')

  const serializeItems = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3000/uploads/${item.image}`
    }
  })

  return res.json(serializeItems)
})

export default itemRouter;