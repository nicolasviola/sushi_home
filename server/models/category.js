import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
  oldId: Number,
  name: {
    type: String,
    required: true,
  },
  imageUrl: String,
  order: Number,
  isVisible: Boolean,
  isActive: Boolean,
})

export default mongoose.model('Category', categorySchema)
