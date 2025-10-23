import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const capitais = [
  { nome: "São Paulo", lat: -23.55052, lon: -46.633308 },
  { nome: "Rio de Janeiro", lat: -22.906847, lon: -43.172896 },
  { nome: "Belo Horizonte", lat: -19.9245, lon: -43.93523 },
  { nome: "Brasília", lat: -15.793889, lon: -47.882778 },
  { nome: "Curitiba", lat: -25.4284, lon: -49.2733 },
];

const renderIcone = (code) => {
  if (code === 0) return "☀️";
  if (code >= 61 && code <= 65) return "🌧️";
  if (code >= 45 && code <= 48) return "☁️";
  return "☀️";
};

const Clima = () => {
  const storage = JSON.parse(localStorage.getItem("climaLocation")) || {
    lat: -23.55052,
    lon: -46.633308,
    nome: "São Paulo",
  };

  const [cidade, setCidade] = useState(storage);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [latInput, setLatInput] = useState(storage.lat);
  const [lonInput, setLonInput] = useState(storage.lon);
  const [inicio, setInicio] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");

  const fetchClima = async (startDate, endDate) => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${cidade.lat}&longitude=${cidade.lon}&hourly=temperature_2m,weathercode&current_weather=true&timezone=America/Sao_Paulo&start_date=${startDate}&end_date=${endDate}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro ao obter dados do clima");
      const json = await res.json();

      const novosHorarios = [];

      if (json.current_weather) {
        const hoje = new Date().toISOString().split("T")[0];
        if (!horarios.find((h) => h.dataCompleta === hoje && h.hora === "Agora")) {
          novosHorarios.push({
            diaMes: "Hoje",
            dataCompleta: hoje,
            hora: "Agora",
            temp: json.current_weather.temperature,
            code: json.current_weather.weathercode,
          });
        }
      }

      for (let i = 0; i < json.hourly.time.length; i++) {
        const t = json.hourly.time[i];
        const [ano, mes, dia] = t.split("T")[0].split("-");
        const hora = parseInt(t.split("T")[1].slice(0, 2));
        const temp = json.hourly.temperature_2m[i];
        const code = json.hourly.weathercode[i];
        const dataFormatada = `${dia}/${mes}/${ano}`;

        if (!horarios.find((h) => h.dataCompleta === t.split("T")[0] && h.hora === `${hora}h`)) {
          novosHorarios.push({
            diaMes: dataFormatada,
            dataCompleta: t.split("T")[0],
            hora: `${hora}h`,
            temp,
            code,
          });
        }
      }

      setHorarios((prev) => [...prev, ...novosHorarios].sort((a, b) => new Date(a.dataCompleta + "T" + a.hora.replace("h", ":00")) - new Date(b.dataCompleta + "T" + b.hora.replace("h", ":00"))));
    } catch (err) {
      console.error(err);
      setErro("Não foi possível carregar os dados do clima");
    }
  };


  useEffect(() => {
    const hoje = new Date();
    const fim = new Date();
    fim.setDate(fim.getDate() + 7); 
    fetchClima(hoje.toISOString().split("T")[0], fim.toISOString().split("T")[0]).finally(() => setLoading(false));
  }, [cidade]);

  const salvarLocalizacao = () => {
    const novaCidade = {
      lat: parseFloat(latInput),
      lon: parseFloat(lonInput),
      nome: "Personalizada",
    };
    localStorage.setItem("climaLocation", JSON.stringify(novaCidade));
    setCidade(novaCidade);
    setHorarios([]);
    setInicio(0);
  };

  const irParaData = async () => {
    if (!selectedDate) return;
    const index = horarios.findIndex((h) => h.dataCompleta === selectedDate);
    if (index !== -1) {
      setInicio(index);
    } else {
      await fetchClima(selectedDate, selectedDate);
      const novoIndex = horarios.findIndex((h) => h.dataCompleta === selectedDate);
      if (novoIndex !== -1) setInicio(novoIndex);
    }
  };

  const nextHorarios = async () => {
    if (inicio + 5 >= horarios.length) {
      const lastDate = horarios[horarios.length - 1]?.dataCompleta;
      if (lastDate) {
        const prox = new Date(lastDate);
        prox.setDate(prox.getDate() + 7);
        await fetchClima(lastDate, prox.toISOString().split("T")[0]);
      }
    }
    setInicio((prev) => Math.min(prev + 5, horarios.length - 1));
  };

  const prevHorarios = async () => {
    if (inicio - 5 < 0) {
      const firstDate = horarios[0]?.dataCompleta;
      if (firstDate) {
        const anterior = new Date(firstDate);
        anterior.setDate(anterior.getDate() - 7);
        await fetchClima(anterior.toISOString().split("T")[0], firstDate);
        setInicio(0);
        return;
      }
    }
    setInicio((prev) => Math.max(prev - 5, 0));
  };

  return (
    <div className="h-screen bg-[#1c1c1c] text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-2">Clima Tempo</h1>

      <p className="mb-4 text-lg">
        Mostrando clima para: <span className="font-semibold text-purple-400">{cidade.nome}</span>
      </p>

      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {capitais.map((c) => (
          <Button
            key={c.nome}
            onClick={() => {
              setCidade(c);
              localStorage.setItem("climaLocation", JSON.stringify(c));
              setHorarios([]);
              setInicio(0);
            }}
            className={`px-4 py-2 rounded ${
              c.nome === cidade.nome
                ? "bg-purple-600 text-white"
                : "bg-white text-black hover:bg-purple-400 hover:text-white transition-all"
            }`}
          >
            {c.nome}
          </Button>
        ))}
      </div>

      <Card className="mb-6 w-full max-w-md bg-white text-black">
        <CardHeader>
          <CardTitle>Localização Personalizada</CardTitle>
          <p>Pesquise a latitude e longitude do local personalizado!</p>
        </CardHeader>
        <CardContent className="flex gap-2 mt-2">
          <Input type="number" step="any" value={latInput} onChange={(e) => setLatInput(e.target.value)} placeholder="Latitude" />
          <Input type="number" step="any" value={lonInput} onChange={(e) => setLonInput(e.target.value)} placeholder="Longitude" />
          <Button onClick={salvarLocalizacao} className="bg-purple-600 text-white hover:bg-purple-700 transition-all">
            Salvar
          </Button>
        </CardContent>
      </Card>

      <div className="mb-4 flex gap-2 items-center">
        <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="bg-white text-black" />
        <Button onClick={irParaData} className="bg-purple-600 text-white hover:bg-purple-700">
          Ir para o dia
        </Button>
      </div>
      <div>
        <p>Esta pagina consegue carregar até 15 dias após</p>
      </div>

      {loading && <p className="text-white mb-4">Carregando...</p>}
      {erro && <p className="text-red-500 mb-4">{erro}</p>}

      <div className="flex items-center gap-2 mb-4 w-full max-w-4xl">
        <Button onClick={prevHorarios} className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-purple-500 active:scale-95 transition-all">
          {"<"}
        </Button>

        <ScrollArea className="flex-1 h-[240px] bg-transparent rounded-md p-2">
          <div className="flex gap-2 p-2 justify-center">
            {horarios.slice(inicio, inicio + 5).map((h, i) => (
              <Card
                key={i}
                className={`w-[100px] p-3 flex flex-col items-center justify-between shadow-md ${
                  h.hora === "Agora" ? "border-2 border-purple-600 bg-transparent" : "bg-transparent"
                } text-white`}
              >
                <p className="text-xs font-bold mb-1 text-gray-400">{h.diaMes}</p>
                <p className="text-sm font-semibold mb-1">{h.hora}</p>
                <span className="text-2xl mb-1">{renderIcone(h.code)}</span>
                <p className="text-md font-semibold">{Math.round(h.temp)}°C</p>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <Button onClick={nextHorarios} className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-purple-500 active:scale-95 transition-all">
          {">"}
        </Button>
      </div>
    </div>
  );
};

export default Clima;
