import { Router } from 'express'

import connection from '../database/connection'

const locationsRouter = Router()

locationsRouter.post('/', async (req, res) => {
  console.log('ola')
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items
  } = req.body;

  const location = {
    image: 'fake-image.jpg',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf
  }


  const newIds = await connection('locations').insert(location)
  const locationId = newIds[0];

  const locationItems = items.map((item_Id: Number) => {
    return {
      item_Id,
      location_id: locationId
    }
  })

  await connection('location_items').insert(locationItems)

  return res.json({
    id: locationId,
    ...location
  })
})

export default locationsRouter;