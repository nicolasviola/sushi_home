import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  name: String,
  mail: String,
  pass: String,
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  addres: String,
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
