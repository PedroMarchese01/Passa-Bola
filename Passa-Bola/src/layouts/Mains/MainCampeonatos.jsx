import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import heroImg from "@/assets/hero4.png";
import NavHome from "../Navs/NavHome";

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
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      <NavHome />

      {/* Hero + Card sobreposto */}
      <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-[95vh]">
        {/* Hero image */}
        <img
          src={heroImg}
          alt="Campeonato"
          className="w-full h-full object-cover"
        />

        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Card centralizado sobre a imagem */}
        <div className="absolute inset-0 flex justify-center items-center px-4">
          {campeonato ? (
            <Card className="w-full max-w-3xl bg-gradient-to-r from-black/70 to-gray-800/70 border border-white/20 shadow-xl backdrop-blur-lg animate-fadeIn">

              {alert && (
                <Alert
                  className={`mb-6 ${
                    alert.type === "error" ? "border-red-600" : "border-green-600"
                  }`}
                >
                  <AlertTitle>{alert.title}</AlertTitle>
                  <AlertDescription>{alert.description}</AlertDescription>
                </Alert>
              )}

              <CardHeader>
                <CardTitle className="text-2xl text-white font-bold">
                  {campeonato.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 text-white">
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
                  className="bg-purple-600 hover:bg-purple-800 text-white text-lg mt-4 self-center w-full sm:w-auto"
                  onClick={handleInscricao}
                >
                  Inscrever-se agora
                </Button>
              </CardContent>
            </Card>
            ):    
            (
            <Card className="w-full max-w-2xl p-8 bg-black/80 border border-white/20 shadow-xl rounded-2xl text-center animate-fadeIn">
                <p className="text-2xl sm:text-3xl md:text-4xl text-gray-300 font-semibold mb-6">
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
