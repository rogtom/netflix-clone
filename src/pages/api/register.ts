import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import Users from '../../../models/userModel'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const body = req.body
  console.log(body)

  const existingUser = await Users.findOne({ email: body.email })
  if (existingUser) {
    res.status(200).json({ message: 'Already registered' })
    return
  }

  const user = new Users(body)

  const salt = await bcrypt.genSalt(10)

  user.password = await bcrypt.hash(user.password, salt)

  await user.save()
  res.status(200).json({ message: 'Registered succesfully' })
}
