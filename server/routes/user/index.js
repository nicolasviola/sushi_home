import express from 'express'
import {
  getAllUsers,
  getAllInactiveUsers,
  getRecentUsers,
  getUserById,
  activeUser,
  putUser,
  deleteUser,
  // deleteUserDeep,
} from './controller'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/inactive/all', getAllInactiveUsers)
router.get('/recent', getRecentUsers)
router.get('/:id', getUserById)
router.put('/active/:id', activeUser)
router.put('/:id', putUser)
router.delete('/:id', deleteUser)
// router.delete('/delete/:id', deleteUserDeep)

export default router
