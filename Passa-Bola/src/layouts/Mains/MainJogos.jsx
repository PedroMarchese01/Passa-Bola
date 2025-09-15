import React, { useState, useRef, useEffect } from "react";
import bgImg from "../../assets/hero13.png"; // fundo

const MainJogos = () => {
  const [games, setGames] = useState([
    {
      id: 1,
      title: "Jogo Feminino - Fevereiro",
      date: "2025-02-20",
      location: "Arena Futebol SP",
      currentPlayers: 5,
      maxPlayers: 20,
    },
    {
      id: 2,
      title: "Jogo Feminino - Março",
      date: "2025-03-15",
      location: "Estádio Municipal",
      currentPlayers: 12,
      maxPlayers: 20,
    },
    {
      id: 3,
      title: "Jogo Feminino - Abril",
      date: "2025-04-12",
      location: "Arena Society",
      currentPlayers: 0,
      maxPlayers: 15,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newGame, setNewGame] = useState({
    id: null,
    title: "",
    date: "",
    location: "",
    currentPlayers: 0,
    maxPlayers: 20,
  });

  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const menuRef = useRef(null);

  // 🔒 Fecha o menu do lápis ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Ordenar jogos pela data
  const sortedGames = [...games].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // ➕ Adicionar ou Editar Jogo
  const handleSaveGame = (e) => {
    e.preventDefault();
    if (newGame.id) {
      // Edição
      setGames(
        games.map((game) =>
          game.id === newGame.id ? { ...newGame } : game
        )
      );
    } else {
      // Adição
      const newId = games.length + 1;
      setGames([...games, { id: newId, ...newGame }]);
    }

    setNewGame({
      id: null,
      title: "",
      date: "",
      location: "",
      currentPlayers: 0,
      maxPlayers: 20,
    });
    setShowModal(false);
    setEditMode(false);
    setDeleteMode(false);
  };

  const handleDeleteGame = (id) => {
    setGames(games.filter((game) => game.id !== id));
  };

  const getStatus = (game) => {
    if (game.currentPlayers >= game.maxPlayers)
      return { text: "Encerrado", color: "bg-red-600" };
    if (game.currentPlayers >= game.maxPlayers - 3)
      return { text: "Quase cheio", color: "bg-yellow-500" };
    return { text: "Aberto", color: "bg-green-600" };
  };

  return (
    <div
      className="pt-24 px-6 md:px-20 pb-16 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="bg-black/60 min-h-screen rounded-2xl p-8 md:p-12 shadow-xl relative">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Jogos Mensais
          </h1>
          <p className="text-lg text-gray-200 mt-4 max-w-2xl mx-auto">
            Participe dos{" "}
            <span className="font-semibold text-purple-400">Jogos Mensais</span>{" "}
            da Passa Bola! Uma oportunidade de jogar, se divertir, conhecer novas
            jogadoras e competir de forma saudável. ⚽💜
          </p>
        </div>

        {/* 🔧 Botão do Admin (Lápis flutuante) */}
        {isAdmin && (
          <div ref={menuRef} className="absolute top-6 right-6 z-50">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition"
            >
              ✏️
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-black/90 text-white rounded-lg shadow-lg text-sm w-44 z-50">
                <button
                  onClick={() => {
                    setNewGame({
                      id: null,
                      title: "",
                      date: "",
                      location: "",
                      currentPlayers: 0,
                      maxPlayers: 20,
                    });
                    setShowModal(true);
                    setMenuOpen(false);
                  }}
                  className="block px-4 py-2 hover:bg-purple-600 w-full text-left"
                >
                  ➕ Adicionar Jogo
                </button>
                <button
                  onClick={() => {
                    setEditMode(true);
                    setDeleteMode(false);
                    setMenuOpen(false);
                  }}
                  className="block px-4 py-2 hover:bg-purple-600 w-full text-left"
                >
                  ✏️ Editar Jogo
                </button>
                <button
                  onClick={() => {
                    setDeleteMode(true);
                    setEditMode(false);
                    setMenuOpen(false);
                  }}
                  className="block px-4 py-2 hover:bg-red-600 w-full text-left"
                >
                  🗑️ Deletar Jogo
                </button>
              </div>
            )}
          </div>
        )}

        {/* Grid de jogos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedGames.map((game) => {
            const status = getStatus(game);
            const progress = (game.currentPlayers / game.maxPlayers) * 100;

            return (
              <div
                key={game.id}
                className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-gray-700/30 
                           hover:scale-105 hover:bg-white/10 transition-transform duration-300"
              >
                {/* Botão de deletar aparece só no modo delete */}
                {isAdmin && deleteMode && (
                  <button
                    onClick={() => handleDeleteGame(game.id)}
                    className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-full transition"
                  >
                    🗑️
                  </button>
                )}

                {/* Botão de editar aparece só no modo edição */}
                {isAdmin && editMode && (
                  <button
                    onClick={() => {
                      setNewGame(game);
                      setShowModal(true);
                    }}
                    className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-full transition"
                  >
                    ✏️
                  </button>
                )}

                {/* Status */}
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
                <p className="text-gray-200 mb-2">📍 {game.location}</p>
                <p className="text-gray-200 mb-2">
                  👥 {game.currentPlayers} / {game.maxPlayers} inscritos
                </p>

                {/* Barra de progresso */}
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <button
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
      </div>

      {/* Modal para Adicionar/Editar */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-purple-500/40 
                       max-w-lg w-full mx-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-purple-400 mb-6">
              {newGame.id ? "Editar Jogo" : "Adicionar Novo Jogo"}
            </h2>
            <form onSubmit={handleSaveGame} className="space-y-4 text-left">
              <div>
                <label className="block text-gray-200">Título</label>
                <input
                  type="text"
                  value={newGame.title}
                  onChange={(e) =>
                    setNewGame({ ...newGame, title: e.target.value })
                  }
                  className="w-full mt-1 p-3 rounded-lg bg-black/40 border border-gray-600 
                             text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Ex: Jogo Feminino - Maio"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-200">Data</label>
                <input
                  type="date"
                  value={newGame.date}
                  onChange={(e) =>
                    setNewGame({ ...newGame, date: e.target.value })
                  }
                  className="w-full mt-1 p-3 rounded-lg bg-black/40 border border-gray-600 
                             text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-200">Local</label>
                <input
                  type="text"
                  value={newGame.location}
                  onChange={(e) =>
                    setNewGame({ ...newGame, location: e.target.value })
                  }
                  className="w-full mt-1 p-3 rounded-lg bg-black/40 border border-gray-600 
                             text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Ex: Arena Central"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-200">Máximo de Jogadoras</label>
                <input
                  type="number"
                  value={newGame.maxPlayers}
                  onChange={(e) =>
                    setNewGame({
                      ...newGame,
                      maxPlayers: parseInt(e.target.value),
                    })
                  }
                  className="w-full mt-1 p-3 rounded-lg bg-black/40 border border-gray-600 
                             text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Ex: 20"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Salvar Jogo
              </button>
            </form>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 text-sm text-gray-300 hover:text-white transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainJogos;
