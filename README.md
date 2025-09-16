# 🚀 Projeto PassaBola - Sistema de Gerenciamento de Eventos

## 📌 Sobre o Projeto

Este é um projeto de aplicação web completa, focado na criação de um **Sistema de Gerenciamento de Eventos Esportivos**. A plataforma, chamada "PassaBola", permite a administração de usuários, a criação e gestão de jogos mensais e campeonatos, e a visualização de dados analíticos através de um painel de controle robusto.

O objetivo principal é demonstrar a aplicação de tecnologias modernas de front-end para construir uma aplicação dinâmica, interativa e funcional, utilizando React e seu ecossistema.


## ✨ Funcionalidades Principais

O sistema é dividido em duas grandes áreas: o Painel Administrativo e a Área Pública para usuários.

### Painel Administrativo
- **Dashboard de Analytics:** Gráficos e cartões que exibem dados cruciais como número de usuários, total de eventos, inscrições, percentual de participação e total de acessos ao site.
- **Gerenciamento de Eventos:**
    - Criação, edição e exclusão de dois tipos de eventos: **Jogos Mensais** (com limite de inscritos) e **Campeonatos**.
    - Sistema de **geração automática de chaves (brackets)** para os campeonatos com base nos usuários inscritos.
- **Gerenciamento de Usuários:**
    - Visualização de todos os usuários e administradores cadastrados em tabelas e cards responsivos.
    - Funcionalidades de editar, excluir e pesquisar usuários.
    - Formulário dedicado para o cadastro de novas contas de administrador.
- **Consulta de Clima:** Ferramenta integrada que consome uma API externa para exibir a previsão do tempo em diversas localidades, auxiliando no planejamento dos eventos.

### Área Pública
- **Home:** Página inicial da aplicação, que também contabiliza o número de acessos.
- **Login:** Sistema de autenticação para acesso às áreas restritas da plataforma.
- **Páginas de Conteúdo:** Seções como `Jogos`, `Campeonatos`, `Sobre` e `Contato` para interação do usuário final.

## 🎨 Tecnologias e Ferramentas

- **Linguagem & Biblioteca Principal:** JavaScript (ES6+) e **React.js**.
- **Roteamento:** `react-router-dom` para navegação entre as páginas.
- **Estilização:** **Tailwind CSS** para a criação de um layout moderno, customizável e responsivo.
- **Componentes de UI:** Biblioteca **Shadcn/UI** (reutilizando componentes como `Card`, `Button`, `Input`, `Alert`, `Table` e `Sidebar`).
- **Gráficos:** `Chart.js` com a biblioteca `react-chartjs-2` para a visualização de dados no painel de analytics.
- **Ícones:** `lucide-react`.
- **Armazenamento de Dados:** Utilização do `localStorage` e `sessionStorage` do navegador para simular a persistência de dados de usuários, eventos e sessões.

## ⚙️ Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [URL-DO-SEU-REPOSITORIO]
    ```
2.  **Acesse o diretório do projeto:**
    ```bash
    cd [NOME-DA-PASTA-DO-PROJETO]
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
5.  Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada no terminal).

## 🔎 Detalhamento das Páginas

O projeto é estruturado em duas áreas principais: a **Área Pública**, acessível a todos os visitantes, e o **Painel de Controle do Administrador**, uma área segura para gerenciamento.

### 1. Área Pública

Estas são as páginas que um visitante comum pode acessar.

#### **`Home.js` - Página Principal**
- **Propósito:** É a porta de entrada do site, a primeira página que o visitante vê.
- **Funcionalidades:**
    - Apresenta o projeto e serve como ponto de partida para a navegação.
    - **Contador de Acessos:** Possui uma lógica que incrementa um "total de acessos" no `localStorage` apenas uma vez por sessão do navegador (`sessionStorage`), garantindo dados mais precisos para o painel de `Analytics`.

#### **`Login.js` - Página de Login**
- **Propósito:** Servir como portal de autenticação para que administradores acessem o painel de controle.
- **Funcionalidades:**
    - Exibe um formulário para inserção de email e senha, protegendo o acesso à área administrativa.

#### **`Jogos.js` e `Campeonatos.js`**
- **Propósito:** Exibir os eventos criados pelos administradores para o público.
- **Funcionalidades:**
    - `Jogos.js` lista os "Jogos Mensais" disponíveis.
    - `Campeonatos.js` exibe o campeonato ativo, mostrando informações como participantes e chaves.

#### **`Sobre.js` e `Contato.js`**
- **Propósito:** Fornecer informações institucionais sobre o projeto.
- **Funcionalidades:**
    - **`Sobre.js`**: Apresenta a descrição do projeto PassaBola.
    - **`Contato.js`**: Exibe informações de contato.

---

### 2. Painel de Controle do Administrador

Esta é a área logada onde todo o gerenciamento da plataforma acontece.

#### **`HomePassaBola.js` - Layout Principal do Painel**
- **Propósito:** É o "molde" ou "template" que envolve todas as telas do painel administrativo.
- **Funcionalidades:**
    - **Sidebar de Navegação:** Contém o menu lateral com links para todas as seções do painel.
    - **Botão de Logout:** Inclui a lógica para encerrar a sessão do administrador.
    - **Renderização de Conteúdo:** Utiliza o componente `<Outlet>` para exibir o conteúdo da página selecionada no menu.

#### **`Analytics.js` - Painel de Análise (Dashboard)**
- **Propósito:** Fornecer uma visão geral e visual dos dados mais importantes da plataforma.
- **Funcionalidades:**
    - **Métricas Principais:** Exibe em cartões os números totais de acessos, usuários, eventos e inscrições.
    - **Gráficos (DataViz):** Utiliza `Chart.js` para criar gráficos que mostram a proporção de usuários vs. administradores e o percentual de participação em eventos.

#### **`Events.js` - Gerenciamento de Eventos**
- **Propósito:** Ferramenta completa para o controle total sobre os eventos.
- **Funcionalidades:**
    - **CRUD de Eventos:** Permite Criar, Ler, Atualizar e Deletar eventos.
    - **Tipos de Evento:** O formulário se adapta para "Jogos Mensais" (vagas limitadas) ou "Campeonatos" (datas de início e fim).
    - **Gerador de Chaves (Brackets):** Com um clique, embaralha os inscritos de um campeonato e gera automaticamente as rodadas e partidas do torneio.

#### **`UsersAdminPanel.js` - Painel de Usuários**
- **Propósito:** Controlar todas as contas cadastradas no sistema.
- **Funcionalidades:**
    - **Listagem Otimizada:** Mostra tabelas separadas para "Administradores" e "Usuários".
    - **Design Responsivo:** Exibe os dados em uma tabela em telas grandes e em "cards" no mobile.
    - **Ações de Gerenciamento:** Oferece busca, filtro, edição e exclusão de usuários.

#### **`CadastroAdministradora.js` - Cadastro de Administrador**
- **Propósito:** Formulário específico para criar novas contas de administrador.
- **Funcionalidades:**
    - **Validação:** Garante que todos os campos sejam preenchidos corretamente.
    - **Verificação de Duplicidade:** Impede que um mesmo email seja cadastrado duas vezes.

#### **`Clima.js` - Previsão do Tempo**
- **Propósito:** Ferramenta de utilidade para ajudar no planejamento dos eventos.
- **Funcionalidades:**
    - **Integração com API Externa:** Busca dados em tempo real da API `open-meteo.com`.
    - **Seleção de Localidade:** Permite escolher entre capitais pré-definidas ou inserir coordenadas personalizadas.
    - **Visualização Horária:** Exibe a previsão para as próximas horas e dias em um carrossel de cards.

## 👥 Integrantes

* Gustavo Neres Dos Santos - RM561785
* Rafaell Santiago Martins Da Silva - RM563486
* Pedro Marchese - RM563339
* Enzo Augusto - RM562249