import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  branchId: {
    type: Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  products: [
    {
      productId: {
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
  deliveryPrice: Number,
  deliveryAddress: String,
  clientPhone: String,
  clientsComments: String,
  adminComments: String,
  isActive: Boolean,
})

export default mongoose.model('Order', orderSchema)
