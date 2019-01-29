import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: String,
  address: String,
  imageUrl: String,
  role: {
    type: String,
    enum: ['admin', 'client'],
    required: true,
  },
  isVisible: Boolean,
  isActive: Boolean,
})

export default mongoose.model('User', userSchema)
