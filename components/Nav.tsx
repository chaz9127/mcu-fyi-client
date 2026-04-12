'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Tooltip } from 'react-tooltip'
import { useAuth } from '@/lib/auth-context'
import { authLoginWithToken, fetchApi } from '@/lib/api'
import SearchBar from './SearchBar'
import { Media } from '@/types'

export default function Nav() {
  const [showNavMenu, setShowNavMenu] = useState(false)
  const [searchPool, setSearchPool] = useState<Media[]>([])
  const { currentUser, setCredentials, logOut } = useAuth()
  const router = useRouter()
  const noCurrentUser = !currentUser || Object.keys(currentUser).length === 0

  // Restore session from localStorage token
  useEffect(() => {
    const localAccessToken = localStorage.getItem('accessToken')
    if (localAccessToken && noCurrentUser) {
      authLoginWithToken(localAccessToken)
        .then((res) => {
          if (res?.email) {
            setCredentials(
              { email: res.email, role: res.role, watched: res.watched },
              localAccessToken,
            )
          } else {
            logOut()
          }
        })
        .catch(() => logOut())
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Close nav menu on outside click
  useEffect(() => {
    const hideMenu = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).classList.value.includes('fa-bars')) {
        setShowNavMenu(false)
      }
    }
    document.documentElement.addEventListener('click', hideMenu, false)
    return () => document.documentElement.removeEventListener('click', hideMenu, false)
  }, [])

  // Load search pool
  useEffect(() => {
    fetchApi('/media').then((data) => setSearchPool(data))
  }, [])

  const handleLogout = () => {
    logOut()
    router.push('/?toast=logout')
  }

  return (
    <div className="relative">
      {/* Desktop nav */}
      <nav className="hidden md:flex px-8 py-2.5 items-center bg-nav-bg text-white">
        <div onClick={() => setShowNavMenu(!showNavMenu)} className="cursor-pointer mr-8">
          <i className="fa-solid fa-bars text-2xl" />
        </div>
        <div onClick={() => router.push('/')} className="logo-badge mr-8 text-2xl font-avengeance relative top-[5px] cursor-pointer">
          <span className="relative z-[1]">TheMcu.fyi</span>
        </div>
        <SearchBar results={searchPool} />
      </nav>

      {/* Mobile nav */}
      <nav className="flex md:hidden px-4 py-2.5 items-center bg-nav-bg text-white">
        <div onClick={() => setShowNavMenu(!showNavMenu)} className="cursor-pointer mr-8">
          <i className="fa-solid fa-bars text-2xl" />
        </div>
        <SearchBar results={searchPool} />
      </nav>

      {/* Slide-out menu */}
      {showNavMenu && (
        <div className="bg-nav-bg ml-8 max-w-[256px] absolute top-[54px] z-[2]">
          <ul>
            <li
              onClick={() => router.push('/')}
              className="cursor-pointer md:hidden"
            >
              <div className="logo-badge ml-6 py-4 text-2xl font-avengeance relative top-[5px] inline-block">
                <span className="relative z-[1]">TheMcu.fyi</span>
              </div>
            </li>

            <li className="cursor-pointer">
              {noCurrentUser ? (
                <Link
                  href="/auth"
                  className="flex items-center px-6 py-4 text-white no-underline hover:bg-hover-bg"
                >
                  <i className="fa-solid fa-user-plus mr-2 text-mcu-red" />
                  Login / Register
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center px-6 py-4 text-white w-full text-left hover:bg-hover-bg"
                >
                  <i className="fa-solid fa-user-plus mr-2 text-mcu-red" />
                  Logout
                </button>
              )}
            </li>

            <li className="cursor-pointer">
              <Link
                href="/feedback"
                className="flex items-center px-6 py-4 text-white no-underline hover:bg-hover-bg"
              >
                <i className="fa-solid fa-comment-dots mr-2 text-mcu-red" />
                Feedback
              </Link>
            </li>

            <li
              className="cursor-pointer"
              data-tooltip-id="donate-tooltip"
              data-tooltip-content="Coming Soon"
              data-tooltip-place="right"
            >
              <Link
                href="/"
                className="flex items-center px-6 py-4 text-white no-underline hover:bg-hover-bg"
              >
                <i className="fa-solid fa-coins mr-2 text-mcu-red" />
                Donate
              </Link>
            </li>
          </ul>
        </div>
      )}
      <Tooltip id="donate-tooltip" />
    </div>
  )
}
