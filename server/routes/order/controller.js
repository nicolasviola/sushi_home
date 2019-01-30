import Order from '../../models/order'

export const getOrderById = (req, res) => {

  Order.findOne(
    { _id: req.params.id },
    { isActive: 0, oldId: 0 }
  )
    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Order not found')
      return res.status(200).send({ doc })

    })

}

export const getAllOrders = (req, res) => {

  Order.find({}, { isActive: 0, oldId: 0 })
    .populate('products.product', '_id itemId categoryId name description units price imageUrl isVisible')
    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Orders not found')

      return res.status(200).send({ doc })

    })

}

// export const getAllInactiveOrders = (req, res) => {

//   Order.find({ isActive: false })
//     .exec(async (err, doc) => {

//       if (err) return res.boom.badImplementation('', { error: err })
//       if (!doc) return res.boom.notFound('Orders not found')
//       return res.status(200).send({ doc })

//     })

// }

export const putOrder = (req, res) => {

  Order.findOneAndUpdate(
    { isActive: true, _id: req.params.id },
    req.body,
    { new: true },
  )
    .populate('products.productId', '_id itemId categoryId name description units price imageUrl isVisible')
    .exec((err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Order not found')
      return res.status(200).send({ message: 'Order updated!', doc })

    })

}

// export const activeOrder = (req, res) => {

//   Order.findOneAndUpdate(
//     { isActive: false, _id: req.params.id },
//     { isActive: true },
//     { new: true },
//     (err, doc) => {

//       if (err) return res.boom.badImplementation('', { error: err })
//       if (!doc) return res.boom.notFound('Order not found')
//       return res.status(200).send({ message: 'Order active!', doc })

//     }
//   )

// }

export const saveOrder = (req, res) => {

  const order = new Order()
  order.userId = req.body.userId
  order.branchId = req.body.branchId
  order.products = req.body.products
  order.requestDateTime = req.body.requestDateTime
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

  return order.save((error, data) => {

    const refreshOrder = {
      userId: data.userId,
      branchId: data.branchId,
      products: data.products,
      requestDateTime: data.requestDateTime,
      selectedTime: data.selectedTime,
      confirmedTime: data.confirmedTime,
      deliveredTime: data.deliveredTime,
      isCanceled: data.isCanceled,
      deliveryPrice: data.deliveryPrice,
      deliveryAddress: data.deliveryAddress,
      clientPhoneAdd: data.clientPhoneAdd,
      clientPhone: data.clientPhone,
      clientsComments: data.clientsComments,
      adminComments: data.adminComments,
      isActive: true,
    }

    if (error) return res.boom.badImplementation('', { error })
    return res.status(200).send({ message: 'Order created', doc: refreshOrder })

  })

}

// export const deleteOrder = (req, res) => {

//   Order.findOneAndUpdate(
//     { isActive: true, _id: req.params.id },
//     { isActive: false },
//     err => {

//       if (err) return res.boom.badImplementation('', { error: err })
//       return res.status(200).send({ message: 'Order removed!' })

//     }
//   )

// }

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
