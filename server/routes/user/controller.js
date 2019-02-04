import isValidOId from '../../helpers/types'
import User from '../../models/user'
import Order from '../../models/order'

export const getAllUsers = (req, res) => {

  User.find({ isActive: true }, {
    itemId: 1,
    firstName: 1,
    lastName: 1,
    email: 1,
    phone: 1,
    address: 1,
    imageUrl: 1,
    role: 1,
    isVisible: 1,
    token: 1,
  })
    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Users not found')
      return res.status(200).send({ doc })

    })

}

export const getAllInactiveUsers = (req, res) => {

  User.find({ isActive: false }, {
    itemId: 1,
    firstName: 1,
    lastName: 1,
    email: 1,
    phone: 1,
    address: 1,
    imageUrl: 1,
    role: 1,
    isVisible: 1,
    isActive: 1,
  })
    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Users not found')
      return res.status(200).send({ doc })

    })

}

export const getRecentUsers = (req, res) => {

  Order.find({}, { isActive: 0, oldId: 0 })
    .populate('user', '_id itemId firstName lastName email phone address imageUrl role isVisible isActive')
    .sort({ requestDateTime: -1 })
    .limit(200)
    .exec((err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Orders not found')
      const users = doc.filter(item => item.user)
        .map(item => item.user)
        .slice(0, 100)
      return res.status(200).send({ doc: users })

    })

}

export const getUserById = (req, res) => {

  if (!isValidOId(req.params.id)) return res.boom.badRequest('Invalid Id')

  User.findOne(
    { _id: req.params.id, isActive: true },
    { isActive: 0, oldId: 0 }
  )
    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc || !doc._id) return res.boom.notFound('User not found')

      const currentUser = {
        _id: doc._id,
        firstName: doc.firstName,
        lastName: doc.lastName,
        token: doc.token,
        email: doc.email,
        phone: doc.phone,
        imageUrl: doc.imageUrl,
        address: doc.address,
        role: doc.role,
        isVisible: doc.isVisible,
      }
      return res.status(200).send({ doc: currentUser })

    })

}

export const activeUser = (req, res) => {

  if (!isValidOId(req.params.id)) return res.boom.badRequest('Invalid Id')

  User.findOneAndUpdate(
    { isActive: false, _id: req.params.id },
    { isActive: true },
    { new: true },
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc || !doc._id) return res.boom.notFound('User not found')

      const refreshUser = {
        _id: doc._id,
        firstName: doc.firstName,
        lastName: doc.lastName,
        email: doc.email,
        phone: doc.phone,
        imageUrl: doc.imageUrl,
        address: doc.address,
        role: doc.role,
        isVisible: doc.isVisible,
        isActive: doc.isActive,
      }
      return res.status(200).send({ message: 'User active!', doc: refreshUser })

    }
  )

}

export const putUser = (req, res) => {

  if (!isValidOId(req.params.id)) return res.boom.badRequest('Invalid Id')

  User.findOneAndUpdate(
    { isActive: true, _id: req.params.id },
    req.body,
    { new: true },
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc || !doc._id) return res.boom.notFound('User not found')

      const refreshUser = {
        _id: doc._id,
        firstName: doc.firstName,
        lastName: doc.lastName,
        email: doc.email,
        phone: doc.phone,
        imageUrl: doc.imageUrl,
        address: doc.address,
        role: doc.role,
        isVisible: doc.isVisible,
      }
      return res.status(200).send({ message: 'User updated!', doc: refreshUser })

    }
  )

}

export const deleteUser = (req, res) => {

  if (!isValidOId(req.params.id)) return res.boom.badRequest('Invalid Id')

  User.findOneAndUpdate(
    { isActive: true, _id: req.params.id },
    { isActive: false },
    err => {

      if (err) return res.boom.badImplementation('', { error: err })
      return res.status(200).send({ message: 'User removed!' })

    }
  )

}

export const deleteUserDeep = (req, res) => {

  if (!isValidOId(req.params.id)) return res.boom.badRequest('Invalid Id')

  User.findByIdAndRemove(
    req.params.id,
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc || !doc._id) return res.boom.notFound('User not found')
      return res.status(200).send({ message: 'User deep removed!' })

    }
  )

}
