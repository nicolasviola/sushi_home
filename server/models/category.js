import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
  name: String,
  imageUrl: String,
  isVisible: Boolean,
  isActive: Boolean,
})

export default mongoose.model('Category', categorySchema)
