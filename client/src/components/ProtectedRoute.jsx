import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children, roleRequired}) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    const  role = localStorage.getItem('role')

    if(!isAuthenticated || role !== roleRequired) {
        return <Navigate to="/" replace />;
    }

    return children
}

export default ProtectedRoute