import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { 
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarInset
} from "@/components/ui/sidebar";
import { Home, Settings, Users, UserPlus, LogOut, CloudSun } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePassaBola = () => {
  const [adminOpen, setAdminOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen">

        {/* Sidebar com fundo escuro */}
        <Sidebar
          side="left"
          variant="sidebar"
          collapsible="offcanvas"
          className="bg-[#1c1c1c] text-white"
        >
          <SidebarHeader className="bg-[#1c1c1c] text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-white text-lg font-bold">PassaBola</h1>
            </div>
          </SidebarHeader>

          <SidebarContent className="bg-[#1c1c1c] text-white">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-white hover:bg-purple-500">
                  <Link to="/adminControlPainel" className="flex items-center gap-2">
                    <Home className="size-4" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-white hover:bg-purple-500">
                  <Link to="/adminControlPainel/eventos" className="flex items-center gap-2">
                    <Users className="size-4" />
                    <span>Eventos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Administração com submenu */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setAdminOpen(!adminOpen)}
                  className="text-white hover:bg-purple-500 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Settings className="size-4" />
                    <span>Administração</span>
                  </div>
                  <span>{adminOpen ? "▲" : "▼"}</span>
                </SidebarMenuButton>

                {adminOpen && (
                  <SidebarMenuSub className="bg-[#1c1c1c]">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="text-white hover:bg-purple-500">
                        <Link to="/adminControlPainel/admin" className="flex items-center gap-2">
                          <UserPlus className="size-4" />
                          <span>Criar Administrador</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="text-white hover:bg-purple-500">
                        <Link to="usuarios" className="flex items-center gap-2">
                          <Users className="size-4" />
                          <span>Acessar Usuários</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to = "clima">
                <SidebarMenuButton className="flex items-center gap-2 text-white hover:bg-purple-500">
                  <CloudSun className="size-4" />   
                  <span>Clima Tempo</span>
                </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              {/* Encerrar sessão */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-white hover:bg-purple-500">
                  <button
                    className="flex items-center gap-2 w-full text-left"
                    onClick={() => {
                      localStorage.setItem("logged?", "false");
                      localStorage.removeItem("loggedUser");
                      navigate("/");
                    }}
                  >
                    <LogOut className="size-4" />
                    <span>Encerrar Sessão</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="bg-[#1c1c1c] text-white" />
        </Sidebar>

        {/* Conteúdo principal */}
        <SidebarInset className="relative flex-1">
          <SidebarTrigger className="absolute top-4 left-4 z-50 bg-[#1c1c1c] hover:bg-purple-500 text-white"/>
          <Outlet />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default HomePassaBola;
