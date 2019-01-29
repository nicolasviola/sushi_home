import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
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
