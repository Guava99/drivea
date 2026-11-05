import React from 'react'
import{Toaster}from 'react-hot-toast'
import{Navigate, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Drive from './pages/Drive'
import ProtectedRoute from './components/ui/auth/ProtectedRoute'
import DashboardLayout from './components/layout/DashboardLayout'
const App = () => {
 
  return (
    <>
      <Toaster/>
      <Routes>
        <Route path="/login" element={<Login mode="login"/>}/>
        <Route path="/register" element={<Login mode="register"/>}/>
        {/* Private Routes*/ }
        <Route element={<ProtectedRoute/>}>
        <Route element={<DashboardLayout/>}>
          <Route path="/" element={<Drive/>}/>
        </Route>
        </Route>
       
        <Route path="*" element={<Navigate to ="/" replace/>}/>
        

      </Routes>
    </>
    
  )
}

export default App