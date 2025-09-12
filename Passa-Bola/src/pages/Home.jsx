import NavHome from '@/layouts/Navs/NavHome'
import React from 'react'
import MainHome from '@/layouts/Mains/MainHome'

const Home = () => {
  return (
    <div className='w-full h-full bg-[#1c1c1c] flex flex-col'>
      {/* Navbar ocupa 100% largura */}
      <div className="w-full">
        <NavHome />
      </div>

      {/* Main ocupa 100% largura e o restante da altura */}
      <div className="w-full flex-1">
        <MainHome />
      </div>
    </div>
  )
}

export default Home