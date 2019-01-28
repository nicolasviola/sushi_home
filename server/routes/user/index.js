import express from 'express'
import {
  // getUserByToken,
  getUserById,
  getAllUsers,
  getAllInactiveUsers,
  saveUser,
  putUser,
  activeUser,
  deleteUser,
  // deleteUserDeep,
} from './controller'

const router = express.Router()

// router.get('/token', getUserByToken)
router.get('/:id', getUserById)
router.get('/', getAllUsers)
router.get('/inactive/all', getAllInactiveUsers)
router.post('/', saveUser)
router.put('/:id', putUser)
router.put('/active/:id', activeUser)
router.delete('/:id', deleteUser)
// router.delete('/delete/:id', deleteUserDeep)

export default router
