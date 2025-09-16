import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import bgImg from "../../assets/hero2.jpg"; 

const storageKey = "eventsStorage";

const MainJogos = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loginAlert, setLoginAlert] = useState(false);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  const isLogged = () => {
    const v2 = localStorage.getItem("logged?") === "true";
    return v2;
  };

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem(storageKey)) || [];
    const mensais = storedEvents.filter((e) => e.type === "mensal");
    
    const formatted = mensais.map((e) => ({
      id: e.id,
      title: e.name,
      date: e.date,
      time: e.time || "00:00", 
      location: e.location,
      currentPlayers: e.inscritos?.length || 0,
      maxPlayers: e.maxInscritos || 0,
    }));
    setGames(formatted);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setLoginAlert(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortedGames = [...games].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const getStatus = (g) => {
    if (g.currentPlayers >= g.maxPlayers)
      return { text: "Encerrado", color: "bg-red-600" };
    if (g.currentPlayers >= g.maxPlayers - 3)
      return { text: "Quase cheio", color: "bg-yellow-500" };
    return { text: "Aberto", color: "bg-green-600" };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setGames((prev) =>
      prev.map((g) =>
        g.id === selectedGame.id
          ? { ...g, currentPlayers: g.currentPlayers + 1 }
          : g
      )
    );

    const storedEvents = JSON.parse(localStorage.getItem(storageKey)) || [];
    const updatedEvents = storedEvents.map((ev) =>
      ev.id === selectedGame.id
        ? { ...ev, inscritos: [...(ev.inscritos || []), registerData.name] }
        : ev
    );
    localStorage.setItem(storageKey, JSON.stringify(updatedEvents));

    alert(
      `Inscrição confirmada!\nNome: ${registerData.name}\nEmail: ${registerData.email}\nJogo: ${selectedGame.title}`
    );

    setSelectedGame(null); 
  };

  return (
    <div
      className="pt-24 px-6 md:px-20 pb-16 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="bg-black/80 min-h-screen rounded-2xl p-8 md:p-12 shadow-xl relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Jogos Mensais
          </h1>
          <p className="text-lg text-gray-200 mt-4 max-w-2xl mx-auto">
            Participe dos{" "}
            <span className="font-semibold text-purple-400">Jogos Mensais</span>{" "}
            da Passa Bola! Uma oportunidade de jogar, se divertir, conhecer
            novas jogadoras e competir de forma saudável. ⚽💜
          </p>
        </div>

        {loginAlert && (
          <div className="mb-6">
            <Alert className="bg-white/90 border-4 border-red-600 text-red-600">
              <AlertDescription>
                 Você precisa estar logado para se inscrever!
                <button
                  onClick={() => navigate("/login")}
                  className="ml-3 underline text-purple-400 hover:text-purple-300"
                >
                  Ir para Login
                </button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedGames.map((game) => {
            const status = getStatus(game);
            const progress = (game.currentPlayers / game.maxPlayers) * 100;

            return (
              <div
                key={game.id}
                className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-gray-700/30 hover:scale-105 hover:bg-white/10 transition-transform duration-300"
              >
                <span
                  className={`absolute top-4 right-4 text-xs text-white px-3 py-1 rounded-full ${status.color}`}
                >
                  {status.text}
                </span>

                <h2 className="text-2xl font-semibold text-purple-400 mb-4">
                  {game.title}
                </h2>
                <p className="text-gray-200 mb-2">
                  📅 {new Date(game.date).toLocaleDateString("pt-BR")}
                </p>
                <p className="text-gray-200 mb-2">⏰ {game.time}</p>
                <p className="text-gray-200 mb-2">📍 {game.location}</p>
                <p className="text-gray-200 mb-2">
                  👥 {game.currentPlayers} / {game.maxPlayers} inscritos
                </p>

                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <button
                  onClick={() => {
                    if (!isLogged()) {
                      setLoginAlert(true);
                      return;
                    }
                    setRegisterData({
                      name: localStorage.getItem("userName") || "",
                      email: localStorage.getItem("userEmail") || "",
                      phone: "",
                    });
                    setSelectedGame(game);
                  }}
                  disabled={status.text === "Encerrado"}
                  className={`w-full py-2 rounded-lg font-semibold transition ${
                    status.text === "Encerrado"
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  Inscreva-se
                </button>
              </div>
            );
          })}
        </div>

        {selectedGame && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">
                Inscrição no {selectedGame.title}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome"
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <input
                  type="tel"
                  placeholder="Telefone"
                  value={registerData.phone}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, phone: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedGame(null)}
                    className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
                  >
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainJogos;
