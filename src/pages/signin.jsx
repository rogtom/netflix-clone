import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { Router, useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { getCsrfToken } from 'next-auth/react'
import { CtxOrReq } from 'next-auth/client/_utils'
import Link from 'next/link'

async function createUser(email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!')
  }

  return data
}

const SignIn = ({ csrfToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const router = useRouter()

  const signInUser = async (e) => {
    e.preventDefault()
    console.log(email, password)
    let options = {
      redirect: false,
      email,
      password,
    }
    const res = await signIn('credentials', options)

    setMessage(null)

    if (res?.error) {
      setMessage(res?.error)
      return
    }
    return router.push('/')
  }

  const signupUser = async (e) => {
    e.preventDefault()
    setMessage(null)
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    let data = await res.json()
    if (data.message) {
      setMessage(data.message)
    }
    if (data.message === 'Registered successfuly') {
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
        <title>Sign In - Netflix</title>
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
          <label htmlFor="" className="inline-block w-full">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="sign__input"
            />
          </label>
          <label htmlFor="" className="inline-block w-full">
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
          onClick={(e) => signInUser(e)}
          className="w-full rounded bg-[#e50914]"
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix?
          <Link href="/signup">
            <a className="pl-2 text-white hover:underline">
              Create new account
            </a>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignIn

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
