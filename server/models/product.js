import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
  oldId: Number,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  units: Number,
  price: {
    type: String,
    required: true,
  },
  imageUrl: String,
  isVisible: Boolean,
  isActive: Boolean,
})

export default mongoose.model('Product', productSchema)
