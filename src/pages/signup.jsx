import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { Router, useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { getCsrfToken } from 'next-auth/react'
import { CtxOrReq } from 'next-auth/client/_utils'
import Link from 'next/link'

const SignUp = ({ csrfToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [name, setName] = useState('')

  const router = useRouter()

  const signupUser = async (e) => {
    e.preventDefault()
    setMessage(null)
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    })
    let data = await res.json()
    if (data.message) {
      setMessage(data.message)
    }
    if (data.message === 'Registered succesfully') {
      let options = {
        redirect: false,
        email,
        password,
      }
      const res = await signIn('credentials', options)
      return router.push('/')
    }
  }

  return (
    <div className="relative flex flex-col w-screen h-screen bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Sign Up - Netflix</title>
        <link rel="icon" href="/netflix-icon.ico" />
      </Head>
      <Image
        src="/signIn-image.jpg"
        alt="sign in image"
        layout="fill"
        objectFit="cover"
        className="-z-10 !hidden opacity-60 sm:!inline"
      />

      <form
        method="post"
        action="/api/auth/callback/credentials"
        className="relative px-6 py-10 mt-24 space-y-8 rounded bg-black/75 md:mt-0 md:max-w-md md:px-16"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="flex flex-col space-y-4">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label className="inline-block w-full">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your username"
              className="sign__input"
            />
          </label>
          <label className="inline-block w-full">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="sign__input"
            />
          </label>
          <label className="inline-block w-full">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="sign__input"
            />
          </label>
          <p className="text-red-500">{message}</p>
        </div>
        <button
          onClick={(e) => signupUser(e)}
          className="w-full rounded bg-[#e50914]"
        >
          Sign Up
        </button>
        <div className="text-[gray]">
          Got account?
          <Link href="/signin">
            <a className="pl-2 text-white hover:underline">Log In</a>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
