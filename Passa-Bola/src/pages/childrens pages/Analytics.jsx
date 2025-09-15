"use client";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Analytics = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [events, setEvents] = useState([]);
  const [acessos, setAcessos] = useState(0);

  useEffect(() => {
    const armazenadosUsuarios = JSON.parse(localStorage.getItem("users")) || [];
    const armazenadosAdmins = JSON.parse(localStorage.getItem("admins")) || [];
    const armazenadosEventos = JSON.parse(localStorage.getItem("eventsStorage")) || [];
    const totalAcessos = parseInt(localStorage.getItem("totalAcessos")) || 0;

    setUsers(armazenadosUsuarios);
    setAdmins(armazenadosAdmins);
    setEvents(armazenadosEventos);
    setAcessos(totalAcessos);
  }, []);

  const totalUsuarios = users.length + admins.length;
  const totalEventos = events.length;
  const totalInscricoes = events.reduce(
    (acc, event) => acc + (event.inscritos?.length || 0),
    0
  );
  const percentualParticipacao = totalUsuarios
    ? ((totalInscricoes / totalUsuarios) * 100).toFixed(2)
    : 0;

  // Gráfico de usuários vs admins
  const usuariosAdminsData = {
    labels: ["Usuários", "Admins"],
    datasets: [
      {
        label: "Usuários x Admins",
        data: [users.length, admins.length],
        backgroundColor: ["#5b3ce2", "#9b59b6"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  };

  // Gráfico percentual de participação geral
  const participacaoData = {
    labels: ["Inscritos", "Não inscritos"],
    datasets: [
      {
        data: [totalInscricoes, totalUsuarios - totalInscricoes],
        backgroundColor: ["#9b59b6", "#5b3ce2"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  };

  // Gráficos por evento
  const eventosData = events.map((event) => {
    const inscritos = event.inscritos?.length || 0;
    const max = event.maxInscritos || 1;
    const percentual = ((inscritos / max) * 100).toFixed(2);
    return {
      name: event.name,
      data: {
        labels: ["Inscritos", "Não inscritos"],
        datasets: [
          {
            data: [inscritos, max - inscritos],
            backgroundColor: ["#9b59b6", "#5b3ce2"],
            borderColor: ["#fff", "#fff"],
            borderWidth: 2,
          },
        ],
      },
      inscritos,
      max,
      percentual,
    };
  });

  return (
    <div className="h-screen w-screen bg-[#1c1c1c] p-6 overflow-y-auto flex flex-col items-center gap-10">
      <h1 className="text-3xl font-bold text-white">Painel de Análises</h1>

      {/* ===== Cards gerais ===== */}
      <section className="w-full max-w-6xl">
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Informações Gerais</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-[#2c2c2c] p-4 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
            <span className="text-gray-400">Total de acessos ao site</span>
            <span className="text-2xl font-bold text-white">{acessos}</span>
          </div>

          <div className="bg-[#2c2c2c] p-4 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
            <span className="text-gray-400">Total de usuários</span>
            <span className="text-2xl font-bold text-white">{totalUsuarios}</span>
          </div>

          <div className="bg-[#2c2c2c] p-4 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
            <span className="text-gray-400">Total de eventos</span>
            <span className="text-2xl font-bold text-white">{totalEventos}</span>
          </div>

          <div className="bg-[#2c2c2c] p-4 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
            <span className="text-gray-400">Total de inscrições</span>
            <span className="text-2xl font-bold text-white">{totalInscricoes} ({percentualParticipacao}%)</span>
          </div>
        </div>
      </section>

      {/* ===== Gráficos principais ===== */}
      <section className="w-full max-w-6xl mt-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Gráficos Principais</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-[#2c2c2c] p-4 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
            <span className="text-gray-400 mb-2">Percentual de participação</span>
            <Doughnut data={participacaoData} width={120} height={120} />
            <span className="text-white mt-2 text-sm">{percentualParticipacao}% do total de usuários</span>
          </div>

          <div className="bg-[#2c2c2c] p-4 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
            <span className="text-gray-400 mb-2">Usuários vs Admins</span>
            <Doughnut data={usuariosAdminsData} width={120} height={120} />
            <span className="text-white mt-2 text-sm">{((users.length / totalUsuarios) * 100).toFixed(2)}% Usuários, {((admins.length / totalUsuarios) * 100).toFixed(2)}% Admins</span>
          </div>
        </div>
      </section>

      {/* ===== Gráficos por evento ===== */}
      {eventosData.length > 0 && (
        <section className="w-full max-w-6xl mt-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Gráficos por Evento</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {eventosData.map((ev, idx) => (
              <div key={idx} className="bg-[#2c2c2c] p-4 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
                <span className="text-gray-400 mb-2">{ev.name}</span>
                <Doughnut data={ev.data} width={120} height={120} />
                <span className="text-white mt-2 text-sm">{ev.inscritos}/{ev.max} ({ev.percentual}%) inscritos</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Analytics;
