import Category from '../../models/category'

export const getAllCategories = (req, res) =>

  Category.find({ isActive: true }, { isActive: 0 })

    .exec(async (err, data) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!data) return res.boom.notFound('Category not found')
      return res.status(200).send(data)

    })

export const getAllInactiveCategories = (req, res) =>

  Category.find({ isActive: false })

    .exec(async (err, data) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!data) return res.boom.notFound('Category not found')
      return res.status(200).send(data)

    })

export const getCategoryById = (req, res) =>

  Category.findOne({ _id: req.params.id, isActive: true }, { isActive: 0 })
    .exec(async (err, category) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!category) return res.boom.notFound('Category not found')
      return res.status(200).send(category)

    })

export const saveCategory = (req, res) => {

  const category = new Category()
  category.name = req.body.name
  category.imageUrl = req.body.imageUrl
  category.isVisible = req.body.isVisible
  category.isActive = true

  return category.save((error, doc) => {

    if (error) return res.boom.badImplementation('', { error })
    // Todo: hide isActive property
    return res.status(200).send({ message: 'Category created', doc })

  })

}

export const updateCategory = (req, res) => {

  Category.findOneAndUpdate(
    { isActive: true, _id: req.params.id },
    req.body,
    { new: true },
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Category not found')
      return res.status(200).send({ message: 'Category updated!', doc })

    }
  )

}

export const activeCategory = (req, res) => {

  Category.findOneAndUpdate(
    { isActive: false, _id: req.params.id },
    { isActive: true },
    { new: true },
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Category not found')
      return res.status(200).send({ message: 'Category active!', doc })

    }
  )

}

export const deleteCategory = (req, res) => {

  Category.findOneAndUpdate(
    { _id: req.params.id },
    { isActive: false },
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      return res.status(200).send({ message: 'Category removed!' })

    }
  )

}

export const deleteCategoryDeep = (req, res) => {

  Category.findByIdAndRemove(
    req.params.id,
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Category not found')
      return res.status(200).send({ message: 'Category deep removed!' })

    }
  )

}
