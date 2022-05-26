import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import {
  SearchIcon,
  BellIcon,
  ChevronDownIcon,
  PencilIcon,
} from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'
import { signOut, useSession } from 'next-auth/react'

type Props = {}

const Header: React.FC = (props: Props) => {
  const [isScroled, setIsScroled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const { data: session, status } = useSession()
  console.log(session)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroled(true)
      } else {
        setIsScroled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const searchToggle = () => {
    setShowSearch(!showSearch)
  }

  const handleSerch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    console.log(searchTerm)
  }
  const handleSubmit = (e: React.FormEvent<SVGSVGElement>) => {
    e.preventDefault()
    if (searchTerm.length > 0) {
      console.log(searchTerm)
      setSearchTerm('')
      searchToggle()
    } else {
      console.log('no search term')
      searchToggle()
    }
  }

  return (
    <header className={` ${isScroled && 'bg-[#141414]'}`}>
      <div className="flex items-center justify-between space-x-8">
        <Image
          src="../../public/Netflix-logo.png"
          alt="Netflix"
          width={150}
          height={50}
        />
        <Menu as="div" className="relative text-left md:hidden ">
          <Menu.Button className="flex items-center">
            Brows
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 "
              aria-hidden="true"
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              as="div"
              className="absolute right-0 flex flex-col items-center w-64 px-2 py-2 mt-2 space-y-8 text-lg text-gray-300 bg-black/90 "
            >
              <Menu.Item as="div">
                {({ active }) => (
                  <a
                    className={`${
                      active && 'hower: underline '
                    } flex items-center space-x-2 `}
                    href="/account-settings"
                  >
                    TV Shows
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${
                      active && 'hower: underline '
                    } flex items-center space-x-2 `}
                    href="/account-settings"
                  >
                    Movies
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${
                      active && 'hower: underline '
                    } flex items-center space-x-2 `}
                    href="/account-settings"
                  >
                    Nev & Popular
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${
                      active && 'hower: underline '
                    } flex items-center space-x-2 `}
                    href="/account-settings"
                  >
                    My List
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        <ul className="hidden space-x-5 md:flex">
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>Nev & Popular</li>
          <li>My List</li>
        </ul>
      </div>
      <div className="flex items-center space-x-2">
        <div
          className={`flex items-center rounded-lg border border-blue-300 px-2 py-2 outline-none ${
            showSearch ? 'block' : 'hidden'
          }`}
        >
          <SearchIcon
            className={`h-5 w-5 cursor-pointer `}
            onClick={handleSubmit}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSerch}
            className="outline-none"
          />
        </div>
        <SearchIcon
          className={`h-5 w-5 cursor-pointer ${
            !showSearch ? 'block' : 'hidden'
          } `}
          onClick={searchToggle}
        />
        <BellIcon className="w-6 h-6" />
        {status === 'authenticated' ? (
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex items-center">
              <Image
                src="/user-image.png"
                alt="User"
                width={40}
                height={40}
                className="rounded-md"
              />
              <ChevronDownIcon className="w-5 h-5 -mr-1 " />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                as="div"
                className="absolute right-0 flex flex-col w-48 px-2 py-4 mt-2 space-y-4 text-gray-300 bg-black "
              >
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active && 'hower: underline '
                      } flex items-center space-x-2 `}
                      href="/account-settings"
                    >
                      <Image
                        src="/user-image.png"
                        alt="User"
                        width={40}
                        height={40}
                      />
                      {session ? <p>{session?.user?.name}</p> : <p>User 1</p>}
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active && 'hower: underline '
                      } flex items-center space-x-2 `}
                      href="/account-settings"
                    >
                      <Image
                        src="/user-image.png"
                        alt="User"
                        width={40}
                        height={40}
                      />
                      <p>User 2</p>
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active && 'hower: underline '
                      } flex items-center space-x-2 `}
                      href="/account-settings"
                    >
                      <Image
                        src="/user-image.png"
                        alt="User"
                        width={40}
                        height={40}
                      />
                      <p>User 3</p>
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active && ' hower: underline'
                      } flex items-center space-x-2 `}
                      href="/account-settings"
                    >
                      <PencilIcon className="w-10 h-10 p-1" />
                      <p>Manage Profiles</p>
                    </a>
                  )}
                </Menu.Item>

                <Menu.Item
                  as="div"
                  className="border-b border-gray-600"
                ></Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active && 'hower: underline'
                      } divide-y-2 divide-black`}
                      href="/account-settings"
                    >
                      Account
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active && 'hower: underline'
                      } divide-y-2 divide-black`}
                      href="/account-settings"
                    >
                      Help
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item
                  as="div"
                  className="border-b border-gray-600"
                ></Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => signOut()}
                      className={`${
                        active && 'hower: underline'
                      } divide-y-2 divide-black`}
                    >
                      Log Out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <a href="/api/auth/signin">Sign in</a>
        )}
      </div>
    </header>
  )
}

export default Header
function setSearch(arg0: boolean) {
  throw new Error('Function not implemented.')
}
