import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
)
let Dataset = mongoose.models.users || mongoose.model('users', userSchema)

export default Dataset
