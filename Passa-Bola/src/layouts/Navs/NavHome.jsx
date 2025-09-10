import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import hero1 from '../../assets/hero1.jpg';
import hero2 from '../../assets/hero2.jpg';

import hero4 from '../../assets/hero4.png';

const NavHome = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, message: "", type: "error" });

  const handleClick1 = () => {
    const logged = localStorage.getItem("logged?");
    if (logged === "true") {
      // Mostrar alerta de erro
      setAlert({ show: true, message: "Você já está logado!", type: "error" });
      setTimeout(() => setAlert({ ...alert, show: false }), 5000);
    } else {
      // Redirecionar para login
      navigate("/login");
    }
  };

  return (
    <div className="w-screen h-screen relative">
      {/* Alerta */}
      {alert.show && (
        <div
          className={`border-3 bg-black/40 backdrop-blur absolute top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition-all duration-300 ${
            alert.type === "error" ? "border-red-600" : "border-green-600"
          }`}
        >
          {alert.message}
        </div>
      )}

      {/* Navbar */}
      <nav className="w-full h-16 bg-[#1c1c1c] z-20 fixed top-0 left-0 flex items-center px-6">
        
        
        <span className="text-white font-bold text-lg">Logo</span>


      </nav>

      {/* Carousel */}
      <div className="w-full h-full">
        <Carousel
        opts={{
        align: "start",
        loop: true,
        }}>
          <CarouselContent>
            {/* Slide 1 */}
            <CarouselItem className="relative">
              <div className="relative w-full h-screen">
                <img src={hero1} alt="Imagem jogue agora Hero" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4 text-center z-10">
                  <h1 className="text-4xl font-bold text-purple-700 mb-8">Jogue Agora!</h1>
                  <p className="mt-2 text-lg mb-8">
                    Com a Passa Bola, você pode participar de jogos.{" "}
                    <Button
                      className="font-bold px-3 py-1 rounded-xl backdrop-blur-sm shadow-lg bg-purple-700 text-white transition-colors duration-300 hover:bg-black/80 hover:border hover:border-white"
                      onClick={handleClick1}
                      >
                      Faça login ou cadastre-se
                    </Button>
                    para começar!
                  </p>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 2 */}
            <CarouselItem className="relative">
              <div className="relative w-full h-screen">
                <img src={hero2} alt="Hero 2" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center z-10">
                  <div className="bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-lg">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-500 drop-shadow-lg">
                      Inscreva-se em nossos Jogos Mensais
                    </h2>
                    <p className="text-lg md:text-xl mb-6 text-white drop-shadow-md">
                      Conecte-se, participe e mostre sua habilidade nos desafios. Cada partida é uma nova oportunidade de vitória.
                    </p>
                    <Button className="border-2 border-purple-700 bg-black/60 backdrop-blur-md text-purple-400 px-6 py-2 rounded-lg hover:bg-black/70 hover:scale-105 transition-all duration-300">
                      Inscreva-se Agora
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 3 */}
            <CarouselItem className="relative">
              <img src={hero1} alt="Hero 3" className="w-full h-screen object-cover" />
              <div className="absolute inset-0 flex justify-center items-center text-white p-4">
                <p>Conteúdo adicional</p>
              </div>
            </CarouselItem>

            {/* Slide 4 */}
   <CarouselItem className="relative">
              <img src={hero4} alt="Hero 4" className="w-full h-screen object-cover" />
              <div className="absolute inset-0 flex justify-center items-center text-white p-4">
                <p>Conteúdo adicional</p>
              </div>
            </CarouselItem>



          </CarouselContent>

          {/* Setas */}
          <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"/>
          <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"/>
        </Carousel>
      </div>
    </div>
  );
};

export default NavHome;
