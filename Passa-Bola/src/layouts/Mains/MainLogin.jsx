"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MainLogin = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({ email: "", senha: "" });
  const [error, setError] = useState(null);
  const [mostrar, setMostrar] = useState(false);

  const [cadastro, setCadastro] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmS: "",
    cpf: "",
    telefone: "",
    date: "",
  });
  const [mostrarC, setMostrarC] = useState(false);
  const [cadastroMsg, setCadastroMsg] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const handleLoginChange = (field, value) =>
    setLogin({ ...login, [field]: value });
  const handleCadastroChange = (field, value) =>
    setCadastro({ ...cadastro, [field]: value });

  const validarCPF = (cpf) => {
    let numeros = "";
    for (let i = 0; i < cpf.length; i++) {
      if (cpf[i] >= "0" && cpf[i] <= "9") {
        numeros += cpf[i];
      }
    }

    if (numeros.length !== 11) return false;

    let repetido = true;
    for (let i = 1; i < numeros.length; i++) {
      if (numeros[i] !== numeros[0]) {
        repetido = false;
        break;
      }
    }
    if (repetido) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(numeros[i]) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== parseInt(numeros[9])) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(numeros[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== parseInt(numeros[10])) return false;

    return true;
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExist = users.find(
      (u) => u.email === login.email && u.senha === login.senha
    );

    if (userExist) {
      setError(null);

      // SALVA USUÁRIO LOGADO
      localStorage.setItem("loggedUser", JSON.stringify(userExist));
      localStorage.setItem("logged?", true);

      if (userExist.admin) {
        navigate("/adminControlPainel");
      } else {
        navigate("/");
      }
    } else {
      setError({
        title: "Usuário não encontrado",
        description: "Email ou senha incorretos, tente novamente.",
      });
    }
  };

  const handleCadastro = () => {
    setCadastroMsg(null);
    const { nome, email, senha, confirmS, cpf, telefone, date } = cadastro;

    if (!nome || !email || !senha || !confirmS || !cpf || !date || !telefone) {
      setCadastroMsg({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
      });
      return;
    }

    if (senha !== confirmS) {
      setCadastroMsg({
        title: "Erro na senha",
        description: "As senhas não coincidem.",
      });
      return;
    }

    if (!validarCPF(cpf)) {
      setCadastroMsg({
        title: "CPF inválido",
        description: "Por favor, digite um CPF válido.",
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        setCadastroMsg({ title: "Erro", description: "Email já cadastrado." });
        return;
      }
      if (users[i].cpf === cpf) {
        setCadastroMsg({ title: "Erro", description: "CPF já cadastrado." });
        return;
      }
    }

    let numeros = "";
    for (let i = 0; i < telefone.length; i++) {
      if (telefone[i] >= "0" && telefone[i] <= "9") {
        numeros += telefone[i];
      }
    }

    if (numeros.length < 11) {
      if (numeros.length === 9) {
        setCadastroMsg({
          title: "Telefone incompleto",
          description: "Adicione o DDD (ex: (11)).",
        });
      } else {
        setCadastroMsg({
          title: "Telefone inválido",
          description: "O telefone precisa ter 11 dígitos numéricos.",
        });
      }
      return;
    }

    users.push({ nome, email, senha, cpf, telefone, date, admin: false });
    localStorage.setItem("users", JSON.stringify(users));

    setCadastroMsg({
      title: "Sucesso",
      description: "Cadastro realizado com sucesso!",
    });
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="p-4 rounded-xl bg-white/10 backdrop-blur-lg shadow-sm border border-white/30 sm:w-60 w-50 md:w-100 lg:w-100 xl:w-100 max-w-md">
        <Tabs defaultValue="Login" className="items-center w-full">
          <TabsList className="bg-transparent border-1 border-white flex mb-4">
            <TabsTrigger
              value="Login"
              className="text-white bg-transparent data-[state=active]:bg-purple-600 flex-1 text-center"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="Cadastro"
              className="text-white bg-transparent data-[state=active]:bg-purple-600 flex-1 text-center"
            >
              Cadastro
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Login" className="flex flex-col gap-4">
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                placeholder="Email"
                type="email"
                className="text-white w-full"
                autoComplete="email"
                onChange={(e) => handleLoginChange("email", e.target.value)}
                value={login.email}
              />
              <Input
                placeholder="Senha"
                type={mostrar ? "text" : "password"}
                className="text-white w-full"
                autoComplete="current-password"
                onChange={(e) => handleLoginChange("senha", e.target.value)}
                value={login.senha}
              />

              <div className="flex justify-center items-center">
                <div className="flex items-center">
                  <Checkbox
                    id="mostrarSenha"
                    checked={mostrar}
                    onCheckedChange={setMostrar}
                  />
                  <Label htmlFor="mostrarSenha" className="text-white">
                    Mostrar senha
                  </Label>
                </div>
              </div>

              <button
                type="button"
                className="text-sm text-blue-400 underline hover:text-blue-300"
              >
                Esqueceu a senha?
              </button>

              <div className="flex justify-center">
                <Button
                  className="hover:bg-purple-700 hover:text-white text-black bg-white"
                  onClick={handleLogin}
                >
                  Entrar
                </Button>
              </div>
            </form>

            {error && (
              <Alert
                variant="destructive"
                className="mt-4 border-4 border-red-700"
              >
                <Terminal />
                <AlertTitle>{error.title}</AlertTitle>
                <AlertDescription>{error.description}</AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="Cadastro" className="flex flex-col gap-4">
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                placeholder="Nome Completo"
                className="text-white"
                onChange={(e) => handleCadastroChange("nome", e.target.value)}
                value={cadastro.nome}
              />
              <Input
                placeholder="Email"
                type="email"
                className="text-white"
                autoComplete="email"
                onChange={(e) => handleCadastroChange("email", e.target.value)}
                value={cadastro.email}
              />
              <Input
                placeholder="Senha"
                type={mostrarC ? "text" : "password"}
                className="text-white w-full"
                autoComplete="new-password"
                onChange={(e) => handleCadastroChange("senha", e.target.value)}
                value={cadastro.senha}
              />
              <Input
                placeholder="Confirme a senha"
                type={mostrarC ? "text" : "password"}
                className="text-white w-full"
                autoComplete="new-password"
                onChange={(e) =>
                  handleCadastroChange("confirmS", e.target.value)
                }
                value={cadastro.confirmS}
              />
              <Input
                placeholder="CPF"
                className="text-white"
                onChange={(e) => handleCadastroChange("cpf", e.target.value)}
                value={cadastro.cpf}
              />
              <Input
                placeholder="Telefone"
                className="text-white"
                type="text"
                onChange={(e) =>
                  handleCadastroChange("telefone", e.target.value)
                }
                value={cadastro.telefone}
              />
              <Input
                placeholder="Data de nascimento"
                type="date"
                className="text-black appearance-none bg-white"
                onChange={(e) => handleCadastroChange("date", e.target.value)}
                value={cadastro.date}
              />

              <div className="flex gap-2">
                <p className="text-white text-sm">
                  Clicando em "Cadastrar", você concorda com nossos{" "}
                  <button
                    type="button"
                    className="underline text-blue-400"
                    onClick={() => setOpenModal(true)}
                  >
                    Termos
                  </button>{" "}
                  de uso e políticas de privacidade.
                </p>
              </div>

              <div className="flex justify-center">
                <Button
                  className="hover:bg-purple-700 hover:text-white bg-white text-black"
                  onClick={handleCadastro}
                >
                  Cadastrar
                </Button>
              </div>
            </form>

            {cadastroMsg && (
              <Alert
                variant={
                  cadastroMsg.title === "Sucesso" ? "default" : "destructive"
                }
                className={`mt-4 border-4 ${
                  cadastroMsg.title === "Sucesso"
                    ? "border-green-700"
                    : "border-red-700"
                }`}
              >
                <Terminal />
                <AlertTitle>{cadastroMsg.title}</AlertTitle>
                <AlertDescription>{cadastroMsg.description}</AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default MainLogin;
