import isValidOId from '../../helpers/types'
import Order from '../../models/order'

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
    .populate('user', '_id firstName lastName email phone address imageUrl role dateAdded isVisible')
    .populate(
      'branch',
      '_id hours name email scopeImageUrl facebook instagram twiter deliveryPrice address phone isOpen isVisible'
    )
    .populate('products.product', '_id itemId categoryId name description units price imageUrl isVisible')
    .sort({ requestDateTime: -1 })
    .limit(100)
    .exec(async (err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc) return res.boom.notFound('Orders not found')

      return res.status(200).send({ doc: doc.filter(item => item.user) })

    })

}

export const getOrderById = (req, res) => {

  if (!isValidOId(req.params.id)) return res.boom.badRequest('Invalid Id')

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
      if (!doc || !doc._id) return res.boom.notFound('Order not found')
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
      .exec(async (err, doc) => {

        if (err) return res.boom.badImplementation('', { err })
        if (!doc || !doc._id) return res.boom.badImplementation('', { error })

        const newOrder = {
          _id: doc._id,
          user: doc.user,
          branch: doc.branch,
          products: doc.products,
          requestDateTime: doc.requestDateTime,
          selectedTime: doc.selectedTime,
          confirmedTime: doc.confirmedTime,
          deliveredTime: doc.deliveredTime,
          isCanceled: doc.isCanceled,
          deliveryPrice: doc.deliveryPrice,
          deliveryAddress: doc.deliveryAddress,
          clientPhoneAdd: doc.clientPhoneAdd,
          clientPhone: doc.clientPhone,
          clientsComments: doc.clientsComments,
          adminComments: doc.adminComments,
        }
        return res.status(200).send({ message: 'Order created', doc: newOrder })

      })

  })

}

export const confirmOrder = (req, res) => {

  if (!isValidOId(req.params.id)) return res.boom.badRequest('Invalid Id')

  Order.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { confirmedTime: req.body.confirmedTime || '' }},
  )
    .populate('user', '_id firstName lastName email phone address imageUrl role dateAdded isVisible')
    .populate(
      'branch',
      '_id hours name email scopeImageUrl facebook instagram twiter deliveryPrice address phone isOpen isVisible'
    )
    .populate('products.product', '_id itemId categoryId name description units price imageUrl isVisible')
    .exec((err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc || !doc._id) return res.boom.notFound('Order not found')
      return res.status(200).send({ message: 'Order confirmed!', doc })

    })

}


export const deliverOrder = (req, res) => {

  if (!isValidOId(req.params.id)) return res.boom.badRequest('Invalid Id')

  Order.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { deliveredTime: req.body.deliveredTime || '' }},
  )
    .populate('user', '_id firstName lastName email phone address imageUrl role dateAdded isVisible')
    .populate(
      'branch',
      '_id hours name email scopeImageUrl facebook instagram twiter deliveryPrice address phone isOpen isVisible'
    )
    .populate('products.product', '_id itemId categoryId name description units price imageUrl isVisible')
    .exec((err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc || !doc._id) return res.boom.notFound('Order not found')
      return res.status(200).send({ message: 'Order delivered!', doc })

    })

}

export const cancelOrder = (req, res) => {

  if (!isValidOId(req.params.id)) return res.boom.badRequest('Invalid Id')

  Order.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { isCanceled: true }},
  )
    .populate('user', '_id firstName lastName email phone address imageUrl role dateAdded isVisible')
    .populate(
      'branch',
      '_id hours name email scopeImageUrl facebook instagram twiter deliveryPrice address phone isOpen isVisible'
    )
    .populate('products.product', '_id itemId categoryId name description units price imageUrl isVisible')
    .exec((err, doc) => {

      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc || !doc._id) return res.boom.notFound('Order not found')
      return res.status(200).send({ message: 'Order canceled!', doc })

    })

}

export const refreshOrder = (req, res) => {

  if (!isValidOId(req.params.id)) return res.boom.badRequest('Invalid Id')

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
      if (!doc || !doc._id) return res.boom.notFound('Order not found')
      return res.status(200).send({ message: 'Order updated!', doc })

    })

}

// export const deleteOrderDeep = (req, res) => {
//
// !  if(isValidOId(req.params.id)) //     return res.boom.badRequest('Invalid Id')

//   Order.findByIdAndRemove(
//     req.params.id,
//     (err, doc) => {

//       if (err) return res.boom.badImplementation('', { error: err })
//       if (!doc || !doc._id) return res.boom.notFound('Order not found')
//       return res.status(200).send({ message: 'Order deep removed!' })

//     }
//   )

// }
