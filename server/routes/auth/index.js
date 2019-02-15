import express from 'express'
import {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  logout,
  serverStatus,
} from './controller'

const router = express.Router()

router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.put('/forgotPassword', forgotPassword)
router.put('/resetPassword', resetPassword)
router.delete('/logout/:id', logout)
router.post('/serverStatus', serverStatus)

export default router
