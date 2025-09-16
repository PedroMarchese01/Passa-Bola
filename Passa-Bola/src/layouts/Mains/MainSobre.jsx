import React from "react";
import bgImg from "../../assets/hero8.png"; 


const MainSobre = () => {
  return (
    <div
      className="mt-16 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="bg-black/70 min-h-screen px-6 md:px-12 py-12 flex flex-col gap-10">
        
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          Sobre Nós
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-9 items-start">
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:scale-105 transition h-auto">
            <h2 className="text-xl font-semibold text-purple-400">Nossa Missão</h2>
            <p className="mt-2 text-gray-200 text-sm">
              Nossa missão é transformar o futebol feminino em um espaço de reconhecimento e inspiração. 
              Queremos criar uma comunidade onde cada jogadora tenha visibilidade, onde o talento seja 
              valorizado e respeitado. Buscamos ser referência em inclusão e fortalecimento do esporte, 
              mostrando que o futebol feminino pode ir muito além das quatro linhas, alcançando sonhos, 
              carreiras e corações em todo o Brasil.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:scale-105 transition h-auto">
            <h2 className="text-xl font-semibold text-purple-400">Nossa Visão</h2>
            <p className="mt-2 text-gray-200 text-sm">
              Ser referência no futebol feminino amador, ampliando a visibilidade e criando uma rede nacional.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:scale-105 transition h-auto">
            <h2 className="text-xl font-semibold text-purple-400">Nossos Valores</h2>
            <ul className="mt-2 text-gray-200 text-sm space-y-1 list-disc list-inside">
              <li>Respeito e Inclusão</li>
              <li>Trabalho em Equipe</li>
              <li>Valorização do Esporte Feminino</li>
              <li>Transparência e Honestidade</li>
              <li>Paixão pelo Futebol</li>
              <li>Competitividade Saudável</li>
              <li>Amizade e União</li>
              <li>Dedicação e Esforço</li>
              <li>Incentivo ao Crescimento Pessoal</li>
              <li>Promoção da Igualdade de Oportunidades</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:scale-105 transition h-auto">
            <h2 className="text-xl font-semibold text-purple-400">Nosso Time</h2>
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex items-center gap-3">
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://ui-avatars.com/api/?name=Luana+Maluf"
                  alt="Membro"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-white font-semibold">Luana Maluf</p>
                  <p className="text-gray-300 text-xs">Dona</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://ui-avatars.com/api/?name=Ale+Xavier"
                  alt="Membro"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-white font-semibold">Ale Xavier</p>
                  <p className="text-gray-300 text-xs">Dona</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:scale-105 transition h-auto md:col-span-2">
            <h2 className="text-xl font-semibold text-purple-400">Contato</h2>
            <p className="mt-2 text-gray-200 text-sm">📧 contato@passabola.com</p>
            <p className="text-gray-200 text-sm">📱 (11) 99999-9999</p>
            <p className="text-gray-200 text-sm">📍 São Paulo - SP</p>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-400 text-sm border-t border-gray-600 pt-6">
          © {new Date().getFullYear()} Passa Bola. Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
};

export default MainSobre;
