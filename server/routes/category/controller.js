import isValidOId from '../../helpers/types'
import Category from '../../models/category'

export const getAllCategories = (req, res) =>

  Category.find({ isActive: true }, { isActive: 0, oldId: 0 })

    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Category not found')
      return res.status(200).send({ doc })

    })

export const getAllInactiveCategories = (req, res) =>

  Category.find({ isActive: false })

    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Category not found')
      return res.status(200).send({ doc })

    })

export const getCategoryById = (req, res) => {

  if (!isValidOId(req.params.id)) return res.boom.badRequest('Invalid Id')

  Category.findOne(
    { _id: req.params.id, isActive: true },
    { isActive: 0, oldId: 0 }
  )
    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc || !doc._id) return res.boom.notFound('Category not found')
      return res.status(200).send({ doc })

    })

}

export const saveCategory = (req, res) => {

  const category = new Category()
  category.name = req.body.name
  category.imageUrl = req.body.imageUrl
  category.isVisible = req.body.isVisible
  category.order = req.body.order || 0
  category.isActive = true

  return category.save((error, doc) => {

    if (error) return res.boom.badImplementation('', { error })
    const newCat = {
      _id: doc._id,
      name: doc.name,
      order: doc.order || 0,
      imageUrl: doc.imageUrl,
      isVisible: doc.isVisible,
    }
    return res.status(200).send({ message: 'Category created', doc: newCat })

  })

}

export const activeCategory = (req, res) => {

  if (!isValidOId(req.params.id)) return res.boom.badRequest('Invalid Id')

  Category.findOneAndUpdate(
    { isActive: false, _id: req.params.id },
    { isActive: true },
    { new: true },
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc || !doc._id) return res.boom.notFound('Category not found')
      return res.status(200).send({ message: 'Category active!', doc })

    }
  )

}

export const updateCategory = (req, res) => {

  if (!isValidOId(req.params.id)) return res.boom.badRequest('Invalid Id')

  Category.findOneAndUpdate(
    { isActive: true, _id: req.params.id },
    {
      ...req.body,
      order: req.body.order || 0,
    },
    { new: true },
    (err, doc) => {

      const refreshCat = {
        _id: doc._id,
        name: doc.name,
        order: doc.order || 0,
        imageUrl: doc.imageUrl,
        isVisible: doc.isVisible,
      }

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc || !doc._id) return res.boom.notFound('Category not found')
      return res.status(200).send({ message: 'Category updated!', doc: refreshCat })

    }
  )

}

export const deleteCategory = (req, res) => {

  if (!isValidOId(req.params.id)) return res.boom.badRequest('Invalid Id')

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

  if (!isValidOId(req.params.id)) return res.boom.badRequest('Invalid Id')

  Category.findByIdAndRemove(
    req.params.id,
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc || !doc._id) return res.boom.notFound('Category not found')
      return res.status(200).send({ message: 'Category deep removed!' })

    }
  )

}
