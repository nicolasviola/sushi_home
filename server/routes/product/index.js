import express from 'express'
import {
  getAllProducts,
  getProductById,
  getProductsByCategoryId,
  getAllInactiveProducts,
  saveProduct,
  updateProduct,
  activeProduct,
  deleteProduct,
  // deleteProductDeep,
} from './controller'

const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.get('/inactive/all', getAllInactiveProducts)
router.get('/by/category/:id', getProductsByCategoryId)
router.post('/', saveProduct)
router.put('/:id', updateProduct)
router.put('/active/:id', activeProduct)
router.delete('/:id', deleteProduct)
// router.delete('/delete/:id', deleteProductDeep)

export default router
