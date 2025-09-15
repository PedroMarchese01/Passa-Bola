import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Save, X } from "lucide-react";

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [busca, setBusca] = useState("");
  const [editando, setEditando] = useState({ tipo: null, index: null });

  // Carrega do localStorage
  useEffect(() => {
    const armazenadosUsuarios = JSON.parse(localStorage.getItem("users")) || [];
    const armazenadosAdmins = JSON.parse(localStorage.getItem("admins")) || [];
    setUsuarios(armazenadosUsuarios);
    setAdmins(armazenadosAdmins);
  }, []);

  // Filtragem por nome/usuário OU email
  const filtradosUsuarios = usuarios.filter(
    (u) =>
      u.usuario?.toLowerCase().includes(busca.toLowerCase()) ||
      u.email?.toLowerCase().includes(busca.toLowerCase())
  );

  const filtradosAdmins = admins.filter(
    (a) =>
      a.usuario?.toLowerCase().includes(busca.toLowerCase()) ||
      a.email?.toLowerCase().includes(busca.toLowerCase())
  );

  // Salvar no localStorage
  const salvarLocal = (tipo, data) => {
    localStorage.setItem(tipo, JSON.stringify(data));
  };

  // Excluir admin
  const handleDeletarAdmin = (usuario) => {
    const atualizados = admins.filter((a) => a.usuario !== usuario);
    setAdmins(atualizados);
    salvarLocal("admins", atualizados);
  };

  // Excluir usuária
  const handleDeletarUsuario = (usuario) => {
    const atualizados = usuarios.filter((u) => u.usuario !== usuario);
    setUsuarios(atualizados);
    salvarLocal("users", atualizados);
  };

  // Iniciar edição
  const handleEditar = (tipo, index) => {
    setEditando({ tipo, index });
  };

  // Cancelar edição
  const handleCancelar = () => {
    setEditando({ tipo: null, index: null });
  };

  // Salvar edição
  const handleSalvar = (tipo, index, novoValor) => {
    if (tipo === "admins") {
      const atualizados = [...admins];
      atualizados[index] = novoValor;
      setAdmins(atualizados);
      salvarLocal("admins", atualizados);
    } else {
      const atualizados = [...usuarios];
      atualizados[index] = novoValor;
      setUsuarios(atualizados);
      salvarLocal("users", atualizados);
    }
    setEditando({ tipo: null, index: null });
  };

  return (
    <div className="h-screen w-screen bg-[#1c1c1c] flex flex-col items-center p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Usuárias e Administradoras</h1>

      {/* Campo de busca */}
      <Input
        placeholder="Pesquisar por nome de usuário ou email..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="bg-[#2c2c2c] text-white placeholder-gray-400 max-w-md mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Card de Usuárias */}
        <div className="bg-[#2c2c2c] p-6 rounded-2xl border border-gray-700 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Usuárias Cadastradas</h2>
          <div className="flex flex-col gap-3">
            {filtradosUsuarios.length > 0 ? (
              filtradosUsuarios.map((u, idx) => {
                const indexOriginal = usuarios.findIndex((x) => x.usuario === u.usuario);
                const editandoEste = editando.tipo === "usuarios" && editando.index === indexOriginal;

                return (
                  <div
                    key={idx}
                    className="bg-[#1c1c1c] p-4 rounded-xl flex justify-between items-center border border-gray-700"
                  >
                    {editandoEste ? (
                      <div className="flex flex-col flex-1 mr-3">
                        <Input
                          value={u.usuario}
                          onChange={(e) => {
                            const atualizado = [...usuarios];
                            atualizado[indexOriginal].usuario = e.target.value;
                            setUsuarios(atualizado);
                          }}
                          className="bg-[#2c2c2c] text-white mb-2"
                        />
                        <Input
                          value={u.email}
                          onChange={(e) => {
                            const atualizado = [...usuarios];
                            atualizado[indexOriginal].email = e.target.value;
                            setUsuarios(atualizado);
                          }}
                          className="bg-[#2c2c2c] text-white"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span className="text-white">{u.usuario}</span>
                        <span className="text-gray-400 text-sm">{u.email}</span>
                      </div>
                    )}
                    <div className="flex gap-3">
                      {editandoEste ? (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:text-purple-500 hover:bg-white/10"
                            onClick={() => handleSalvar("usuarios", indexOriginal, u)}
                          >
                            <Save className="w-5 h-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:text-purple-500 hover:bg-white/10"
                            onClick={handleCancelar}
                          >
                            <X className="w-5 h-5" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:text-purple-500 hover:bg-white/10"
                            onClick={() => handleEditar("usuarios", indexOriginal)}
                          >
                            <Edit className="w-5 h-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:text-purple-500 hover:bg-white/10"
                            onClick={() => handleDeletarUsuario(u.usuario)}
                          >
                            <Trash className="w-5 h-5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-400">Nenhuma usuária encontrada.</p>
            )}
          </div>
        </div>

        {/* Card de Administradoras */}
        <div className="bg-[#2c2c2c] p-6 rounded-2xl border border-gray-700 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Administradoras Cadastradas</h2>
          <div className="flex flex-col gap-3">
            {filtradosAdmins.length > 0 ? (
              filtradosAdmins.map((a, idx) => {
                const indexOriginal = admins.findIndex((x) => x.usuario === a.usuario);
                const editandoEste = editando.tipo === "admins" && editando.index === indexOriginal;

                return (
                  <div
                    key={idx}
                    className="bg-[#1c1c1c] p-4 rounded-xl flex justify-between items-center border border-gray-700"
                  >
                    {editandoEste ? (
                      <div className="flex flex-col flex-1 mr-3">
                        <Input
                          value={a.usuario}
                          onChange={(e) => {
                            const atualizado = [...admins];
                            atualizado[indexOriginal].usuario = e.target.value;
                            setAdmins(atualizado);
                          }}
                          className="bg-[#2c2c2c] text-white mb-2"
                        />
                        <Input
                          value={a.email}
                          onChange={(e) => {
                            const atualizado = [...admins];
                            atualizado[indexOriginal].email = e.target.value;
                            setAdmins(atualizado);
                          }}
                          className="bg-[#2c2c2c] text-white"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span className="text-white">{a.usuario}</span>
                        <span className="text-gray-400 text-sm">{a.email}</span>
                      </div>
                    )}
                    <div className="flex gap-3">
                      {editandoEste ? (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:text-purple-500 hover:bg-white/10"
                            onClick={() => handleSalvar("admins", indexOriginal, a)}
                          >
                            <Save className="w-5 h-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:text-purple-500 hover:bg-white/10"
                            onClick={handleCancelar}
                          >
                            <X className="w-5 h-5" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:text-purple-500 hover:bg-white/10"
                            onClick={() => handleEditar("admins", indexOriginal)}
                          >
                            <Edit className="w-5 h-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:text-purple-500 hover:bg-white/10"
                            onClick={() => handleDeletarAdmin(a.usuario)}
                          >
                            <Trash className="w-5 h-5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-400">Nenhuma administradora encontrada.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;