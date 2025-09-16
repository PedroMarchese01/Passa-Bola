import React from "react";
import MainCampeonatos from "@/layouts/Mains/MainCampeonatos";
import DarkVeil from "@/layouts/background/DarkVeil";

const Campeonatos = () => {
  return (
    <div className="relative w-screen h-screen">
      {/* Fundo escuro */}
      <DarkVeil className="absolute inset-0 z-0" />

      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center">
        <MainCampeonatos />
      </div>
    </div>
  );
};

export default Campeonatos;
