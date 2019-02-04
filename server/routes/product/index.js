import express from 'express'
import {
  getAllProducts,
  getAllInactiveProducts,
  getProductById,
  saveProduct,
  activeProduct,
  updateProduct,
  deleteProduct,
  // deleteProductDeep,
} from './controller'

const router = express.Router()

router.get('/', getAllProducts)
router.get('/inactive/all', getAllInactiveProducts)
router.get('/:id', getProductById)
router.post('/', saveProduct)
router.put('/active/:id', activeProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
// router.delete('/delete/:id', deleteProductDeep)

export default router
