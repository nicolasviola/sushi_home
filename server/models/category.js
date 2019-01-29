import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  itemId: Number,
  imageUrl: String,
  order: Number,
  isVisible: Boolean,
  isActive: Boolean,
})

export default mongoose.model('Category', categorySchema)
