import ItemsCarousel from '@/components/ui/ItemsCarousel'
import React from 'react'
const MainHome = () => {
  return (
    <main>
        <h1 className='text-white'>Jogos Inscritos</h1>
        <ItemsCarousel size = {5} storageKey="jogosInscritos" textColor='text-white' type = "jogos inscritos"/>
    </main>
    
  )
}

export default MainHome