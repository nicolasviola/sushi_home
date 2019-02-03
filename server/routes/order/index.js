import express from 'express'
import {
  getOrderById,
  getAllOrders,
  getRecentOrders,
  saveOrder,
  refreshOrder,
  // deleteOrderDeep,
} from './controller'

const router = express.Router()

router.get('/recent', getRecentOrders)
router.get('/:id', getOrderById)
router.get('/', getAllOrders)
router.post('/', saveOrder)
router.put('/:id', refreshOrder)
// router.delete('/delete/:id', deleteOrderDeep)

export default router
