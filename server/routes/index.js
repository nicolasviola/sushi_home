import express from 'express'
import category from './category'
import branch from './branch'
import product from './product'
import user from './user'
import order from './order'
import auth from './auth'

const router = express.Router()

router.use('/category', category)
router.use('/branch', branch)
router.use('/product', product)
router.use('/user', user)
router.use('/order', order)
router.use('/auth', auth)

export default router
