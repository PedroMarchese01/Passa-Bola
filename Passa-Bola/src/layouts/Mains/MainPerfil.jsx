import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "../../assets/hero2.jpg";
import Nav from "@/layouts/Navs/Nav"; // ajuste se necessário

const storageKey = "eventsStorage";

const MainPerfil = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [inscricoes, setInscricoes] = useState([]);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const userPhone = localStorage.getItem("userPhone");

    if (!userName || !userEmail) {
      navigate("/login");
      return;
    }

    setUser({ name: userName, email: userEmail, phone: userPhone });

    const storedEvents = JSON.parse(localStorage.getItem(storageKey)) || [];
    const inscritos = storedEvents.filter((ev) =>
      (ev.inscritos || []).includes(userName)
    );
    setInscricoes(inscritos);
  }, [navigate]);

  if (!user) return null;

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0]?.toUpperCase())
      .slice(0, 2)
      .join("");

  // 🔹 Função de logout
  const handleLogout = () => {
    localStorage.removeItem("logged?");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Nav igual às outras páginas */}
      <Nav />

      {/* Conteúdo */}
      <div className="pt-28 px-6 md:px-20 pb-16 flex flex-col items-center">
        {/* Card central do perfil */}
        <div className="bg-black/70 rounded-2xl p-8 text-white shadow-lg w-full max-w-2xl text-center relative">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-3xl font-bold">
              {getInitials(user.name)}
            </div>
          </div>

          {/* Nome e infos */}
          <h1 className="text-3xl font-bold text-purple-400">{user.name}</h1>
          <p className="text-gray-300">{user.email}</p>
          <p className="text-gray-300">{user.phone || "Telefone não informado"}</p>

          {/* Estatísticas */}
          <div className="mt-6 mb-2">
            <h2 className="text-xl font-semibold text-purple-300">
              Jogos inscritos: {inscricoes.length}
            </h2>
          </div>

          {/* 🔹 Botão de sair discreto (canto inferior direito) */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleLogout}
              className="text-gray-400 text-sm hover:text-red-500 transition"
            >
              Sair da conta
            </button>
          </div>
        </div>

        {/* Lista de inscrições */}
        <div className="mt-10 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4 text-center">
            Minhas Inscrições
          </h2>
          {inscricoes.length > 0 ? (
            <ul className="space-y-4">
              {inscricoes.map((game) => (
                <li
                  key={game.id}
                  className="bg-white/10 rounded-lg p-4 shadow-md border border-gray-600 text-white"
                >
                  <h3 className="text-xl font-bold text-purple-400">{game.name}</h3>
                  <p>📅 {new Date(game.date).toLocaleDateString("pt-BR")}</p>
                  <p>⏰ {game.time}</p>
                  <p>📍 {game.location}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300 text-center">
              Você ainda não se inscreveu em nenhum jogo.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPerfil;
