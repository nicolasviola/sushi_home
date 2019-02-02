import Product from '../../models/product'

export const getAllProducts = (req, res) =>

  Product.find({ isActive: true }, { isActive: 0, oldId: 0 })
    .populate('category', '_id name imageUrl order isVisible')
    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Product not found')
      return res.status(200).send({ doc })

    })

export const getAllInactiveProducts = (req, res) =>

  Product.find({ isActive: false })
    .populate('category', '_id name imageUrl order isVisible')
    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Product not found')
      return res.status(200).send({ doc })

    })

export const getProductById = (req, res) =>

  Product.findOne(
    { _id: req.params.id, isActive: true },
    { isActive: 0, oldId: 0 }
  )
    .populate('category', '_id name imageUrl order isVisible')
    .exec(async (err, product) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!product) return res.boom.notFound('Product not found')
      return res.status(200).send({ doc: product })

    })

export const saveProduct = (req, res) => {

  const product = new Product()
  product.name = req.body.name
  product.category = req.body.category
  product.description = req.body.description
  product.units = req.body.units
  product.price = req.body.price
  product.imageUrl = req.body.imageUrl
  product.isVisible = req.body.isVisible
  product.isActive = true

  Product.create(product, async (error, doc) => {

    if (error) return res.boom.badImplementation('', { error })
    return Product.findOne(
      { _id: doc.id },
      { isActive: 0, oldId: 0 }
    )
      .populate('category', '_id name imageUrl order isVisible')
      .exec(async (err, docu) => {

        const newProduct = {
          _id: docu._id,
          name: docu.name,
          category: docu.category,
          description: docu.description,
          units: docu.units,
          price: docu.price,
          imageUrl: docu.imageUrl,
          isVisible: docu.isVisible,
        }

        if (err) return res.boom.badImplementation('', { error: err })
        if (!docu) return res.boom.badImplementation('', { error })
        return res.status(200).send({ message: 'Product created', doc: newProduct })

      })

  })

}

export const updateProduct = (req, res) => {

  Product.findOneAndUpdate(
    { isActive: true, _id: req.params.id },
    req.body,
    { new: true }
  )
    .populate('category', '_id name imageUrl order isVisible')
    .exec(async (err, doc) => {

      const refreshProduct = {
        _id: doc._id,
        name: doc.name,
        imageUrl: doc.imageUrl,
        category: doc.category,
        description: doc.description,
        units: doc.units,
        price: doc.price,
        isVisible: doc.isVisible,
        isActive: true,
      }

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Product not found')
      return res.status(200).send({ message: 'Product updated!', doc: refreshProduct })

    })

}

export const activeProduct = (req, res) => {

  Product.findOneAndUpdate(
    { isActive: false, _id: req.params.id },
    { isActive: true },
    { new: true }
  )
    .populate('category', '_id name imageUrl order isVisible')
    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Product not found')
      return res.status(200).send({ message: 'Product active!', doc })

    })

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
