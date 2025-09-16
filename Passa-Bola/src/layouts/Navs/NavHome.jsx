import React, { useState, useEffect, useRef } from "react";
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
  const [alert, setAlert] = useState({ show: false, message: "", type: "error" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollTimeout = useRef(null);

  const handleClickLogin = () => {
    const logged = localStorage.getItem("logged?");
    if (logged === "true") {
      setAlert({ show: true, message: "Você já está logado!", type: "error" });
      setTimeout(() => setAlert(prev => ({ ...prev, show: false })), 5000);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const onScroll = () => {
      if (!scrollTimeout.current) {
        scrollTimeout.current = setTimeout(() => {
          setScrolled(window.scrollY > 10);
          scrollTimeout.current = null;
        }, 100);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  useEffect(() => {
    const storageKey = "eventsStorage";
    const storedEvents = JSON.parse(localStorage.getItem(storageKey)) || [];
    const hasMensal = storedEvents.some((e) => e.type === "mensal");

    if (!hasMensal) {
      const sampleGames = [
        {
          id: Date.now(),
          type: "mensal",
          name: "Jogo Feminino - Fevereiro",
          date: "2025-02-20",
          time: "18:00",
          location: "PlayBall Arena",
          inscritos: [],
          maxInscritos: 20,
        },
        {
          id: Date.now() + 1,
          type: "mensal",
          name: "Jogo Feminino - Março",
          date: "2025-03-15",
          time: "15:30",
          location: "PlayBall Arena",
          inscritos: [],
          maxInscritos: 2,
        },
        {
          id: Date.now() + 2,
          type: "mensal",
          name: "Jogo Feminino - Abril",
          date: "2025-04-12",
          time: "10:00",
          location: "PlayBall Arena",
          inscritos: [],
          maxInscritos: 0,
        },
      ];

      localStorage.setItem(storageKey, JSON.stringify([...storedEvents, ...sampleGames]));
    }
  }, []);

  return (
    <div className="w-screen h-screen relative overflow-x-hidden">
      {alert.show && (
        <div
          className={`border-3 bg-black/40 backdrop-blur-sm absolute top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition-opacity duration-300 ${
            alert.type === "error" ? "border-red-600" : "border-green-600"
          }`}
        >
          {alert.message}
        </div>
      )}

      <nav
        className={`w-full h-16 fixed top-0 left-0 z-20 flex items-center justify-between px-8 transition-shadow duration-300 ${
          scrolled ? "bg-[#1c1c1c]/90 shadow-md backdrop-blur-sm" : "bg-[#1c1c1c]"
        }`}
      >
        <div className="flex justify-center items-center gap-4">
          <Link to="/">
            <div className="p-1 rounded-full bg-white">
              <img
                src={logo}
                alt="Logo Passa Bola"
                className="h-4 sm:h-5 md:h-6 lg:h-7 w-auto object-contain drop-shadow-[0_0_10px_white]"
              />
            </div>
          </Link>
          <Link to="/" className="text-white font-bold text-xl cursor-pointer">
            <p>Passa Bola</p>
          </Link>
        </div>

        <div className="hidden md:flex gap-8">
          <Link to="/sobre" className="text-gray-300 hover:text-white transition-colors">Sobre</Link>
          <Link to="/contato" className="text-gray-300 hover:text-white transition-colors">Contato</Link>
          <Link to="/jogos-mensais" className="text-gray-300 hover:text-white transition-colors">Jogos Mensais</Link>
          <Link to="/campeonatos" className="text-gray-300 hover:text-white transition-colors">Campeonatos</Link>
        </div>

        <div className="hidden md:flex gap-4">
          <Button
            variant="outline"
            className="border-purple-700 text-purple-700 bg-transparent px-4 py-2 rounded-lg"
            onClick={handleClickLogin}
          >
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

      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#1c1c1c] flex flex-col items-center gap-6 py-6 z-30">
          <Link to="/sobre" className="text-gray-300 hover:text-white transition-colors">Sobre</Link>
          <Link to="/contato" className="text-gray-300 hover:text-white transition-colors">Contato</Link>
          <Link to="/jogos-mensais" className="text-gray-300 hover:text-white transition-colors">Jogos Mensais</Link>
          <Link to="/campeonatos" className="text-gray-300 hover:text-white transition-colors">Campeonatos</Link>
          <Button
            variant="outline"
            className="border-purple-700 text-purple-700 bg-transparent px-4 py-2 rounded-lg"
            onClick={handleClickLogin}
          >
            Login
          </Button>
        </div>
      )}

      <div className="w-full h-full overflow-hidden">
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {[hero1, hero2, hero3, hero4].map((hero, index) => (
              <CarouselItem className="relative w-full" key={index}>
                <div className="relative w-full max-w-full max-h-screen overflow-hidden">
                  <img
                    src={hero}
                    alt={`Hero ${index + 1}`}
                    className="w-full max-w-full max-h-screen object-cover"
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
                        <p className="text-lg md:text-xl mb-6">
                          Conecte-se, participe e mostre sua habilidade nos desafios.
                        </p>
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
                        <div className="flex gap-2">
                          <Button
                            className="bg-purple-700 hover:bg-black/60 hover:border hover:border-white text-white px-4 py-2 rounded-lg shadow-md text-sm"
                            onClick={() => navigate("/jogos-mensais")}>
                             Ver Resultados e Proximos jogos
                          </Button>
                        </div>
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
    </div>
  );
};

export default NavHome;
