import {Router} from 'express'

const router = Router()

router.get('/', (req, res) => {
  return res.json({message: 'Ola dev'})
})

export default router