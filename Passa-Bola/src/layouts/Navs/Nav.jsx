import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  Info,
  Mail,
  Calendar,
  Trophy,
} from "lucide-react"; 
import logo from "../../assets/logo.png";

const NavSobre = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("logged?") === "true";
    setIsLogged(logged);

    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  
  const navLinks = [
    { to: "/", label: "Início", icon: <Home size={18} /> },
    { to: "/sobre", label: "Sobre", icon: <Info size={18} /> },
    { to: "/contato", label: "Contato", icon: <Mail size={18} /> },
    { to: "/jogos-mensais", label: "Jogos Mensais", icon: <Calendar size={18} /> },
    { to: "/campeonatos", label: "Campeonatos", icon: <Trophy size={18} /> },
  ];

  return (
    <>
      <nav
        className={`w-full h-16 fixed top-0 left-0 z-20 flex items-center justify-between px-8 transition-all duration-300 ${
          scrolled ? "bg-[#1c1c1c]/90 shadow-md backdrop-blur" : "bg-[#1c1c1c]"
        }`}
      >
        
        <Link to="/" className="flex justify-center items-center gap-4">
          <div className="p-1 rounded-full bg-white">
            <img
              src={logo}
              alt="Logo Passa Bola"
              className="h-5 md:h-6 lg:h-7 w-auto object-contain drop-shadow-[0_0_10px_white]"
            />
          </div>
          <span className="text-white font-bold text-xl">Passa Bola</span>
        </Link>

      
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-2 transition-colors ${
                location.pathname === link.to
                  ? "text-purple-500 font-semibold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

      
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
              EU
            </div>
          )}
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
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-2 transition-colors ${
                location.pathname === link.to
                  ? "text-purple-500 font-semibold"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          {!isLogged ? (
            <Button
              variant="outline"
              className="border-purple-700 text-purple-700 bg-transparent px-4 py-2 rounded-lg"
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
            >
              Login
            </Button>
          ) : (
            <div
              className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold cursor-pointer hover:opacity-80"
              onClick={() => {
                navigate("/perfil");
                setMenuOpen(false);
              }}
            >
              <p>EU</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NavSobre;
