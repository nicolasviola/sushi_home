import express from 'express'
import {
  getAllCategories,
  getAllInactiveCategories,
  getCategoryById,
  saveCategory,
  activeCategory,
  updateCategory,
  deleteCategory,
  // deleteCategoryDeep,
} from './controller'

const router = express.Router()

router.get('/', getAllCategories)
router.get('/inactive/all', getAllInactiveCategories)
router.get('/:id', getCategoryById)
router.post('/', saveCategory)
router.put('/active/:id', activeCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)
// router.delete('/delete/:id', deleteCategoryDeep)

export default router
