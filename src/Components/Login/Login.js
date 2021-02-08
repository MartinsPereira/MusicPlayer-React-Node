import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginForm from './LoginForm.js'
import LoginCreate from './LoginForm.js'
import {GlobalContext} from '../GlobalContext'

const Login = () => {
  const {login} = React.useContext(GlobalContext)

  if(login) return <Navigate to="/" />
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="criar" element={<LoginCreate />} />
      </Routes>
    </div>
  )
}

export default Login
