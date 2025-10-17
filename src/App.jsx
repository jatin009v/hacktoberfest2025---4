import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './layout/DashboardLayout'
import DashboardHome from './pages/Dashboard/DashboardHome'
import Products from './pages/Products/Products'
import ProductDetail from './pages/Products/ProductDetail'
import Users from './pages/Users/Users'
import UserDetail from './pages/Users/UserDetail'
import GithubFinder from './pages/GithubFinder/GithubFinder'
import TodoPage from './pages/Todo/TodoPage'
import Settings from './pages/Dashboard/Settings'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import ResetPassword from './pages/Auth/ResetPassword'

export default function App() {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/reset" element={<ResetPassword />} />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserDetail />} />
        <Route path="github" element={<GithubFinder />} />
        <Route path="todos" element={<TodoPage />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
