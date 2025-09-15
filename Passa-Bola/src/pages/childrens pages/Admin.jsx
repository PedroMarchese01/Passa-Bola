import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const CadastroAdministradora = () => {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [alert, setAlert] = useState(null);

  const handleCadastro = () => {
    if (!usuario || !email || !senha) {
      setAlert({ title: "Erro", description: "Todos os campos são obrigatórios." });
      return;
    }
    if (!email.includes("@")) {
      setAlert({ title: "Erro", description: "Email inválido. Deve conter '@'." });
      return;
    }
    if (senha.length < 6) {
      setAlert({ title: "Erro", description: "A senha precisa ter no mínimo 6 caracteres." });
      return;
    }

    const novaAdmin = { usuario, email, senha };
    const adminsExistentes = JSON.parse(localStorage.getItem("admins")) || [];
    localStorage.setItem("admins", JSON.stringify([...adminsExistentes, novaAdmin]));

    setUsuario("");
    setEmail("");
    setSenha("");
    setAlert({ title: "Sucesso", description: "Administradora cadastrada com sucesso!" });
  };

  return (
    <div className="h-screen w-screen bg-[#1c1c1c] flex justify-center items-center p-4">
      <div className="bg-[#2c2c2c] w-full max-w-md h-full sm:h-auto p-8 rounded-2xl border border-gray-700 flex flex-col gap-6 shadow-lg">
        {alert && (
          <Alert className="transition-all duration-300">
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
          </Alert>
        )}

        <h1 className="text-2xl font-bold text-center text-white">
          Cadastro de Administradora
        </h1>

        <Input
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="bg-[#1c1c1c] text-white placeholder-gray-400"
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#1c1c1c] text-white placeholder-gray-400"
        />
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="bg-[#1c1c1c] text-white placeholder-gray-400"
        />

        <Button
          onClick={handleCadastro}
          className="w-full bg-white text-black hover:bg-purple-600 hover:text-white"
        >
          Cadastrar
        </Button>
      </div>
    </div>
  );
};

export default CadastroAdministradora;