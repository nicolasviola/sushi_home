import Branch from '../../models/branch'

export const getAllBranches = (req, res) =>

  Branch.find({ isActive: true }, { isActive: 0 })

    .exec(async (err, data) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!data) return res.boom.notFound('Branch not found')
      return res.status(200).send(data)

    })

export const getAllInactiveBranches = (req, res) =>

  Branch.find({ isActive: false })

    .exec(async (err, data) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!data) return res.boom.notFound('Branch not found')
      return res.status(200).send(data)

    })

export const getBranchesById = (req, res) =>

  Branch.findOne({ _id: req.params.id, isActive: true }, { isActive: 0 })
    .exec(async (err, data) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!data) return res.boom.notFound('Branch not found')
      return res.status(200).send(data)

    })

export const saveBranch = (req, res) => {

  const NewBranch = new Branch()
  NewBranch.name = req.body.name
  NewBranch.hours.monday = req.body.hours.monday
  NewBranch.hours.tuesday = req.body.hours.monday
  NewBranch.hours.wednesday = req.body.hours.monday
  NewBranch.hours.thursday = req.body.hours.monday
  NewBranch.hours.friday = req.body.hours.monday
  NewBranch.hours.saturday = req.body.hours.monday
  NewBranch.hours.sunday = req.body.hours.monday
  NewBranch.email = req.body.email
  NewBranch.scopeImageUrl = req.body.scopeImageUrl
  NewBranch.facebook = req.body.facebook
  NewBranch.instagram = req.body.instagram
  NewBranch.twiter = req.body.twiter
  NewBranch.deliveryPrice = req.body.deliveryPrice
  NewBranch.addres = req.body.addres
  NewBranch.phone = req.body.phone
  NewBranch.isOpen = req.body.isOpen
  NewBranch.isVisible = req.body.isVisible
  NewBranch.isActive = true

  NewBranch.save((error, doc) => {

    if (error) return res.boom.badImplementation('', { error })
    // Todo: hide isActive property
    return res.status(200).send({ message: 'Branch created', doc })

  })

}

export const updateBranch = (req, res) => {

  Branch.findOneAndUpdate(
    { isActive: true, _id: req.params.id },
    req.body,
    { new: true },
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Branch not found')
      return res.status(200).send({ message: 'Branch updated!', doc })

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
