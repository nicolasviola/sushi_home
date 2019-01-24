import User from '../../models/user'

export const getUserByToken = (req, res) => {

  const token = req.headers.authorization.split(' ')[1]
  User.findOne({ token }, (err, doc) => {

    if (err) return res.boom.badImplementation('', { error: err })
    if (!doc) return res.boom.notFound('user not found')
    return res.status(200).send(doc)

  })

}

export const getUserById = (req, res) => {

  User.findOne({ _id: req.params.id, isActive: true }, { isActive: 0 })
    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('User not found')
      return res.status(200).send(doc)

    })

}

export const getAllUsers = (req, res) => {

  User.find({ isActive: true }, { isActive: 0 })
    .exec(async (err, docs) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!docs) return res.boom.notFound('Users not found')
      return res.status(200).send(docs)


    })

}

export const getAllInactiveUsers = (req, res) => {

  User.find({ isActive: false })
    .exec(async (err, docs) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!docs) return res.boom.notFound('Users not found')
      return res.status(200).send(docs)


    })

}

export const putUser = (req, res) => {

  User.findOneAndUpdate(
    { isActive: true, _id: req.params.id },
    req.body,
    { new: true },
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('User not found')
      return res.status(200).send({ message: 'User updated!', doc })

    }
  )

}

export const activeUser = (req, res) => {

  User.findOneAndUpdate(
    { isActive: false, _id: req.params.id },
    { isActive: true },
    { new: true },
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('User not found')
      return res.status(200).send({ message: 'User active!', doc })

    }
  )

}

export const saveUser = (req, res) => {

  const user = new User()
  user.name = req.body.name
  user.mail = req.body.mail
  user.phone = req.body.phone
  user.pass = req.body.pass
  user.imageUrl = req.body.imageUrl
  user.addres = req.body.addres
  user.role = req.body.role
  user.isVisible = req.body.isVisible
  user.isActive = true

  return user.save((error, data) => {

    if (error) return res.boom.badImplementation('', { error })
    // Todo: hide isActive property
    return res.status(200).send({ message: 'User created', doc: data })

  })

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
      if (!doc) return res.boom.notFound('Product not found')
      return res.status(200).send({ message: 'User deep removed!' })

    }
  )

}
