import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { useAuth } from './context/AuthContext'
import TermsAndConditions from './pages/TermsAndConditions';
import Dashboard from './pages/dashboard/Dashboard';
import Customers from './pages/dashboard/Customers';
import Orders from './pages/dashboard/Orders';
import Products from './pages/dashboard/Products';
import Analytics from './pages/dashboard/Analytics';
import Feedback from './pages/dashboard/Feedback';



// Protected Route Component - for dashboard (requires authentication)
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Public Route Component - for public pages (redirects logged-in users to dashboard)
function PublicRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

// Admin Route Component - requires is_admin === true
function AdminRoute({ children }) {
  const { user, profile, loading, profileLoading } = useAuth()

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user || !profile?.is_admin) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
      <Route path="/terms" element={<PublicRoute><TermsAndConditions /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
      <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
