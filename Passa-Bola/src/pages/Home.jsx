import NavHome from '@/layouts/Navs/NavHome'
import React from 'react'
import NavChildren from '../layouts/Navs/NavChildren'
import { useEffect } from 'react'
const Home = () => {
  useEffect(() => {
  const jaContou = sessionStorage.getItem("contagemHome") === "true";

  if (!jaContou) {
    const totalAcessos = parseInt(localStorage.getItem("totalAcessos")) || 0;
    localStorage.setItem("totalAcessos", totalAcessos + 1);

    sessionStorage.setItem("contagemHome", "true");
  }
}, []);


  return (
    <>
    <NavChildren/>
    <div className='w-full min-h-screen bg-[#1c1c1c] flex flex-col'>
      <div className="w-full">
        <NavHome />
      </div>
    </div>
    </>
  )
}

export default Home