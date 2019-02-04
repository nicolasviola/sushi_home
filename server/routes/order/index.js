import express from 'express'
import {
  getAllOrders,
  getRecentOrders,
  getOrderById,
  saveOrder,
  refreshOrder,
  // deleteOrderDeep,
} from './controller'

const router = express.Router()

router.get('/', getAllOrders)
router.get('/recent', getRecentOrders)
router.get('/:id', getOrderById)
router.post('/', saveOrder)
router.put('/:id', refreshOrder)
// router.delete('/delete/:id', deleteOrderDeep)

export default router
