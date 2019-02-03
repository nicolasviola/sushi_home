import User from '../../models/user'
import Order from '../../models/order'

export const getUserByToken = (req, res) => {

  const token = req.headers.authorization.split(' ')[1]
  User.findOne({ token }, { isActive: 0, oldId: 0 })
    .exec(async (err, doc) => {

      const currentUser = {
        _id: doc._id,
        firstName: doc.firstName,
        lastName: doc.lastName,
        email: doc.email,
        phone: doc.phone,
        imageUrl: doc.imageUrl,
        address: doc.address,
        role: doc.role,
        token: doc.token,
        isVisible: doc.isVisible,
      }

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('user not found')
      return res.status(200).send({ doc: currentUser })

    })

}

export const getUserById = (req, res) => {

  User.findOne(
    { _id: req.params.id, isActive: true },
    { isActive: 0, oldId: 0 }
  )
    .exec(async (err, doc) => {

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

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('User not found')
      return res.status(200).send({ doc: currentUser })

    })

}

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
    .sort({'requestDateTime': -1})
    .limit(200)
    .populate('user', '_id itemId firstName lastName email phone address imageUrl role isVisible isActive')
    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Orders not found')
      const users = doc.map(item => item.user).slice(0,100)

      return res.status(200).send({ doc: users })

    })

}

export const putUser = (req, res) => {

  User.findOneAndUpdate(
    { isActive: true, _id: req.params.id },
    req.body,
    { new: true },
    (err, doc) => {

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

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('User not found')
      return res.status(200).send({ message: 'User updated!', doc: refreshUser })

    }
  )

}

export const activeUser = (req, res) => {

  User.findOneAndUpdate(
    { isActive: false, _id: req.params.id },
    { isActive: true },
    { new: true },
    (err, doc) => {

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

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('User not found')
      return res.status(200).send({ message: 'User active!', doc: refreshUser })

    }
  )

}

export const deleteUser = (req, res) => {

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

  User.findByIdAndRemove(
    req.params.id,
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('User not found')
      return res.status(200).send({ message: 'User deep removed!' })

    }
  )

}
