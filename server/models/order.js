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
      id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      price: {
        type: Schema.Types.Number,
        ref: 'Product',
        required: true,
      },
      ammount: Number,
    },
  ],
  requestDateTime: String,
  selectedTime: String,
  confirmedTime: String,
  deliveredTime: String,
  isCanceled: Boolean,
  deliveryPrice: {
    type: Schema.Types.Number,
    ref: 'Branch',
    required: false,
  },
  deliveryAddress: String,
  clientPhoneAdd: {
    type: String,
    required: true,
    unique: true,
  },
  clientPhone: {
    type: Schema.Types.Number,
    ref: 'User',
    required: true,
  },
  clientsComments: String,
  adminComments: String,
  isActive: Boolean,
})

export default mongoose.model('Order', orderSchema)
