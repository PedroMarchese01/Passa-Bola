import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const storageKey = "eventsStorage";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [alert, setAlert] = useState(null);

  const [type, setType] = useState("mensal");
  const [name, setName] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [maxInscritos, setMaxInscritos] = useState("");

  // --- Carrega com parse seguro (evita tela branca se JSON estiver inválido)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const storedEvents = raw ? JSON.parse(raw) : [];
      const initialized = (storedEvents || []).map((e) => ({
        ...e,
        inscritos: Array.isArray(e.inscritos) ? e.inscritos : [],
        brackets:
          (e.brackets || []).map((r) => ({
            ...r,
            matches: r?.matches || [],
          })) || [],
      }));
      setEvents(initialized);
    } catch (err) {
      console.error("Falha ao ler eventsStorage:", err);
      // Se o JSON estiver corrompido, limpamos a chave para o app voltar a funcionar
      localStorage.removeItem(storageKey);
      setEvents([]);
      setAlert({
        title: "Aviso",
        description:
          "Detectamos dados corrompidos no armazenamento local. Limpamos os eventos para evitar erros.",
      });
    }
  }, []);

  // Reset de campos quando troca o tipo
  useEffect(() => {
    setDateStart("");
    setDateEnd("");
    setTime("");
    setMaxInscritos("");
  }, [type]);

  const saveEvents = (updatedEvents) => {
    setEvents(updatedEvents);
    localStorage.setItem(storageKey, JSON.stringify(updatedEvents));
  };

  const showAlert = (title, description) => {
    setAlert({ title, description });
    setTimeout(() => setAlert(null), 4000);
  };

  const handleSaveEvent = () => {
    const now = new Date();

    if (
      !name ||
      !location ||
      (type === "mensal" && (!dateStart || !time || !maxInscritos)) ||
      (type === "campeonato" && (!dateStart || !dateEnd))
    ) {
      showAlert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }

    if (type === "mensal" && parseInt(maxInscritos) <= 0) {
      showAlert("Erro", "Número máximo de inscrições deve ser maior que 0!");
      return;
    }

    if (dateStart && new Date(dateStart) < now) {
      showAlert("Erro", "Data de início não pode ser menor que a data atual!");
      return;
    }

    if (type === "campeonato" && new Date(dateEnd) < new Date(dateStart)) {
      showAlert("Erro", "Data de término não pode ser menor que a data de início!");
      return;
    }

    if (editingEvent) {
      const updatedEvents = events.map((e) =>
        e.id === editingEvent.id
          ? {
              ...e,
              type, // garante que o tipo atual seja mantido se o usuário trocar
              name,
              location,
              // campos de campeonato
              dateStart: type === "campeonato" ? dateStart : undefined,
              dateEnd: type === "campeonato" ? dateEnd : undefined,
              // campos de mensal
              date: type === "mensal" ? dateStart : undefined,
              time: type === "mensal" ? time : undefined,
              maxInscritos: type === "mensal" ? parseInt(maxInscritos) : undefined,
            }
          : e
      );
      saveEvents(updatedEvents);
    } else {
      const newEvent = {
        id: Date.now(),
        type,
        name,
        location,
        inscritos: [],
        // mensal
        maxInscritos: type === "mensal" ? parseInt(maxInscritos) : undefined,
        date: type === "mensal" ? dateStart : undefined,
        time: type === "mensal" ? time : undefined,
        // campeonato
        dateStart: type === "campeonato" ? dateStart : undefined,
        dateEnd: type === "campeonato" ? dateEnd : undefined,
        brackets: [],
      };
      saveEvents([...events, newEvent]);
    }

    // limpa formulário
    setName("");
    setLocation("");
    setDateStart("");
    setDateEnd("");
    setTime("");
    setMaxInscritos("");
    setEditingEvent(null);
  };

  const handleRemoveEvent = (id) => {
    const updatedEvents = events.filter((e) => e.id !== id);
    saveEvents(updatedEvents);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setType(event.type);
    setName(event.name || "");
    setLocation(event.location || "");
    if (event.type === "campeonato") {
      setDateStart(event.dateStart || "");
      setDateEnd(event.dateEnd || "");
      setMaxInscritos("");
      setTime("");
    } else {
      setDateStart(event.date || "");
      setTime(event.time || "");
      setMaxInscritos(event.maxInscritos?.toString() || "");
      setDateEnd("");
    }
  };

  const campeonatos = events.filter((e) => e.type === "campeonato");
  const jogosMensais = events.filter((e) => e.type === "mensal");

  return (
    <div className="h-screen bg-[#1c1c1c] text-white flex flex-col overflow-hidden">
      {alert && (
        <Alert className="m-4 transition-all duration-300">
          <AlertTitle className="font-bold">{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      )}

      <div className="p-6 border-b border-gray-700 flex-shrink-0">
        <h1 className="text-3xl font-bold">Eventos</h1>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 p-6 overflow-hidden">
        {/* Form */}
        <div className="md:w-1/3 bg-[#2c2c2c] p-4 rounded-lg flex flex-col gap-4 overflow-auto">
          <div className="flex gap-2">
            <select
              className="bg-[#1c1c1c] px-3 py-2 rounded text-white"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="mensal">Jogo Mensal</option>
              <option value="campeonato">Campeonato</option>
            </select>
            <Input
              placeholder="Nome do evento"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#1c1c1c] text-white placeholder-gray-400"
            />
          </div>

          <Input
            type="text"
            placeholder="Local"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-[#1c1c1c] text-white placeholder-gray-400"
          />

          {type === "campeonato" && (
            <div className="flex gap-2">
              <Input
                type="date"
                placeholder="Data de início"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                className="bg-[#1c1c1c] text-white"
              />
              <Input
                type="date"
                placeholder="Data de término"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                className="bg-[#1c1c1c] text-white"
              />
            </div>
          )}

          {type === "mensal" && (
            <>
              <Input
                type="date"
                placeholder="Data do jogo"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                className="bg-[#1c1c1c] text-white"
              />
              <Input
                type="time"
                placeholder="Horário do jogo"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-[#1c1c1c] text-white"
              />
              <Input
                type="number"
                placeholder="Número máximo de inscrições"
                value={maxInscritos}
                onChange={(e) => setMaxInscritos(e.target.value)}
                className="bg-[#1c1c1c] text-white"
                min={1}
              />
            </>
          )}

          <Button onClick={handleSaveEvent} className="w-full mt-2">
            {editingEvent ? "Salvar Alterações" : "Adicionar Evento"}
          </Button>
        </div>

        {/* Listas */}
        <div className="md:w-2/3 flex flex-col gap-6 overflow-auto">
          {/* Jogos Mensais */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Jogos Mensais</h2>
            {jogosMensais.length === 0 ? (
              <p className="text-gray-400">Nenhum jogo mensal cadastrado.</p>
            ) : (
              jogosMensais.map((e) => (
                <div
                  key={e.id}
                  className="p-4 bg-[#2c2c2c] rounded-lg border border-gray-700"
                >
                  <p className="font-semibold">
                    Nome: <span className="font-normal">{e.name}</span>
                  </p>
                  <p className="font-semibold">
                    Local: <span className="font-normal">{e.location}</span>
                  </p>
                  <p className="font-semibold">
                    Data: <span className="font-normal">{e.date || "-"}</span>
                  </p>
                  <p className="font-semibold">
                    Horário: <span className="font-normal">{e.time || "-"}</span>
                  </p>
                  <p className="font-semibold">
                    Participantes:{" "}
                    <span className="font-normal">
                      {(e.inscritos || []).length}/{e.maxInscritos ?? "-"}
                    </span>
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button onClick={() => handleEditEvent(e)}>Editar</Button>
                    <Button
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => handleRemoveEvent(e.id)}
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Campeonatos */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Campeonatos</h2>
            {campeonatos.length === 0 ? (
              <p className="text-gray-400">Nenhum campeonato cadastrado.</p>
            ) : (
              campeonatos.map((e) => (
                <div
                  key={e.id}
                  className="p-4 bg-[#2c2c2c] rounded-lg border border-gray-700"
                >
                  <p className="font-semibold">
                    Nome: <span className="font-normal">{e.name}</span>
                  </p>
                  <p className="font-semibold">
                    Local: <span className="font-normal">{e.location}</span>
                  </p>
                  <p className="font-semibold">
                    Início: <span className="font-normal">{e.dateStart || "-"}</span>
                  </p>
                  <p className="font-semibold">
                    Término: <span className="font-normal">{e.dateEnd || "-"}</span>
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button onClick={() => handleEditEvent(e)}>Editar</Button>
                    <Button
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => handleRemoveEvent(e.id)}
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
