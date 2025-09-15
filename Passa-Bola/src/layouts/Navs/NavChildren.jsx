import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "../../assets/logo.png";

const NavSobre = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    // sempre checa se o usuário está logado
    const logged = localStorage.getItem("logged?") === "true";
    setIsLogged(logged);

    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`w-full h-16 fixed top-0 left-0 z-20 flex items-center justify-between px-8 transition-all duration-300 ${
          scrolled ? "bg-[#1c1c1c]/90 shadow-md backdrop-blur" : "bg-[#1c1c1c]"
        }`}
      >
        {/* Logo + Nome */}
        <div className="flex justify-center items-center gap-4">
          <div className="p-1 rounded-full bg-white">
            <img
              src={logo}
              alt="Logo Passa Bola"
              className="h-5 md:h-6 lg:h-7 w-auto object-contain drop-shadow-[0_0_10px_white]"
            />
          </div>
          <span className="text-white font-bold text-xl cursor-pointer">
            Passa Bola
          </span>
        </div>

        {/* Links Desktop */}
        <div className="hidden md:flex gap-8">
          <p className="text-gray-300 hover:text-white transition-colors cursor-pointer">
            Sobre
          </p>
          <p className="text-gray-300 hover:text-white transition-colors cursor-pointer">
            Contato
          </p>
          <p className="text-gray-300 hover:text-white transition-colors cursor-pointer">
            Jogos Mensais
          </p>
          <p className="text-gray-300 hover:text-white transition-colors cursor-pointer">
            Campeonatos
          </p>
        </div>

        {/* Login / Avatar */}
        <div className="hidden md:flex gap-4 items-center">
          {!isLogged ? (
            <Button
              variant="outline"
              className="border-purple-700 text-purple-700 bg-transparent px-4 py-2 rounded-lg"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          ) : (
            <div
              className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold cursor-pointer hover:opacity-80"
              title="Minha conta"
              onClick={() => navigate("/perfil")}
            >
              {/* Pode trocar por uma foto real depois */}
              EU
            </div>
          )}
        </div>

        {/* Menu Mobile */}
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
          <p className="text-gray-300 hover:text-white transition-colors cursor-pointer">
            Sobre
          </p>
          <p className="text-gray-300 hover:text-white transition-colors cursor-pointer">
            Contato
          </p>
          <p className="text-gray-300 hover:text-white transition-colors cursor-pointer">
            Jogos Mensais
          </p>
          <p className="text-gray-300 hover:text-white transition-colors cursor-pointer">
            Campeonatos
          </p>

          {!isLogged ? (
            <Button
              variant="outline"
              className="border-purple-700 text-purple-700 bg-transparent px-4 py-2 rounded-lg"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          ) : (
            <div
              className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold cursor-pointer hover:opacity-80"
              onClick={() => navigate("/perfil")}
            >
              EU
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NavSobre;
