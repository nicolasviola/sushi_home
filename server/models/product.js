import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  name: String,
  description: String,
  units: Number,
  price: Number,
  imageUrl: String,
  isVisible: Boolean,
  isActive: Boolean,
})

export default mongoose.model('Product', productSchema)
