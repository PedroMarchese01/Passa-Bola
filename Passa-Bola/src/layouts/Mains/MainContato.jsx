import React from "react";
import bgImg from "../../assets/hero10.png"; // fundo de contato

const MainContato = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Informações da empresa */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-white/10">
            <h2 className="text-2xl font-semibold text-purple-400 mb-6">
              Nossos Dados
            </h2>
            <ul className="space-y-4 text-gray-200">
              <li>
                <span className="font-semibold">📍 Endereço:</span> São Paulo - SP, Brasil
              </li>
              <li>
                <span className="font-semibold">📧 E-mail:</span>{" "}
                <a
                  href="mailto:contato@passabola.com"
                  className="text-purple-300 hover:underline"
                >
                  contato@passabola.com
                </a>
              </li>
              <li>
                <span className="font-semibold">📞 Telefone:</span>{" "}
                <a
                  href="tel:+5511999999999"
                  className="text-purple-300 hover:underline"
                >
                  (11) 99999-9999
                </a>
              </li>
              <li>
                <span className="font-semibold">🌐 Instagram:</span>{" "}
                <a
                  href="https://instagram.com/passabola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:underline"
                >
                  @passabola
                </a>
              </li>
            </ul>
          </div>

          {/* Formulário de contato */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-white/10">
            <h2 className="text-2xl font-semibold text-purple-400 mb-6">
              Envie uma mensagem
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-200">Nome</label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-gray-200">E-mail</label>
                <input
                  type="email"
                  className="w-full mt-1 p-3 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="seuemail@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-200">Mensagem</label>
                <textarea
                  rows="4"
                  className="w-full mt-1 p-3 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Digite sua mensagem..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContato;
