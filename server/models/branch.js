import mongoose, { Schema } from 'mongoose'

const branchSchema = new Schema({
  oldId: Number,
  name: {
    type: String,
    required: true,
  },
  hours: {
    monday: {
      amFrom: String,
      amTo: String,
      pmFrom: String,
      pmTo: String,
    },
    tuesday: {
      amFrom: String,
      amTo: String,
      pmFrom: String,
      pmTo: String,
    },
    wednesday: {
      amFrom: String,
      amTo: String,
      pmFrom: String,
      pmTo: String,
    },
    thursday: {
      amFrom: String,
      amTo: String,
      pmFrom: String,
      pmTo: String,
    },
    friday: {
      amFrom: String,
      amTo: String,
      pmFrom: String,
      pmTo: String,
    },
    saturday: {
      amFrom: String,
      amTo: String,
      pmFrom: String,
      pmTo: String,
    },
    sunday: {
      amFrom: String,
      amTo: String,
      pmFrom: String,
      pmTo: String,
    },
  },
  email: String,
  scopeImageUrl: String,
  facebook: String,
  instagram: String,
  twiter: String,
  deliveryPrice: Number,
  address: String,
  phone: String,
  isOpen: Boolean,
  isVisible: Boolean,
  isActive: Boolean,
})

export default mongoose.model('Branch', branchSchema)
