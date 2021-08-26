import {Router} from 'express'
import connection from '../database/connection'

const itemRouter = Router()

const serialize = (items: any[]) => items.map(item => {
  return {
    id: item.id,
    title: item.title,
    image_url: `http://localhost:3000/uploads/${item.image}`
  }
})

itemRouter.get('/', async (req, res) => {
  const items = await connection('items').select('*')

  const serializeItems = serialize(items)

  return res.json(serializeItems)
})

export default itemRouter;