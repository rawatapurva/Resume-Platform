import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Builder from './pages/Builder'
import ViewResume from './pages/ViewResume'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Private = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Private><Dashboard /></Private>} />
          <Route path="/builder/:id?" element={<Private><Builder /></Private>} />
          <Route path="/view/:id" element={<Private><ViewResume /></Private>} />
          <Route path="/me" element={<Private><Profile /></Private>} /> 
        </Routes>
      </div>

      {/* Add ToastContainer once at root level */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}
