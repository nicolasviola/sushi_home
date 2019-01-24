import mongoose, { Schema } from 'mongoose'

const newSchema = new Schema({
  branchId: {
    type: Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  title: String,
  description: String,
  imageUrl: String,
  isVisible: Boolean,
  isActive: Boolean,
})

export default mongoose.model('New', newSchema)
