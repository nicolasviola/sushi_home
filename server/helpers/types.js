import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId

export const isValidOId = oid => ObjectId(oid) == oid
