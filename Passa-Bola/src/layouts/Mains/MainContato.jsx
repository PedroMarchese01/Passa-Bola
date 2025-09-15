import React, { useState } from "react";
import bgImg from "../../assets/hero12.png"; // fundo de contato

const MainContato = () => {
  const [openCard, setOpenCard] = useState(null);

  // Dados dos cards
  const cards = [
    {
      id: "endereco",
      title: "📍 Endereço",
      content: "São Paulo - SP, Brasil",
    },
    {
      id: "email",
      title: "📧 E-mail",
      content: (
        <a
          href="mailto:contato@passabola.com"
          className="text-purple-300 hover:underline"
        >
          contato@passabola.com
        </a>
      ),
    },
    {
      id: "telefone",
      title: "📞 Telefone",
      content: (
        <a
          href="tel:+5511999999999"
          className="text-purple-300 hover:underline"
        >
          (11) 99999-9999
        </a>
      ),
    },
    {
      id: "instagram",
      title: "🌐 Instagram",
      content: (
        <a
          href="https://instagram.com/passabola"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-300 hover:underline"
        >
          @passabola
        </a>
      ),
    },
  ];

  return (
    <div
      className="pt-24 px-6 md:px-20 pb-16 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Overlay global */}
      <div className="bg-black/50 min-h-screen rounded-2xl p-8 md:p-12 shadow-xl">
        
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Contato</h1>
          <p className="text-lg text-gray-200 mt-4 max-w-2xl mx-auto">
            Entre em contato com a <span className="font-semibold text-purple-400">Passa Bola</span>! 
            Estamos prontos para esclarecer dúvidas, receber sugestões e apoiar o 
            desenvolvimento do futebol feminino. 💜⚽
          </p>
        </div>

        {/* Grid de informações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => setOpenCard(card)} // Abre modal
              className="cursor-pointer bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-md 
                         border border-gray-700/30 hover:scale-105 hover:bg-white/10 
                         transition-transform duration-300"
            >
              <h3 className="text-xl font-semibold text-purple-400 mb-2">
                {card.title}
              </h3>
              <div className="text-gray-200">{card.content}</div>
            </div>
          ))}
        </div>

        {/* Formulário de contato */}
        <div className="mt-12 bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-md 
                        border border-gray-700/30 hover:scale-[1.01] hover:bg-white/10 
                        transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-purple-400 mb-6">
            Envie uma mensagem
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-200">Nome</label>
              <input
                type="text"
                className="w-full mt-1 p-3 rounded-lg bg-black/40 border border-gray-600 
                           text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 
                           focus:outline-none"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-gray-200">E-mail</label>
              <input
                type="email"
                className="w-full mt-1 p-3 rounded-lg bg-black/40 border border-gray-600 
                           text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 
                           focus:outline-none"
                placeholder="seuemail@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-200">Mensagem</label>
              <textarea
                rows="4"
                className="w-full mt-1 p-3 rounded-lg bg-black/40 border border-gray-600 
                           text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 
                           focus:outline-none"
                placeholder="Digite sua mensagem..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg 
                         font-semibold transition"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>

      {/* Modal (abre quando clicar em card) */}
      {openCard && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setOpenCard(null)}
        >
          <div
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-purple-500/40 max-w-lg w-full mx-6 text-center"
            onClick={(e) => e.stopPropagation()} // Evita fechar clicando dentro
          >
            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              {openCard.title}
            </h2>
            <div className="text-gray-200 text-lg">{openCard.content}</div>
            <button
              onClick={() => setOpenCard(null)}
              className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContato;
