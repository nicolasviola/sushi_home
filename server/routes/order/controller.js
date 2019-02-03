import Order from '../../models/order'

export const getOrderById = (req, res) => {

  Order.findOne(
    { _id: req.params.id },
    { isActive: 0, oldId: 0 }
  )
    .populate('user', '_id firstName lastName email phone address imageUrl role dateAdded isVisible')
    .populate(
      'branch',
      '_id hours name email scopeImageUrl facebook instagram twiter deliveryPrice address phone isOpen isVisible'
    )
    .populate('products.product', '_id itemId categoryId name description units price imageUrl isVisible')
    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Order not found')
      return res.status(200).send({ doc })

    })

}

export const getAllOrders = (req, res) => {

  Order.find({}, { isActive: 0, oldId: 0 })
    .populate('user', '_id firstName lastName email phone address imageUrl role dateAdded isVisible')
    .populate(
      'branch',
      '_id hours name email scopeImageUrl facebook instagram twiter deliveryPrice address phone isOpen isVisible'
    )
    .populate('products.product', '_id itemId categoryId name description units price imageUrl isVisible')
    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Orders not found')

      return res.status(200).send({ doc })

    })

}

export const getRecentOrders = (req, res) => {

  Order.find({}, { isActive: 0, oldId: 0 })
    .sort({'requestDateTime': -1})
    .limit(100)
    .populate('user', '_id firstName lastName email phone address imageUrl role dateAdded isVisible')
    .populate(
      'branch',
      '_id hours name email scopeImageUrl facebook instagram twiter deliveryPrice address phone isOpen isVisible'
    )
    .populate('products.product', '_id itemId categoryId name description units price imageUrl isVisible')
    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Orders not found')

      return res.status(200).send({ doc })

    })

}

export const saveOrder = (req, res) => {

  const order = new Order()
  order.user = req.body.user
  order.branch = req.body.branch
  order.products = req.body.products
  order.requestDateTime = Date.now()
  order.selectedTime = req.body.selectedTime
  order.confirmedTime = req.body.confirmedTime
  order.deliveredTime = req.body.deliveredTime
  order.isCanceled = req.body.isCanceled
  order.deliveryPrice = req.body.deliveryPrice
  order.deliveryAddress = req.body.deliveryAddress
  order.clientPhoneAdd = req.body.clientPhoneAdd
  order.clientPhone = req.body.clientPhone
  order.clientsComments = req.body.clientsComments
  order.adminComments = req.body.adminComments
  order.isActive = true

  return Order.create(order, async (error, doc) => {

    if (error) return res.boom.badImplementation('', { error })
    return Order.findOne(
      { _id: doc.id },
      { isActive: 0, oldId: 0 }
    )
      .populate('user', '_id firstName lastName email phone address imageUrl role dateAdded isVisible')
      .populate(
        'branch',
        '_id hours name email scopeImageUrl facebook instagram twiter deliveryPrice address phone isOpen isVisible'
      )
      .populate('products.product', '_id itemId categoryId name description units price imageUrl isVisible')
      .exec(async (err, docu) => {

        const newOrder = {
          _id: docu._id,
          user: docu.user,
          branch: docu.branch,
          products: docu.products,
          requestDateTime: docu.requestDateTime,
          selectedTime: docu.selectedTime,
          confirmedTime: docu.confirmedTime,
          deliveredTime: docu.deliveredTime,
          isCanceled: docu.isCanceled,
          deliveryPrice: docu.deliveryPrice,
          deliveryAddress: docu.deliveryAddress,
          clientPhoneAdd: docu.clientPhoneAdd,
          clientPhone: docu.clientPhone,
          clientsComments: docu.clientsComments,
          adminComments: docu.adminComments,
        }

        if (err) return res.boom.badImplementation('', { err })
        if (!docu) return res.boom.badImplementation('', { error })
        return res.status(200).send({ message: 'Order created', doc: newOrder })

      })

  })

}

export const refreshOrder = (req, res) => {

  Order.findOneAndUpdate(
    { isActive: true, _id: req.params.id },
    req.body,
    { new: true },
  )
    .populate('user', '_id firstName lastName email phone address imageUrl role dateAdded isVisible')
    .populate(
      'branch',
      '_id hours name email scopeImageUrl facebook instagram twiter deliveryPrice address phone isOpen isVisible'
    )
    .populate('products.product', '_id itemId categoryId name description units price imageUrl isVisible')
    .exec((err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Order not found')
      return res.status(200).send({ message: 'Order updated!', doc })

    })

}

// export const deleteOrderDeep = (req, res) => {

//   Order.findByIdAndRemove(
//     req.params.id,
//     (err, doc) => {

//       if (err) return res.boom.badImplementation('', { error: err })
//       if (!doc) return res.boom.notFound('Order not found')
//       return res.status(200).send({ message: 'Order deep removed!' })

//     }
//   )

// }
