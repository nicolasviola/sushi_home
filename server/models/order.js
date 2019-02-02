import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
  oldId: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      price: Number,
      ammount: Number,
    },
  ],
  requestDateTime: String,
  selectedTime: String,
  confirmedTime: String,
  deliveredTime: String,
  isCanceled: Boolean,
  isDelivery: Boolean,
  deliveryPrice: Number,
  deliveryAddress: String,
  clientPhone: String,
  clientComments: String,
  adminComments: String,
})

export default mongoose.model('Order', orderSchema)
