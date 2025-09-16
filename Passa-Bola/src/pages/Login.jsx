import React from 'react'
import MainLogin from '@/layouts/Mains/MainLogin'
import DarkVeil from '@/layouts/background/DarkVeil'

const Login = () => {
  return (
    <div className="relative w-screen h-screen">
      <DarkVeil className="absolute inset-0 z-0" />
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center">
        <MainLogin/>
      </div>
    </div>
  )
}

export default Login