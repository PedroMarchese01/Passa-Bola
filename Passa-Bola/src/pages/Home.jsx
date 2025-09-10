import NavHome from '@/layouts/Navs/NavHome'
import React from 'react'
import MainHome from '@/layouts/Mains/MainHome'
const Home = () => {
  return (
    <div className='w-full bg-[#1c1c1c]'>
      <NavHome/>
      <MainHome/>
    </div>
    
  )
}

export default Home