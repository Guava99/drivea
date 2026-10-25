import React from 'react'
import{useLocation}from "react-router-dom"
import {useApp} from'../../context/AppContext'
import { Spinner } from '../ui/Spinner'
const ProtectedRoute = ({children}) => {
    const{isAuthenticated,isLoading}=useApp()
    const location=useLocation();
    if(isLoading){
        return(
            <div className>
               <Spinner size="lg" className="text-orange-600"/>
               <p className="text-sm text-slate-500 font-medium">Loading Drivea...</p>
            </div>>
            
        )
    }
    return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute