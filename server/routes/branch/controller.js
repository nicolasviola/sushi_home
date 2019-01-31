import Branch from '../../models/branch'

export const getAllBranches = (req, res) =>

  Branch.find({ isActive: true }, { isActive: 0, oldId: 0 })

    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Branch not found')
      return res.status(200).send({ doc })

    })

export const getAllInactiveBranches = (req, res) =>

  Branch.find({ isActive: false }, { oldId: 0 })

    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Branch not found')
      return res.status(200).send({ doc })

    })

export const getBranchesById = (req, res) =>

  Branch.findOne(
    { _id: req.params.id, isActive: true },
    { isActive: 0, oldId: 0 }
  )
    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Branch not found')
      return res.status(200).send({ doc })

    })

export const saveBranch = (req, res) => {

  const NewBranch = new Branch()
  NewBranch.name = req.body.name
  NewBranch.hours.monday = req.body.hours.monday
  NewBranch.hours.tuesday = req.body.hours.tuesday
  NewBranch.hours.wednesday = req.body.hours.wednesday
  NewBranch.hours.thursday = req.body.hours.thursday
  NewBranch.hours.friday = req.body.hours.friday
  NewBranch.hours.saturday = req.body.hours.saturday
  NewBranch.hours.sunday = req.body.hours.sunday
  NewBranch.email = req.body.email
  NewBranch.scopeImageUrl = req.body.scopeImageUrl
  NewBranch.facebook = req.body.facebook
  NewBranch.instagram = req.body.instagram
  NewBranch.twiter = req.body.twiter
  NewBranch.deliveryPrice = req.body.deliveryPrice
  NewBranch.address = req.body.address
  NewBranch.phone = req.body.phone
  NewBranch.isOpen = req.body.isOpen
  NewBranch.isVisible = req.body.isVisible
  NewBranch.isActive = true

  NewBranch.save((error, doc) => {

    const newBranch = {
      _id: doc._id,
      name: doc.name,
      hours: doc.hours,
      email: doc.email,
      scopeImageUrl: doc.scopeImageUrl,
      facebook: doc.facebook,
      instagram: doc.instagram,
      twiter: doc.twiter,
      deliveryPrice: doc.deliveryPrice,
      address: doc.address,
      phone: doc.phone,
      isOpen: doc.isOpen,
      isVisible: doc.isVisible,
    }

    if (error) return res.boom.badImplementation('', { error })
    return res.status(200).send({ message: 'Branch created', doc: newBranch })

  })

}

export const updateBranch = (req, res) => {

  Branch.findOneAndUpdate(
    { isActive: true, _id: req.params.id },
    req.body,
    { new: true },
    (err, doc) => {

      const refreshBranch = {
        _id: doc._id,
        name: doc.name,
        hours: doc.hours,
        email: doc.email,
        scopeImageUrl: doc.scopeImageUrl,
        facebook: doc.facebook,
        instagram: doc.instagram,
        twiter: doc.twiter,
        deliveryPrice: doc.deliveryPrice,
        address: doc.address,
        phone: doc.phone,
        isOpen: doc.isOpen,
        isVisible: doc.isVisible,
      }

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Branch not found')
      return res.status(200).send({ message: 'Branch updated!', doc: refreshBranch })

    }
  )

}

export const activeBranch = (req, res) => {

  Branch.findOneAndUpdate(
    { isActive: false, _id: req.params.id },
    { isActive: true },
    { new: true },
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Branch not found')
      return res.status(200).send({ message: 'Branch active!', doc })

    }
  )

}

export const deleteBranch = (req, res) => {

  Branch.findOneAndUpdate(
    { isActive: true, _id: req.params.id },
    { isActive: false },
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      return res.status(200).send({ message: 'Branch removed!' })

    }
  )

}

export const deleteBranchDeep = (req, res) => {

  Branch.findByIdAndRemove(
    req.params.id,
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Branch not found')
      return res.status(200).send({ message: 'Branch deep removed!' })

    }
  )

}
