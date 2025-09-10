import React, { useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Button } from './button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

const ItemsCarousel = ({ size, storageKey, textColor = "text-black", type }) => {
  const [items, setItems] = useState([])
  const [emblaRef, embla] = useEmblaCarousel({ 
    loop: true, 
    align: 'start', 
    skipSnaps: false, 
    draggable: true,
    dragFree: true
  })

  // Função para carregar itens do localStorage
  const carregarItems = () => {
    const storedItems = JSON.parse(localStorage.getItem(storageKey)) || []
    setItems(storedItems)
  }

  // Carrega itens ao montar e adiciona listener para alterações
  useEffect(() => {
    carregarItems()

    const handleStorageChange = () => {
      carregarItems()
    }

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
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-2 sm:left-4 md:left-6 transform -translate-y-1/2 w-10 h-10 flex justify-center items-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors z-20"
      >
        <ChevronLeftIcon size={24} />
      </button>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className={`flex-none p-2`}
              style={{ flex: `0 0 calc(100% / ${size} - 0.8rem)` }}
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
