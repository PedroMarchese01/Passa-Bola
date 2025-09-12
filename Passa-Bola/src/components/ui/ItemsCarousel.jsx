import React, { useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Button } from './button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

const ItemsCarousel = ({ size = 3, storageKey, textColor = "text-black", type }) => {
  const [items, setItems] = useState([])
  const [emblaRef, embla] = useEmblaCarousel({ 
    loop: true, 
    align: 'start', 
    skipSnaps: false, 
    draggable: true,
    dragFree: true
  })

  // Carrega itens do localStorage
  const carregarItems = () => {
    const storedItems = JSON.parse(localStorage.getItem(storageKey)) || []
    setItems(storedItems)
  }

  useEffect(() => {
    carregarItems()
    const handleStorageChange = () => carregarItems()
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [storageKey])

  const handleRemove = (index) => {
    const novosItems = items.filter((_, i) => i !== index)
    setItems(novosItems)
    localStorage.setItem(storageKey, JSON.stringify(novosItems))
  }

  const scrollPrev = () => embla && embla.scrollPrev()
  const scrollNext = () => embla && embla.scrollNext()

  if (items.length === 0) return <p className="text-center text-gray-500">Você não tem {type}.</p>

  return (
    <div className="relative w-full">
      {/* Botão esquerdo */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-2 sm:left-4 md:left-6 transform -translate-y-1/2 w-10 h-10 flex justify-center items-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors z-20"
      >
        <ChevronLeftIcon size={24} />
      </button>

      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden w-full">
        <div className="flex" style={{ gap: '1rem' }}>
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="flex-none"
              style={{ flex: `0 0 ${100 / size}%` }} // Cada item ocupa 100%/size
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 flex flex-col gap-2 shadow-lg hover:bg-white/20 transition-colors">
                {Object.entries(item)
                  .filter(([key]) => key !== "id")
                  .map(([key, value]) => (
                    <p key={key} className={`${textColor} truncate`}>
                      {value}
                    </p>
                  ))}
                <Button
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600 transition-colors"
                  onClick={() => handleRemove(index)}
                >
                  Remover
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botão direito */}
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-2 sm:right-4 md:right-6 transform -translate-y-1/2 w-10 h-10 flex justify-center items-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors z-20"
      >
        <ChevronRightIcon size={24} />
      </button>
    </div>
  )
}

export default ItemsCarousel