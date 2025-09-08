"use client";

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '@/components/ui/input'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { useNavigate } from "react-router-dom"

const MainLogin = () => {
  const [mostrar, setMostrar] = useState(false)
  const [emailL , setEmailL] = useState("")
  const [senhaL , setSenhaL] = useState("")
  const [error , setError] = useState(null)

  const [emailC , setEmailC] = useState("")
  const [senhaC , setSenhaC] = useState("")
  const [confirmS , setConfirmS] = useState("")
  const [cpf , setCpf] = useState("")
  const [nome , setNome] = useState("")
  const [date , setDate] = useState("")

  const [openModal, setOpenModal] = useState(false)

  const navigate = useNavigate()

  const handleLogin = () => {
    if (localStorage.getItem("users")) {
      const users = JSON.parse(localStorage.getItem("users")) || []
      if (users.length > 0){
        const userExist = users.find(user => user.email === emailL && user.senha === senhaL);
        if(userExist){
          setError(null);
          localStorage.setItem("logged?" ,true)
          navigate("/")
        } else {
          setError({
            title: "Usuário não encontrado",
            description: "Email ou senha incorretos, tente novamente."
          });
        }
      }
    } else {
      setError({
        title: "Erro : Usuários não encontrados",
        description: "Nenhum Usuário foi encontrado , caso ainda não tenha uma conta cadastre-se já"
      })
    }
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="p-4 rounded-xl bg-white/10 backdrop-blur-lg shadow-sm border border-white/30 pr-4 pl-4 sm:w-60 w-50 md:w-100 lg:w-100 xl:w-100 max-w-md">
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
                onChange={(e) => setEmailL(e.target.value)}
              />
              <Input 
                placeholder="Senha" 
                autoComplete="current-password"
                type={mostrar ? "text" : "password"} 
                className="text-white w-full" 
                onChange={(e) => setSenhaL(e.target.value)}
              />
              <div className='flex gap-2 items-center'>
                <Checkbox 
                  id="mostrarSenha"
                  checked={mostrar}
                  onCheckedChange={(checked) => setMostrar(checked)}
                />
                <Label htmlFor="mostrarSenha" className="text-white">Mostrar senha</Label>
              </div>
              <div className='flex justify-center'>
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
            <form className="flex flex-col gap-4">
                <Input placeholder= "Nome Completo"/>
                <Input placeholder= "Email" type="email" className="text-white w-full" autoComplete="email"/>
                <Input placeholder= "Senha" type={mostrar ? "text" : "password"} className="text-white w-full" autoComplete="new-password"/>
                <Input placeholder= "Confirme a senha" type={mostrar ? "text" : "password"} className="text-white w-full" autoComplete="new-password"/>
                <Input placeholder= "CPF"/>
                <Input placeholder= "Data de nascimento" type="date" className="text-black appearance-none bg-white "/>
              <div className='flex gap-2'>
                <p className='text-white text-sm'> 
                  Clicando em "Cadastrar", você concorda com nossos{" "}
                  <button
                    type='button'
                    className="underline text-blue-400"
                    onClick={() => setOpenModal(true)}
                  >
                    Termos
                  </button>{" "}
                  de uso e políticas de privacidade.
                </p>
              </div>
              <div className='flex justify-center'>
                <Button className="hover:bg-purple-700 hover:text-white bg-white text-black">Cadastrar</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>

        {openModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 rounded-xl">
    <div className="bg-gray-900 text-white w-full h-full max-w-6xl max-h-full rounded-md overflow-hidden flex flex-col">
      
      {/* Cabeçalho fixo */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
        <h2 className="text-2xl font-bold">Termos de Uso e Política de Privacidade – Passa Bola</h2>
        <Button className = "bg-white text-black hover:bg-purple-700 hover:text-white"onClick={() => setOpenModal(false)}>x</Button>
      </div>
      
      {/* Conteúdo rolável */}
      <div className="p-6 overflow-y-auto flex-1 flex flex-col space-y-4">
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
      </div>
    </div>
  </div>
)}


      </div>
    </main>
  )
}

export default MainLogin
