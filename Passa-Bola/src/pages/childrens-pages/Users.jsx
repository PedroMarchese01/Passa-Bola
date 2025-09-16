"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Save, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const UsersAdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const editRef = useRef(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const fixedUsers = storedUsers.map((u) => ({
      ...u,
      nome: u.nome || u.usuario || "",
    }));
    setUsers(fixedUsers);
  }, []);

  const saveLocal = (data) => localStorage.setItem("users", JSON.stringify(data));

  const deleteUser = (index) => {
    const updated = [...users];
    updated.splice(index, 1);
    setUsers(updated);
    saveLocal(updated);
    if (editingIndex === index) cancelEdit();
  };

  const startEdit = (index) => setEditingIndex(index);
  const cancelEdit = () => setEditingIndex(null);

  const saveEdit = (index, updatedItem) => {
    const updated = [...users];
    updated[index] = updatedItem;
    setUsers(updated);
    saveLocal(updated);
    cancelEdit();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editRef.current && !editRef.current.contains(e.target)) cancelEdit();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterData = (list) =>
    list.filter((item) =>
      Object.values(item).some((val) => String(val).toLowerCase().includes(search.toLowerCase()))
    );

  const normalUsers = filterData(users)
    .map((user) => ({ ...user, _realIndex: users.indexOf(user) }))
    .filter((u) => !u.admin);

  const admins = filterData(users)
    .map((user) => ({ ...user, _realIndex: users.indexOf(user) }))
    .filter((u) => u.admin);

  const renderTable = (list, isAdminTable = false) => (
    <div className="hidden md:block overflow-hidden rounded-lg shadow-lg">
      <Table className="min-w-full bg-[#1f1f1f] border border-gray-700 rounded-lg">
        <TableHeader>
          <TableRow className="bg-[#2a2a2a]">
            <TableHead className="text-white px-4 py-2">Nome</TableHead>
            <TableHead className="text-white px-4 py-2">Email</TableHead>
            <TableHead className="text-white px-4 py-2">CPF</TableHead>
            <TableHead className="text-white px-4 py-2">Telefone</TableHead>
            <TableHead className="text-white px-4 py-2">Data Nasc.</TableHead>
            <TableHead className="text-white px-4 py-2 text-center">Admin</TableHead>
            <TableHead className="text-white px-4 py-2">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((user) => {
            const realIndex = user._realIndex;
            const isEditing = editingIndex === realIndex;
            return (
              <TableRow
                key={realIndex}
                className={`transition-colors ${
                  isAdminTable
                    ? "bg-[#3c2cc3] bg-opacity-20 hover:bg-[#5b3ce2] hover:bg-opacity-30"
                    : "hover:bg-[#5b3ce2] hover:bg-opacity-20"
                }`}
              >
                {["nome", "email", "cpf", "telefone", "date"].map((field, i) => (
                  <TableCell key={i} className="text-white px-4 py-2">
                    {isEditing ? (
                      <Input
                        ref={editRef}
                        autoFocus
                        value={user[field] || ""}
                        onChange={(e) => {
                          const updated = [...users];
                          updated[realIndex][field] = e.target.value;
                          setUsers(updated);
                        }}
                        onKeyDown={(e) => e.key === "Escape" && cancelEdit()}
                        className="bg-[#2c2c2c] text-white"
                      />
                    ) : (
                      user[field] || ""
                    )}
                  </TableCell>
                ))}
                <TableCell className="text-white px-4 py-2 text-center">{user.admin ? "Sim" : "Não"}</TableCell>
                <TableCell className="flex gap-2 px-4 py-2">
                  {isEditing ? (
                    <>
                      <Button variant="ghost" className="text-white hover:text-[#9b59b6]" onClick={() => saveEdit(realIndex, users[realIndex])}>
                        <Save />
                      </Button>
                      <Button variant="ghost" className="text-white hover:text-[#e74c3c]" onClick={cancelEdit}>
                        <X />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" className="text-white hover:text-[#9b59b6]" onClick={() => startEdit(realIndex)}>
                        <Edit />
                      </Button>
                      <Button variant="ghost" className="text-white hover:text-[#e74c3c]" onClick={() => deleteUser(realIndex)}>
                        <Trash />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );

  const renderCards = (list, isAdminTable = false) => (
    <div className="md:hidden grid gap-4">
      {list.map((user) => {
        const realIndex = user._realIndex;
        const isEditing = editingIndex === realIndex;
        return (
          <div key={realIndex} className="bg-[#1f1f1f] p-4 rounded-lg shadow hover:shadow-lg transition">
            {["nome", "email", "cpf", "telefone", "date"].map((field) => (
              <div key={field} className="flex justify-between mb-2">
                <span className="text-gray-400 capitalize">{field.replace("date", "Data Nasc.")}:</span>
                {isEditing ? (
                  <Input
                    ref={editRef}
                    autoFocus={field === "nome"}
                    value={user[field] || ""}
                    onChange={(e) => {
                      const updated = [...users];
                      updated[realIndex][field] = e.target.value;
                      setUsers(updated);
                    }}
                    onKeyDown={(e) => e.key === "Escape" && cancelEdit()}
                    className="bg-[#2c2c2c] text-white w-1/2"
                  />
                ) : (
                  <span className="text-white">{user[field] || ""}</span>
                )}
              </div>
            ))}
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Admin:</span>
              <span className="text-white">{user.admin ? "Sim" : "Não"}</span>
            </div>
            <div className="flex gap-2 justify-end">
              {isEditing ? (
                <>
                  <Button variant="ghost" className="text-white hover:text-[#9b59b6]" onClick={() => saveEdit(realIndex, users[realIndex])}>
                    <Save />
                  </Button>
                  <Button variant="ghost" className="text-white hover:text-[#e74c3c]" onClick={cancelEdit}>
                    <X />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="text-white hover:text-[#9b59b6]" onClick={() => startEdit(realIndex)}>
                    <Edit />
                  </Button>
                  <Button variant="ghost" className="text-white hover:text-[#e74c3c]" onClick={() => deleteUser(realIndex)}>
                    <Trash />
                  </Button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="p-6 bg-[#121212] min-h-screen sm:p-4">
      <h1 className="text-2xl font-bold text-white mb-6 text-center sm:text-left">
        Painel de Usuários e Administradores
      </h1>

      <Input
        placeholder="Pesquisar por qualquer dado..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full sm:max-w-md bg-[#2c2c2c] text-white placeholder-gray-400"
      />

      <h2 className="text-xl font-semibold text-white mb-2">Administradores</h2>
      {renderTable(admins, true)}
      {renderCards(admins, true)}

      <h2 className="text-xl font-semibold text-white mb-2">Usuários</h2>
      {renderTable(normalUsers)}
      {renderCards(normalUsers)}
    </div>
  );
};

export default UsersAdminPanel;
