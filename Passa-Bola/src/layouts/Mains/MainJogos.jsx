import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import bgImg from "../../assets/hero2.jpg";

const storageKey = "eventsStorage";

const MainJogos = () => {
  const [games, setGames] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [confirmUnregister, setConfirmUnregister] = useState(null);
  const navigate = useNavigate();

  const isLogged = () => localStorage.getItem("logged?") === "true";
  const userName = localStorage.getItem("userName") || "";

  // Carregar jogos
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem(storageKey)) || [];
    const mensais = storedEvents.filter((e) => e.type === "mensal");

    if (mensais.length === 0) {
      const exemplos = [
        { id: "ex1", type: "mensal", name: "Jogo Feminino - Outubro", date: "2025-10-20", time: "18:00", location: "PlayBall Arena (Quadra 1)", inscritos: [], maxInscritos: 20 },
        { id: "ex2", type: "mensal", name: "Jogo Feminino - Novembro", date: "2025-11-15", time: "15:30", location: "PlayBall Arena (Quadra 2)", inscritos: [], maxInscritos: 20 },
        { id: "ex3", type: "mensal", name: "Jogo Feminino - Dezembro", date: "2025-12-10", time: "10:00", location: "PlayBall Arena (Quadra 3)", inscritos: [], maxInscritos: 20 },
      ];
      localStorage.setItem(storageKey, JSON.stringify(exemplos));
      setGames(exemplos);
    } else {
      setGames(mensais);
    }
  }, []);

  const sortedGames = [...games].sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleClick = (game) => {
    // Limpar outros alertas
    setAlertMessage(null);
    setConfirmUnregister(null);

    if (!isLogged()) {
      setAlertMessage({ type: "error", message: "Você precisa estar logado para se inscrever!" });
      return;
    }

    if (game.inscritos.includes(userName)) {
      setConfirmUnregister(game); // abre confirmação
      return;
    }

    // Inscrição normal
    const updatedGames = games.map((g) =>
      g.id === game.id ? { ...g, inscritos: [...g.inscritos, userName] } : g
    );
    setGames(updatedGames);

    const storedEvents = JSON.parse(localStorage.getItem(storageKey)) || [];
    const updatedEvents = storedEvents.map((ev) =>
      ev.id === game.id ? { ...ev, inscritos: [...(ev.inscritos || []), userName] } : ev
    );
    localStorage.setItem(storageKey, JSON.stringify(updatedEvents));

    setAlertMessage({ type: "success", message: `Inscrição confirmada em ${game.name}!` });
  };

  const handleConfirmUnregister = () => {
    const game = confirmUnregister;
    if (!game) return;

    // Limpar alertas anteriores
    setAlertMessage(null);

    const updatedGames = games.map((g) =>
      g.id === game.id ? { ...g, inscritos: g.inscritos.filter((n) => n !== userName) } : g
    );
    setGames(updatedGames);

    const storedEvents = JSON.parse(localStorage.getItem(storageKey)) || [];
    const updatedEvents = storedEvents.map((ev) =>
      ev.id === game.id ? { ...ev, inscritos: ev.inscritos.filter((n) => n !== userName) } : ev
    );
    localStorage.setItem(storageKey, JSON.stringify(updatedEvents));

    setAlertMessage({ type: "desist", message: `Você se desinscreveu de ${game.name}.` });
    setConfirmUnregister(null);
  };

  return (
    <div className="pt-24 px-6 md:px-20 pb-16 min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="bg-black/80 min-h-screen rounded-2xl p-8 md:p-12 shadow-xl relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Jogos Mensais</h1>
          <p className="text-lg text-gray-200 mt-4 max-w-2xl mx-auto">
            Participe dos <span className="font-semibold text-purple-400">Jogos Mensais</span> da Passa Bola! ⚽💜
          </p>
        </div>

        {/* ALERTAS */}
        {alertMessage && (
          <div className="mb-6">
            <Alert
              className={`border-2 ${alertMessage.type === "error" ? "border-red-600" : alertMessage.type === "desist" ? "border-red-500" : "border-green-600"} bg-black/30 backdrop-blur-sm text-white`}
            >
              <AlertTitle>{alertMessage.type === "error" ? "Erro" : "Aviso"}</AlertTitle>
              <AlertDescription>{alertMessage.message}</AlertDescription>
            </Alert>
          </div>
        )}

        {confirmUnregister && (
          <Alert className="border-2 border-red-600 text-white bg-black/30 backdrop-blur-sm mb-6">
            <AlertTitle>Confirmação de desinscrição</AlertTitle>
            <AlertDescription>
              Deseja realmente se desinscrever de <b>{confirmUnregister.name}</b>?
              <div className="mt-2 flex gap-2">
                <Button variant="destructive" onClick={handleConfirmUnregister}>Sim</Button>
                <Button variant="outline" onClick={() => setConfirmUnregister(null)}>Cancelar</Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* LISTAGEM DE JOGOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedGames.map((game) => {
            const progress = Math.min(100, Math.floor((game.inscritos.length / game.maxInscritos) * 100));
            const buttonText = game.inscritos.includes(userName) ? "Desinscrever" : "Inscrever-se";

            return (
              <Card key={game.id} className="relative bg-white/5 backdrop-blur-lg rounded-2xl shadow-md border border-gray-700/30 hover:scale-105 hover:bg-white/10 transition-transform duration-300">
                <CardHeader>
                  <CardTitle className="text-purple-400">{game.name}</CardTitle>
                  <span className={`absolute top-4 right-4 text-xs text-white px-3 py-1 rounded-full ${
                    game.inscritos.includes(userName)
                      ? "bg-red-600"
                      : game.inscritos.length >= game.maxInscritos
                      ? "bg-gray-600"
                      : game.inscritos.length >= game.maxInscritos - 3
                      ? "bg-yellow-500"
                      : "bg-green-600"
                  }`}>
                    {game.inscritos.includes(userName)
                      ? "Inscrito"
                      : game.inscritos.length >= game.maxInscritos
                      ? "Encerrado"
                      : game.inscritos.length >= game.maxInscritos - 3
                      ? "Quase cheio"
                      : "Aberto"}
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200 mb-2">📅 {new Date(game.date).toLocaleDateString("pt-BR")}</p>
                  <p className="text-gray-200 mb-2">⏰ {game.time}</p>
                  <p className="text-gray-200 mb-2">📍 {game.location}</p>
                  <p className="text-gray-200 mb-2">👥 {game.inscritos.length} / {game.maxInscritos} inscritos</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
                    <div className="h-2 rounded-full bg-purple-500" style={{ width: `${progress}%` }} />
                  </div>
                  <Button
                    className={`w-full text-white ${game.inscritos.includes(userName) ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"}`}
                    onClick={() => handleClick(game)}
                    disabled={game.inscritos.length >= game.maxInscritos && !game.inscritos.includes(userName)}
                  >
                    {buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainJogos;
