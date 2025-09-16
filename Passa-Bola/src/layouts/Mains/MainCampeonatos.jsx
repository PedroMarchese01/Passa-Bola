import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import NavChildren from "../Navs/NavChildren";

const MainCampeonatos = () => {
  const navigate = useNavigate();
  const [campeonato, setCampeonato] = useState(null);
  const [inscritas, setInscritas] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("eventsStorage")) || [];
    const campeonatoAtivo = stored.find((e) => e.type === "campeonato");
    if (campeonatoAtivo) {
      setCampeonato(campeonatoAtivo);
      setInscritas(campeonatoAtivo.inscritos || []);
    }
  }, []);

  const handleInscricao = () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const isLogged = localStorage.getItem("logged?");

    if (!isLogged || !loggedUser) {
      setAlert({
        title: "Login necessário",
        description: "Você precisa estar logada para se inscrever.",
        type: "error",
      });
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    const userId = loggedUser.cpf || loggedUser.email;

    if (inscritas.includes(userId)) {
      setAlert({
        title: "Atenção",
        description: "Você já está inscrita neste campeonato.",
        type: "error",
      });
      return;
    }

    const novaLista = [...inscritas, userId];
    setInscritas(novaLista);

    const stored = JSON.parse(localStorage.getItem("eventsStorage")) || [];
    const campeonatoIndex = stored.findIndex((e) => e.type === "campeonato");
    if (campeonatoIndex !== -1) {
      stored[campeonatoIndex].inscritos = novaLista;
      localStorage.setItem("eventsStorage", JSON.stringify(stored));
    }

    setAlert({
      title: "Sucesso",
      description: "Inscrição realizada com sucesso!",
      type: "success",
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#1c1c1c] text-white flex flex-col">
      <NavChildren />

      <div className="relative flex-1">
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          {campeonato ? (
            <Card className="w-full max-w-3xl bg-gradient-to-r from-black/70 to-gray-800/70 border border-white/20 shadow-xl backdrop-blur-md animate-fadeIn">
              {alert && (
                <Alert
                  className={`mb-6 ${
                    alert.type === "error"
                      ? "border-red-600"
                      : "border-green-600"
                  }`}
                >
                  <AlertTitle>{alert.title}</AlertTitle>
                  <AlertDescription>{alert.description}</AlertDescription>
                </Alert>
              )}

              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">
                  {campeonato.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-3 text-gray-200">
                <p>
                  <span className="font-semibold">Data de início:</span>{" "}
                  {campeonato.dateStart || "—"}
                </p>
                <p>
                  <span className="font-semibold">Data de término:</span>{" "}
                  {campeonato.dateEnd || "—"}
                </p>
                <p>
                  <span className="font-semibold">Local:</span>{" "}
                  {campeonato.location || "—"}
                </p>
                <p>
                  <span className="font-semibold">Inscritas:</span>{" "}
                  {inscritas.length}/{campeonato.maxInscritos || "∞"}
                </p>

                <Button
                  onClick={handleInscricao}
                  className="mt-4 bg-purple-600 hover:bg-purple-700 text-white text-lg px-6 py-2 self-center sm:self-start"
                >
                  Inscrever-se agora
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="w-full max-w-2xl p-8 bg-black/80 border border-white/20 shadow-xl rounded-2xl text-center animate-fadeIn">
              <p className="text-2xl sm:text-3xl md:text-4xl text-gray-300 font-semibold">
                Nenhum campeonato disponível no momento.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainCampeonatos;
