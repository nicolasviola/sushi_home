import express from 'express'
import {
  // getUserByToken,
  getUserById,
  getAllUsers,
  getAllInactiveUsers,
  getRecentUsers,
  putUser,
  activeUser,
  deleteUser,
  // deleteUserDeep,
} from './controller'

const router = express.Router()

// router.get('/token', getUserByToken)
router.get('/inactive/all', getAllInactiveUsers)
router.get('/recent', getRecentUsers)
router.get('/:id', getUserById)
router.get('/', getAllUsers)
router.put('/active/:id', activeUser)
router.put('/:id', putUser)
router.delete('/:id', deleteUser)
// router.delete('/delete/:id', deleteUserDeep)

export default router
