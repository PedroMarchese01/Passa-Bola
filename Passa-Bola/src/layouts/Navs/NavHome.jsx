import React, { useState } from "react";
import { Carousel, CarouselItem } from "@/components/ui/carousel";

const NavHome = () => {
  const slides = [
    { color: "bg-red-500", title: "Bem-vindo à Plataforma" },
    { color: "bg-blue-500", title: "Confira os Resultados" },
    { color: "bg-green-500", title: "Inscreva-se nos Campeonatos" },
    { color: "bg-yellow-500", title: "Participe de Jogos Disponíveis" },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <>
      <nav>{/* Navbar aqui */}</nav>

      <div className="relative w-full h-screen overflow-hidden">
        <Carousel className="w-full h-full">
          {slides.map((slide, idx) => (
            <CarouselItem
              key={idx}
              className={`h-full w-full flex items-center justify-center ${slide.color}`}
            >
              <div className="text-center px-4">
                <h2 className="text-white text-5xl font-bold">{slide.title}</h2>
              </div>
            </CarouselItem>
          ))}
        </Carousel>

        {/* Navegação */}
        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full text-2xl"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full text-2xl"
        >
          &gt;
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                idx === current ? "bg-white" : "bg-white/50"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavHome;