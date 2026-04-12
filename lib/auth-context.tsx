'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { AuthUser } from '@/types'

type AuthContextType = {
  currentUser: AuthUser | null
  token: string | null
  setCredentials: (user: AuthUser, accessToken: string) => void
  logOut: () => void
  updateUser: (user: AuthUser) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const setCredentials = (user: AuthUser, accessToken: string) => {
    setCurrentUser(user)
    setToken(accessToken)
    localStorage.setItem('accessToken', accessToken)
  }

  const logOut = () => {
    setCurrentUser(null)
    setToken(null)
    localStorage.removeItem('accessToken')
  }

  const updateUser = (user: AuthUser) => {
    setCurrentUser(user)
  }

  return (
    <AuthContext.Provider value={{ currentUser, token, setCredentials, logOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
