import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const NavHome = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, message: "", type: "error" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleClick1 = () => {
    const logged = localStorage.getItem("logged?");
    if (logged === "true") {
      setAlert({ show: true, message: "Você já está logado!", type: "error" });
      setTimeout(() => setAlert({ ...alert, show: false }), 5000);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-screen h-screen relative">
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
      <nav
        className={`w-full h-16 fixed top-0 left-0 z-20 flex items-center justify-between px-8 transition-all duration-300 ${
          scrolled ? "bg-[#1c1c1c]/90 shadow-md backdrop-blur" : "bg-[#1c1c1c]"
        }`}
      >
        <div>
        <img src="" alt="" />
        <span className="text-white font-bold text-xl cursor-pointer">Passa Bola</span>
        </div>

        <div className="hidden md:flex gap-8">
          <p className="text-gray-300 hover:text-white transition-colors">
            Sobre
          </p>
          <p className="text-gray-300 hover:text-white transition-colors">
            Contato
          </p>
          <p className="text-gray-300 hover:text-white transition-colors">
            Jogos Mensais
          </p>
          <p className="text-gray-300 hover:text-white transition-colors">
            Campeonatos
          </p>
        </div>

        <div className="hidden md:flex gap-4">
          
          <Button variant="outline" className="border-purple-700 text-purple-700 bg-transparent px-4 py-2 rounded-lg">
            Login
          </Button>
        </div>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>

      {/* Dropdown Mobile */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#1c1c1c] flex flex-col items-center gap-6 py-6 z-30">
          <p className="text-gray-300 hover:text-white transition-colors">
            Sobre
          </p>
          <p className="text-gray-300 hover:text-white transition-colors">
            Contato
          </p>
          <p className="text-gray-300 hover:text-white transition-colors">Jogos Mensais</p>
          <p className="text-gray-300 hover:text-white transition-colors">Campeonatos</p>
          
          <Button variant="outline" className="border-purple-700 text-purple-700 bg-transparent px-4 py-2 rounded-lg">
            Login
          </Button>
        </div>
      )}

      {/* Carousel */}
      <div className="w-full h-full">
        <Carousel opts={{ align: "start", loop: true }}>
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
                    </Button>{" "}
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
                    <h2 className="text-3xl md:text-4xl font-bold mb-4  drop-shadow-lg text-[#FF1E5E]">
                      Inscreva-se em nossos Jogos Mensais
                    </h2>
                    <p className="text-lg md:text-xl mb-6 text-white drop-shadow-md">
                      Conecte-se, participe e mostre sua habilidade nos desafios. Cada partida é uma nova oportunidade de vitória.
                    </p>
                    <Button className="bg-purple-700 hover:black/60 hover:border hover:border-white text-white px-6 py-3 rounded-xl shadow-lg">
                      Inscreva-se Agora
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 3 */}
            <CarouselItem className="relative">
              <img src={hero3} alt="Hero 3" className="w-full h-screen object-cover" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center bg-black/40">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#76F55F]">Confira os Resultados</h2>
                <p className="text-lg md:text-xl mb-6">Veja os placares mais recentes e os próximos jogos</p>
                <div className="flex gap-2">
                  <Button className="bg-purple-700 hover:bg-black/60 hover:border hover:border-white text-white px-4 py-2 rounded-lg shadow-md text-sm">
                    Ver Resultados
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white bg-white/10 px-4 py-2 rounded-lg text-sm"
                  >
                    Próximos Jogos
                  </Button>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 4 */}
            <CarouselItem className="relative">
              <img src={hero4} alt="Hero 4" className="w-full h-screen object-cover" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center bg-black/40">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#FCFF6E]">Participe dos Campeonatos</h2>
                <p className="text-lg md:text-xl mb-6">Inscreva-se agora ou confira os torneios passados</p>
                <div className="flex gap-4">
                  <Button className="bg-purple-700 hover:bg-black/60 hover:border hover:border-white text-white px-6 py-3 rounded-xl shadow-lg">
                    Inscrever-se
                  </Button>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition" />
          <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition" />
        </Carousel>
      </div>
    </div>
  );
};

export default NavHome;
