import React, { useEffect, useState } from "react";

const Analytics = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [events, setEvents] = useState([]);
  const [inscricoes, setInscricoes] = useState([]);
  const [acessos, setAcessos] = useState(0);

  useEffect(() => {
    const armazenadosUsuarios = JSON.parse(localStorage.getItem("users")) || [];
    const armazenadosAdmins = JSON.parse(localStorage.getItem("admins")) || [];
    const armazenadosEventos = JSON.parse(localStorage.getItem("eventsStorage")) || []; // chave corrigida
    const armazenadasInscricoes = JSON.parse(localStorage.getItem("inscricoes")) || [];
    const totalAcessos = parseInt(localStorage.getItem("totalAcessos")) || 0;

    setUsers(armazenadosUsuarios);
    setAdmins(armazenadosAdmins);
    setEvents(armazenadosEventos);
    setInscricoes(armazenadasInscricoes);
    setAcessos(totalAcessos);
  }, []);

  const totalUsuarios = users.length + admins.length;
  const totalEventos = events.length;
  const totalInscricoes = inscricoes.length;
  const percentualParticipacao = totalUsuarios
    ? ((totalInscricoes / totalUsuarios) * 100).toFixed(2)
    : 0;

  return (
    <div className="h-screen w-screen bg-[#1c1c1c] p-6 overflow-y-auto flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold text-white">Painel de Análises</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Total de acessos */}
        <div className="bg-[#2c2c2c] p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
          <span className="text-gray-400">Total de acessos</span>
          <span className="text-2xl font-bold text-white">{acessos}</span>
        </div>

        {/* Total de usuários */}
        <div className="bg-[#2c2c2c] p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
          <span className="text-gray-400">Total de usuários</span>
          <span className="text-2xl font-bold text-white">{totalUsuarios}</span>
        </div>

        {/* Total de eventos */}
        <div className="bg-[#2c2c2c] p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
          <span className="text-gray-400">Total de eventos</span>
          <span className="text-2xl font-bold text-white">{totalEventos}</span>
        </div>

        {/* Total de inscrições */}
        <div className="bg-[#2c2c2c] p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
          <span className="text-gray-400">Total de inscrições</span>
          <span className="text-2xl font-bold text-white">{totalInscricoes}</span>
        </div>

        {/* Percentual de participação */}
        <div className="bg-[#2c2c2c] p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
          <span className="text-gray-400">Percentual de participação</span>
          <span className="text-2xl font-bold text-white">{percentualParticipacao}%</span>
        </div>

        {/* Jogadoras cadastradas */}
        <div className="bg-[#2c2c2c] p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
          <span className="text-gray-400">Jogadoras cadastradas</span>
          <span className="text-2xl font-bold text-white">{users.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
