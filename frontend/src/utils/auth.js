export const saveAuth = (user) => {
  if (!user) return
  localStorage.setItem('token', user.token)
  localStorage.setItem('user', JSON.stringify({ _id: user._id, name: user.name, email: user.email }))
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    return null
  }
}
