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

    const usersExistentes = JSON.parse(localStorage.getItem("users")) || [];

    const emailExistente = usersExistentes.find(user => user.email === email);
    if (emailExistente) {
      setAlert({ title: "Erro", description: "Já existe um usuário cadastrado com esse email." });
      return;
    }

    const novaAdmin = { usuario, email, senha, admin: true };

    localStorage.setItem("users", JSON.stringify([...usersExistentes, novaAdmin]));

    setUsuario("");
    setEmail("");
    setSenha("");
    setAlert({ title: "Sucesso", description: "Administradora cadastrada com sucesso!" });
  };

  return (
    <div className="h-screen w-screen bg-[#1c1c1c] text-white flex flex-col items-center justify-center gap-6 p-8">
      {alert && (
        <Alert className="transition-all duration-300 w-full max-w-lg">
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      )}

      <h1 className="text-3xl font-bold text-center">Cadastro de Administradora</h1>

      <div className="w-full max-w-lg flex flex-col gap-4">
        <Input
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="bg-[#2c2c2c] text-white placeholder-gray-400"
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#2c2c2c] text-white placeholder-gray-400"
        />
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="bg-[#2c2c2c] text-white placeholder-gray-400"
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
