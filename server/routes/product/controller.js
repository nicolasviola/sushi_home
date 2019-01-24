import Product from '../../models/product'

export const getAllProducts = (req, res) =>

  Product.find({ isActive: true }, { isActive: 0 })

    .exec(async (err, data) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!data) return res.boom.notFound('Product not found')
      return res.status(200).send(data)

    })

export const getAllInactiveProducts = (req, res) =>

  Product.find({ isActive: false })

    .exec(async (err, data) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!data) return res.boom.notFound('Product not found')
      return res.status(200).send(data)

    })

export const getProductById = (req, res) =>

  Product.findOne({ _id: req.params.id, isActive: true }, { isActive: 0 })
    .exec(async (err, product) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!product) return res.boom.notFound('Product not found')
      return res.status(200).send(product)

    })

export const getProductsByCategoryId = (req, res) =>

  Product.find(
    { categoryId: req.params.id, isActive: true },
    { isActive: 0 }
  )
    .exec(async (err, product) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!product) return res.boom.notFound('Product not found')
      return res.status(200).send(product)

    })

export const saveProduct = (req, res) => {

  const product = new Product()
  product.name = req.body.name
  product.imageUrl = req.body.imageUrl
  product.categoryId = req.body.categoryId
  product.description = req.body.description
  product.units = req.body.units
  product.price = req.body.price
  product.imageUrl = req.body.imageUrl
  product.isVisible = req.body.isVisible
  product.isActive = true

  return product.save((error, doc) => {

    if (error) return res.boom.badImplementation('', { error })
    // Todo: hide isActive property
    return res.status(200).send({ message: 'Product created', doc })

  })

}


export const updateProduct = (req, res) => {

  Product.findOneAndUpdate(
    { isActive: true, _id: req.params.id },
    req.body,
    { new: true },
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Product not found')
      return res.status(200).send({ message: 'Product updated!', doc })

    }
  )

}

export const activeProduct = (req, res) => {

  Product.findOneAndUpdate(
    { isActive: false, _id: req.params.id },
    { isActive: true },
    { new: true },
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Product not found')
      return res.status(200).send({ message: 'Product active!', doc })

    }
  )

}

export const deleteProduct = (req, res) => {

  Product.findOneAndUpdate(
    { _id: req.params.id },
    { isActive: false },
    err => {

      if (err) return res.boom.badImplementation('', { error: err })
      return res.status(200).send({ message: 'Product removed!' })

    }
  )

}

export const deleteProductDeep = (req, res) => {

  Product.findByIdAndRemove(
    req.params.id,
    (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Product not found')
      return res.status(200).send({ message: 'Product deep removed!' })

    }
  )

}
