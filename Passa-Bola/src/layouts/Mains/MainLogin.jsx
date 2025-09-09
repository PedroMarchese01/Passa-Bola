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
    date: "",
  });
  const [mostrarC, setMostrarC] = useState(false);
  const [cadastroMsg, setCadastroMsg] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const handleLoginChange = (field, value) => setLogin({ ...login, [field]: value });
  const handleCadastroChange = (field, value) => setCadastro({ ...cadastro, [field]: value });

  const validarCPF = (cpf) => {
    let numeros = "";
    for (let i = 0; i < cpf.length; i++) {
      if (cpf[i] >= "0" && cpf[i] <= "9") numeros += cpf[i];
    }
    if (numeros.length !== 11) return false;
    if (/^(\d)\1+$/.test(numeros)) return false;

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
      localStorage.setItem("logged?", "true");
      navigate("/");
    } else {
      setError({
        title: "Usuário não encontrado",
        description: "Email ou senha incorretos, tente novamente.",
      });
    }
  };

  const handleCadastro = () => {
    setCadastroMsg(null);
    const { nome, email, senha, confirmS, cpf, date } = cadastro;

    if (!nome || !email || !senha || !confirmS || !cpf || !date) {
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
    if (users.some((u) => u.email === email)) {
      setCadastroMsg({ title: "Erro", description: "Email já cadastrado." });
      return;
    }
    if (users.some((u) => u.cpf === cpf)) {
      setCadastroMsg({ title: "Erro", description: "CPF já cadastrado." });
      return;
    }

    users.push({ nome, email, senha, cpf, date });
    localStorage.setItem("users", JSON.stringify(users));

    setCadastroMsg({ title: "Sucesso", description: "Cadastro realizado com sucesso!" });
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="p-4 rounded-xl bg-white/10 backdrop-blur-lg shadow-sm border border-white/30 sm:w-60 w-50 md:w-100 lg:w-100 xl:w-100 max-w-md">
        <Tabs defaultValue="Login" className="items-center w-full">
          <TabsList className="bg-transparent border-1 border-white flex mb-4">
            <TabsTrigger value="Login" className="text-white bg-transparent data-[state=active]:bg-purple-600 flex-1 text-center">
              Login
            </TabsTrigger>
            <TabsTrigger value="Cadastro" className="text-white bg-transparent data-[state=active]:bg-purple-600 flex-1 text-center">
              Cadastro
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Login" className="flex flex-col gap-4">
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
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
              <div className="flex gap-2 items-center">
                <Checkbox id="mostrarSenha" checked={mostrar} onCheckedChange={setMostrar} />
                <Label htmlFor="mostrarSenha" className="text-white">Mostrar senha</Label>
              </div>
              <div className="flex justify-center">
                <Button className="hover:bg-purple-700 hover:text-white text-black bg-white" onClick={handleLogin}>
                  Entrar
                </Button>
              </div>
            </form>

            {error && (
              <Alert variant="destructive" className="mt-4 border-4 border-red-700">
                <Terminal />
                <AlertTitle>{error.title}</AlertTitle>
                <AlertDescription>{error.description}</AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="Cadastro" className="flex flex-col gap-4">
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Nome Completo" className="text-white" onChange={(e) => handleCadastroChange("nome", e.target.value)} value={cadastro.nome} />
              <Input placeholder="Email" type="email" className="text-white" autoComplete="email" onChange={(e) => handleCadastroChange("email", e.target.value)} value={cadastro.email} />
              <Input placeholder="Senha" type={mostrarC ? "text" : "password"} className="text-white w-full" autoComplete="new-password" onChange={(e) => handleCadastroChange("senha", e.target.value)} value={cadastro.senha} />
              <Input placeholder="Confirme a senha" type={mostrarC ? "text" : "password"} className="text-white w-full" autoComplete="new-password" onChange={(e) => handleCadastroChange("confirmS", e.target.value)} value={cadastro.confirmS} />
              <Input placeholder="CPF" className="text-white" onChange={(e) => handleCadastroChange("cpf", e.target.value)} value={cadastro.cpf} />
              <Input placeholder="Data de nascimento" type="date" className="text-black appearance-none bg-white" onChange={(e) => handleCadastroChange("date", e.target.value)} value={cadastro.date} />

              <div className="flex gap-2 items-center">
                <Checkbox id="mostrarSenhaCadastro" checked={mostrarC} onCheckedChange={setMostrarC} />
                <Label htmlFor="mostrarSenhaCadastro" className="text-white">Mostrar senha</Label>
              </div>

              <div className="flex gap-2">
                <p className="text-white text-sm">
                  Clicando em "Cadastrar", você concorda com nossos{" "}
                  <button type="button" className="underline text-blue-400" onClick={() => setOpenModal(true)}>Termos</button>{" "} de uso e políticas de privacidade.
                </p>
              </div>

              <div className="flex justify-center">
                <Button className="hover:bg-purple-700 hover:text-white bg-white text-black" onClick={handleCadastro}>Cadastrar</Button>
              </div>

            </form>

            {cadastroMsg && (
              <Alert
                variant={cadastroMsg.title === "Sucesso" ? "default" : "destructive"}
                className={`mt-4 border-4 ${cadastroMsg.title === "Sucesso" ? "border-green-700" : "border-red-700"}`}
              >
                <Terminal />
                <AlertTitle>{cadastroMsg.title}</AlertTitle>
                <AlertDescription>{cadastroMsg.description}</AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>

        {openModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 rounded-xl">
            <div className="bg-gray-900 text-white w-full h-full max-w-6xl max-h-full rounded-md overflow-hidden flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
                <h2 className="text-2xl font-bold">Termos de Uso e Política de Privacidade – Passa Bola</h2>
                <Button className="bg-white text-black hover:bg-purple-700 hover:text-white" onClick={() => setOpenModal(false)}>x</Button>
              </div>
              <div className="p-6 overflow-y-auto flex-1 flex flex-col space-y-4"><div className="flex flex-col space-y-4">
  <div className="flex flex-col space-y-2">
    <strong>1. Aceitação dos Termos</strong>
    <p>Ao se cadastrar ou utilizar os serviços do site Passa Bola, você concorda integralmente com estes Termos de Uso e com nossa Política de Privacidade. Caso não concorde com algum ponto, solicitamos que não utilize os serviços.</p>
  </div>

  <div className="flex flex-col space-y-2">
    <strong>2. Coleta e Uso de Dados Pessoais</strong>
    <p>Os dados fornecidos pelos usuários (como nome, email, data de nascimento, CPF e informações relacionadas aos jogos) serão coletados e utilizados exclusivamente para:</p>
    <ul className="list-disc list-inside ml-4 space-y-1">
      <li>Gerenciamento de participação nos jogos;</li>
      <li>Melhoria da experiência de jogo e da própria marca Passa Bola;</li>
      <li>Cumprimento de obrigações legais, regulatórias ou contratuais.</li>
    </ul>
    <p>Os dados <strong>não serão vendidos, compartilhados ou utilizados para fins comerciais</strong> externos à Passa Bola, exceto nos casos de segurança, investigação de irregularidades ou situações emergenciais relacionadas às jogadoras ou participantes.</p>
  </div>

  <div className="flex flex-col space-y-2">
    <strong>3. Responsabilidade pelo Conteúdo e Atividades</strong>
    <p>O site Passa Bola fornece informações e acesso a jogos, mas <strong>não se responsabiliza por incidentes, acidentes ou danos</strong> que ocorram fora da supervisão direta da plataforma, incluindo atividades físicas nas quadras.</p>
    <p>Os usuários são responsáveis pelo uso adequado da plataforma e por respeitar normas de conduta dentro dos jogos.</p>
  </div>

  <div className="flex flex-col space-y-2">
    <strong>4. Direitos dos Usuários (LGPD)</strong>
    <p>Você tem direito de acessar, corrigir ou solicitar a exclusão de seus dados pessoais.</p>
    <p>É garantido o direito de revogar consentimento para o uso de dados pessoais a qualquer momento, mediante contato com a empresa.</p>
    <p>A Passa Bola adota medidas de segurança para proteger seus dados, mas não se responsabiliza por falhas externas ou uso indevido por terceiros fora de sua plataforma.</p>
  </div>

  <div className="flex flex-col space-y-2">
    <strong>5. Limitação de Responsabilidade</strong>
    <ul className="list-disc list-inside ml-4 space-y-1">
      <li>Danos diretos, indiretos ou incidentais que possam ocorrer devido à participação nos jogos;</li>
      <li>Perdas de dados causadas por mau uso, erros de dispositivo ou falhas externas;</li>
      <li>Ações de terceiros fora do ambiente controlado pelo site.</li>
    </ul>
  </div>

  <div className="flex flex-col space-y-2">
    <strong>6. Modificações dos Termos</strong>
    <p>A Passa Bola se reserva o direito de alterar estes termos a qualquer momento, sendo recomendável que os usuários consultem regularmente esta página. O uso contínuo da plataforma após alterações constitui aceitação dos novos termos.</p>
  </div>

  <div className="flex flex-col space-y-2">
    <strong>7. Contato</strong>
    <p>Para questões relacionadas à privacidade ou solicitação de direitos sobre seus dados, entre em contato conosco pelo email: <strong>contato@passabola.com.br</strong>.</p>
  </div>
</div></div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default MainLogin;
