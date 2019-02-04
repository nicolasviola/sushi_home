import mongoose from 'mongoose'

const {
  ObjectId,
} = mongoose.Types

const isValidOId = oid => ObjectId(oid) == oid

export default isValidOId
