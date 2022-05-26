import mongoose from 'mongoose'
const connectDB = () => {
  if (mongoose.connections[0].redyState) {
    console.log('Already connected')
    return
  }
  mongoose.connect(process.env.NEXT_PUBLIC_DATABASE_URL, {}, (err) => {
    if (err) throw err
    console.log('Connected successfully')
  })
}

export default connectDB
