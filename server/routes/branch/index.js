import express from 'express'
import {
  getAllBranches,
  getAllInactiveBranches,
  getBranchesById,
  saveBranch,
  updateBranch,
  activeBranch,
  deleteBranch,
  // deleteBranchDeep,
} from './controller'

const router = express.Router()

router.get('/', getAllBranches)
router.get('/inactive/all', getAllInactiveBranches)
router.get('/:id', getBranchesById)
router.post('/', saveBranch)
router.put('/:id', updateBranch)
router.put('/active/:id', activeBranch)
router.delete('/:id', deleteBranch)
// router.delete('/delete/:id', deleteBranchDeep)

export default router
