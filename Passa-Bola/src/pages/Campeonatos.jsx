import React from "react";
import MainCampeonatos from "@/layouts/Mains/MainCampeonatos";

const Campeonatos = () => {
  return (
    <div className="relative w-screen h-screen">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center">
        <MainCampeonatos />
      </div>
    </div>
  );
};

export default Campeonatos;
