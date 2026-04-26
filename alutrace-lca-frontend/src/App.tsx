import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import DataInput from './pages/DataInput'
import Processing from './pages/Processing'
import AIPipeline from './pages/AIPipeline'
import Storage from './pages/Storage'
import Analysis from './pages/Analysis'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Login from './pages/Login'
import { useAuthStore } from './store/authStore'

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  // Since isAuthenticated is true by default in authStore, the app will show the dashboard
  // For production, change the default isAuthenticated to false in authStore
  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data-input" element={<DataInput />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/ai-pipeline" element={<AIPipeline />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Box>
  )
}

export default App
