import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

import hero1 from "../../assets/hero1.jpg";
import hero2 from "../../assets/hero2.jpg";
import hero3 from "../../assets/hero3.png";
import hero4 from "../../assets/hero4.png";
import logo from "../../assets/logo.png";

const NavHome = () => {
  const navigate = useNavigate();

  return (
    

      <div className="w-full flex-1 overflow-hidden mt-16">
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {[hero1, hero2, hero3, hero4].map((hero, index) => (
              <CarouselItem className="relative w-full h-[calc(100vh-4rem)]" key={index}>
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={hero}
                    alt={`Hero ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center z-10 bg-black/40">
                    {index === 0 && (
                      <>
                        <h1 className="text-4xl font-bold text-purple-700 mb-8">Jogue Agora!</h1>
                        <p className="mt-2 text-lg mb-8">
                          Com a Passa Bola, você pode participar de jogos.{" "}
                          <Button
                            className="font-bold px-3 py-1 rounded-xl backdrop-blur-sm shadow-lg bg-purple-700 text-white transition-colors duration-300 hover:bg-black/80 hover:border hover:border-white"
                            onClick={() => navigate("/login")}
                          >
                            Faça login ou cadastre-se
                          </Button>
                        </p>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#fc376f]">Inscreva-se em nossos Jogos Mensais</h2>
                        <p className="text-lg md:text-xl mb-6">Conecte-se, participe e mostre sua habilidade nos desafios.</p>
                        <Button
                          className="bg-purple-700 hover:bg-black/60 hover:border hover:border-white text-white px-6 py-3 rounded-xl shadow-lg"
                          onClick={() => navigate("/jogos-mensais")}
                        >
                          Inscreva-se Agora
                        </Button>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#76F55F]">Confira os Resultados</h2>
                        <p className="text-lg md:text-xl mb-6">Veja os placares mais recentes e os próximos jogos</p>
                        <Button
                          className="bg-purple-700 hover:bg-black/60 hover:border hover:border-white text-white px-4 py-2 rounded-lg shadow-md text-sm"
                          onClick={() => navigate("/jogos-mensais")}
                        >
                          Ver Resultados e Próximos jogos
                        </Button>
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#FCFF6E]">Participe dos Campeonatos</h2>
                        <p className="text-lg md:text-xl mb-6">Inscreva-se agora ou confira os torneios passados</p>
                        <Button
                          className="bg-purple-700 hover:bg-black/60 hover:border hover:border-white text-white px-6 py-3 rounded-xl shadow-lg"
                          onClick={() => navigate("/campeonatos")}
                        >
                          Inscrever-se
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition-colors duration-300" />
          <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition-colors duration-300" />
        </Carousel>
      </div>
  );
};

export default NavHome;