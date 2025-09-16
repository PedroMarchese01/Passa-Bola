import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
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
  SidebarMenuSub
} from "@/components/ui/sidebar";
import { Home, Settings, Users, UserPlus, LogOut, CloudSun } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePassaBola = () => {
  const [adminOpen, setAdminOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Fecha a sidebar quando a rota muda
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <SidebarProvider defaultOpen={sidebarOpen}>
      <div className="flex h-screen w-screen overflow-hidden relative">

        {/* Sidebar */}
        <Sidebar
          side="left"
          variant="sidebar"
          collapsible="offcanvas"
          open={sidebarOpen}
          className={`bg-[#1c1c1c] text-white transition-all duration-300 flex-shrink-0`}
        >
          <SidebarHeader className="bg-[#1c1c1c] text-white">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-white text-lg font-bold">PassaBola</h1>
            </div>
          </SidebarHeader>

          <SidebarContent className="bg-[#1c1c1c] text-white">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-white hover:bg-purple-500" onClick={() => setSidebarOpen(false)}>
                  <Link to="/adminControlPainel" className="flex items-center gap-2 p-2">
                    <Home className="size-4" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-white hover:bg-purple-500" onClick={() => setSidebarOpen(false)}>
                  <Link to="/adminControlPainel/eventos" className="flex items-center gap-2 p-2">
                    <Users className="size-4" />
                    <span>Eventos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setAdminOpen(!adminOpen)}
                  className="text-white hover:bg-purple-500 flex items-center justify-between p-2"
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
                      <SidebarMenuButton asChild className="text-white hover:bg-purple-500 p-2" onClick={() => setSidebarOpen(false)}>
                        <Link to="/adminControlPainel/admin" className="flex items-center gap-2">
                          <UserPlus className="size-4" />
                          <span>Criar Administrador</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="text-white hover:bg-purple-500 p-2" onClick={() => setSidebarOpen(false)}>
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
                <SidebarMenuButton asChild className="text-white hover:bg-purple-500 p-2" onClick={() => setSidebarOpen(false)}>
                  <Link to="clima" className="flex items-center gap-2">
                    <CloudSun className="size-4" />
                    <span>Clima Tempo</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-white hover:bg-purple-500 p-2">
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

          <SidebarFooter className="bg-[#1c1c1c] text-white p-4" />
        </Sidebar>

        {/* Conteúdo principal flexível */}
        <div
          className={`flex-1 h-screen overflow-auto transition-all duration-300`}
          style={{ maxWidth: "100%" }}
        >
          <SidebarTrigger
            className="fixed top-4 left-0 z-50 bg-[#1c1c1c] hover:bg-purple-500 text-white p-2 rounded-r shadow-md"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
          <div className="w-full h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default HomePassaBola;
