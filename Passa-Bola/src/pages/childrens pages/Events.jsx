import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const storageKey = "eventsStorage";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const [type, setType] = useState("mensal");
  const [name, setName] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem(storageKey)) || [];
    setEvents(storedEvents);
  }, []);

  const saveEvents = (updatedEvents) => {
    setEvents(updatedEvents);
    localStorage.setItem(storageKey, JSON.stringify(updatedEvents));
  };

  const handleSaveEvent = () => {
    if (!name || !location || (type === "campeonato" && (!dateStart || !dateEnd))) return;

    if (editingEvent) {
      const updatedEvents = events.map((e) =>
        e.id === editingEvent.id ? { ...editingEvent, name, dateStart, dateEnd, location } : e
      );
      saveEvents(updatedEvents);
      setEditingEvent(null);
    } else {
      if (type === "campeonato" && events.some((e) => e.type === "campeonato")) {
        alert("Só é permitido um campeonato ativo!");
        return;
      }
      const newEvent = {
        id: Date.now(),
        type,
        name,
        location,
        dateStart: type === "campeonato" ? dateStart : undefined,
        dateEnd: type === "campeonato" ? dateEnd : undefined,
        date: type === "mensal" ? dateStart : undefined,
      };
      saveEvents([...events, newEvent]);
    }

    // limpar form
    setName("");
    setDateStart("");
    setDateEnd("");
    setLocation("");
  };

  const handleRemoveEvent = (id) => {
    const updatedEvents = events.filter((e) => e.id !== id);
    saveEvents(updatedEvents);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setType(event.type);
    setName(event.name);
    setLocation(event.location);
    if (event.type === "campeonato") {
      setDateStart(event.dateStart);
      setDateEnd(event.dateEnd);
    } else {
      setDateStart(event.date);
    }
  };

  const campeonatos = events.filter((e) => e.type === "campeonato");
  const jogosMensais = events.filter((e) => e.type === "mensal");

  return (
    <div className="h-screen w-screen bg-[#1c1c1c] text-white flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-3xl font-bold">Eventos</h1>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 p-6">
        {/* Formulário */}
        <div className="md:w-1/3 bg-[#2c2c2c] p-4 rounded-lg flex flex-col gap-4 h-full">
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
              className="bg-[#1c1c1c] text-white"
            />
          </div>

          <Input
            type="text"
            placeholder="Local"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-[#1c1c1c] text-white"
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
            <Input
              type="date"
              placeholder="Data do jogo"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              className="bg-[#1c1c1c] text-white"
            />
          )}

          <Button onClick={handleSaveEvent} className="w-full mt-2">
            {editingEvent ? "Salvar Alterações" : "Adicionar Evento"}
          </Button>
        </div>

        {/* Listas de eventos */}
        <div className="md:w-2/3 flex flex-col gap-6 h-full overflow-auto">
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Campeonato Atual</h2>
            {campeonatos.length === 0 ? (
              <p className="text-gray-400">Nenhum campeonato cadastrado.</p>
            ) : (
              campeonatos.map((e) => (
                <div key={e.id} className="p-4 bg-[#2c2c2c] rounded-lg border border-gray-700">
                  <p><strong>Nome:</strong> {e.name}</p>
                  <p><strong>Local:</strong> {e.location}</p>
                  <p><strong>Início:</strong> {e.dateStart}</p>
                  <p><strong>Término:</strong> {e.dateEnd}</p>
                  <div className="flex gap-2 mt-2">
                    <Button onClick={() => handleEditEvent(e)}>Editar</Button>
                    <Button className="bg-red-500 hover:bg-red-600" onClick={() => handleRemoveEvent(e.id)}>Remover</Button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Jogos Mensais</h2>
            {jogosMensais.length === 0 ? (
              <p className="text-gray-400">Nenhum jogo mensal cadastrado.</p>
            ) : (
              jogosMensais.map((e) => (
                <div key={e.id} className="p-4 bg-[#2c2c2c] rounded-lg border border-gray-700">
                  <p><strong>Nome:</strong> {e.name}</p>
                  <p><strong>Local:</strong> {e.location}</p>
                  <p><strong>Data:</strong> {e.date}</p>
                  <div className="flex gap-2 mt-2">
                    <Button onClick={() => handleEditEvent(e)}>Editar</Button>
                    <Button className="bg-red-500 hover:bg-red-600" onClick={() => handleRemoveEvent(e.id)}>Remover</Button>
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
