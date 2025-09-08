import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '@/components/ui/input'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const MainLogin = () => {
  const [mostrar, setMostrar] = useState(false)

  return (
    <main className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md p-4 rounded-xl bg-white/10 backdrop-blur-lg shadow-sm border border-white/30">
        <Tabs defaultValue="Login" className="w-full">
          <TabsList className="bg-transparent border-1 border-white flex">
            <TabsTrigger value="Login" className="text-white bg-transparent data-[state=active]:bg-purple-600 flex-1 text-center">
              Login
            </TabsTrigger>
            <TabsTrigger value="Cadastro" className="text-white bg-transparent data-[state=active]:bg-purple-600 flex-1 text-center">
              Cadastro
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Login" className="flex flex-col gap-4">
            <form className="flex flex-col gap-4">
              <Input placeholder="Email" type="email" className="text-white w-full" autoComplete="email"/>
              <Input placeholder="Senha" type={mostrar ? "text" : "password"} className="text-white w-full" autoComplete="current-password"/>
              <div className='flex gap-2 items-center'>
                <Checkbox 
                  id="mostrarSenha"
                  checked={mostrar}
                  onCheckedChange={(checked) => setMostrar(checked)}
                />
                <Label htmlFor="mostrarSenha" className="text-white">Mostrar senha</Label>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="Cadastro" className="flex flex-col gap-4">
            <form className="flex flex-col gap-4">
              <Input placeholder="Email" type="email" className="text-white w-full" autoComplete="email"/>
              <Input placeholder="Senha" type={mostrar ? "text" : "password"} className="text-white w-full" autoComplete="new-password"/>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

export default MainLogin