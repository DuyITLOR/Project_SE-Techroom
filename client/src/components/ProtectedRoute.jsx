import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, roleRequired }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  const role = localStorage.getItem('role')?.toLowerCase()

  const isAllowed = Array.isArray(roleRequired)
    ? roleRequired.includes(role)
    : role === roleRequired

  if (!isAuthenticated || !isAllowed) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
