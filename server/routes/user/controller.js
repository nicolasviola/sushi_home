import User from '../../models/user'

export const getUserByToken = (req, res) => {

  const token = req.headers.authorization.split(' ')[1]
  User.findOne({ token }, { isActive: 0, oldId: 0 })
    .exec(async (err, doc) => {

      const currentUser = {
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

export const saveUser = (req, res) => {

  const user = new User()
  user.firstName = req.body.firstName
  user.lastName = req.body.lastName
  user.email = req.body.email
  user.phone = req.body.phone
  user.password = req.body.password
  user.imageUrl = req.body.imageUrl
  user.address = req.body.address
  user.role = req.body.role
  user.isVisible = true
  user.isActive = true

  return user.save((error, data) => {

    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl,
      address: req.body.address,
      role: req.body.role,
      isVisible: req.body.isVisible,
    }

    if (error) return res.boom.badImplementation('', { error })
    return res.status(200).send({ message: 'User created', doc: newUser })

  })

}

export const putUser = (req, res) => {

  User.findOneAndUpdate(
    { isActive: true, _id: req.params.id },
    req.body,
    { new: true },
    (err, doc) => {

      const refreshUser = {
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
