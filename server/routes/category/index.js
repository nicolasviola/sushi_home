import express from 'express'
import {
  getAllCategories,
  getCategoryById,
  getAllInactiveCategories,
  saveCategory,
  updateCategory,
  activeCategory,
  deleteCategory,
  deleteCategoryDeep,
} from './controller'

const router = express.Router()

router.get('/', getAllCategories)
router.get('/:id', getCategoryById)
router.get('/inactive/all', getAllInactiveCategories)
router.post('/', saveCategory)
router.put('/:id', updateCategory)
router.put('/active/:id', activeCategory)
router.delete('/:id', deleteCategory)
router.delete('/delete/:id', deleteCategoryDeep)

export default router
