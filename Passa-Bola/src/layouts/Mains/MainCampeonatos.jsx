import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import NavChildren from "../Navs/Nav";
import heroBg from "../../assets/hero4.png";

const MainCampeonatos = () => {
  const navigate = useNavigate();
  const [campeonato, setCampeonato] = useState(null);
  const [inscritas, setInscritas] = useState([]);
  const [alert, setAlert] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("eventsStorage")) || [];
    const campeonatoAtivo = stored.find((e) => e.type === "campeonato");
    if (campeonatoAtivo) {
      setCampeonato(campeonatoAtivo);
      setInscritas(campeonatoAtivo.inscritos || []);
    }
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    setLoggedUser(user);
  }, []);

  const handleInscricao = () => {
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

  const handleDesinscricao = () => {
    if (!loggedUser) return;
    const userId = loggedUser.cpf || loggedUser.email;
    const novaLista = inscritas.filter((id) => id !== userId);
    setInscritas(novaLista);

    const stored = JSON.parse(localStorage.getItem("eventsStorage")) || [];
    const campeonatoIndex = stored.findIndex((e) => e.type === "campeonato");
    if (campeonatoIndex !== -1) {
      stored[campeonatoIndex].inscritos = novaLista;
      localStorage.setItem("eventsStorage", JSON.stringify(stored));
    }
    setAlert({
      title: "Sucesso",
      description: "Você foi desinscrita do campeonato.",
      type: "success",
    });
    setConfirmOpen(false);
  };

  const userId = loggedUser?.cpf || loggedUser?.email;
  const isInscrita = inscritas.includes(userId);

  return (
    <div
      className="w-full min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <NavChildren />

      <div className="flex-1 w-full flex items-center justify-center relative">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Conteúdo principal */}
        <div className="relative w-full max-w-4xl px-4 py-8 overflow-auto flex justify-center items-start">
          {campeonato ? (
            <Card className="w-full bg-gradient-to-r from-black/70 to-gray-800/70 border border-white/20 shadow-xl backdrop-blur-md animate-fadeIn flex flex-col gap-6">
              {alert && (
                <Alert
                  className={`${
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

              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-200">
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

                <div className="col-span-full flex flex-col sm:flex-row gap-4 mt-4 justify-start">
                  <Button
                    onClick={handleInscricao}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-6 py-2 flex-1 sm:flex-none"
                  >
                    Inscrever-se agora
                  </Button>

                  {isInscrita && (
                    <>
                      <Button
                        variant="destructive"
                        onClick={() => setConfirmOpen(true)}
                        className="text-lg px-6 py-2 flex-1 sm:flex-none"
                      >
                        Desinscrever-se
                      </Button>

                      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Deseja realmente se desinscrever?
                            </DialogTitle>
                            <DialogDescription>
                              Você perderá sua vaga neste campeonato.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setConfirmOpen(false)}
                            >
                              Cancelar
                            </Button>
                            <Button
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={handleDesinscricao}
                            >
                              Confirmar
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </div>
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
