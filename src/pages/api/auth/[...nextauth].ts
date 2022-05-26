//@ts-nocheck

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import connectDB from '../../../../lib/db'
import Users from '../../../../models/userModel'
import bcrypt from 'bcrypt'
connectDB()

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const email = credentials.email
        const password = credentials.password
        const user = await Users.findOne({ email })
        console.log(user)
        if (!user) {
          throw new Error("You haven't registered yet")
        }
        if (user) {
          return signUser({ password, user })
        }
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  database: process.env.NEXT_PUBLIC_DATABASE_UR,
  pages: {
    signIn: '/signin',
  },
})

const signUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error('Please enter password')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Password not correct')
  }
  return user
}
