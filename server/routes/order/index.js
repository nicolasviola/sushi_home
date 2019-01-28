import express from 'express'
import {
  getOrderById,
  getAllOrders,
  getAllInactiveOrders,
  saveOrder,
  putOrder,
  activeOrder,
  deleteOrder,
  deleteOrderDeep,
} from './controller'

const router = express.Router()

router.get('/:id', getOrderById)
router.get('/', getAllOrders)
router.get('/inactive/all', getAllInactiveOrders)
router.post('/', saveOrder)
router.put('/:id', putOrder)
router.put('/active/:id', activeOrder)
router.delete('/:id', deleteOrder)
router.delete('/delete/:id', deleteOrderDeep)

export default router
