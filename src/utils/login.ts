import { api } from 'config'
 
const TOKEN_KEY = 'jwt'

export const login = (value: string) => {
  api.defaults.headers.Authorization = `Bearer ${value}`
  localStorage.setItem(TOKEN_KEY, value)
}

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

export const isLogin = (): boolean => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true
  }

  return false
}