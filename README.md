<table align="center" border="0" style="border:0;">
  <tr>
    <td>
      <img src="https://i.postimg.cc/NGWntpMc/Logo-Horizontal.png" alt="Logo do NotaGest" width="220"/>
    </td>
    <td>
      <h1>NotaGest — Sistema de Gerenciamento de Notas Fiscais</h1>
    </td>
  </tr>
</table>

<p align="center">
  Plataforma completa para o armazenamento, controle, análise e exportação de notas fiscais de construção e reforma.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.2.4-black?style=flat&logo=next.js" alt="Next.js Badge"/>
  <img src="https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react&logoColor=black" alt="React Badge"/>
  <img src="https://img.shields.io/badge/Express-5.1.0-4CAF50?style=flat&logo=express&logoColor=white" alt="Express Badge"/>
  <img src="https://img.shields.io/badge/MongoDB-8.19.2-4DB33D?style=flat&logo=mongodb&logoColor=white" alt="MongoDB Badge"/>
  <img src="https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript Badge"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS Badge"/>
  <img src="https://img.shields.io/badge/Docker-Enabled-2496ED?style=flat&logo=docker&logoColor=white" alt="Docker Badge"/>
  <img src="https://img.shields.io/badge/Better_Stack-Observability-00E5FF?style=flat&logo=statuspage" alt="Better Stack Badge"/>
  <img src="https://img.shields.io/badge/Sonar_Cloud-DevSecOps-F3702A?style=flat&logo=sonarcloud" alt="Sonar Cloud Badge"/>
</p>

---

## 🏗️ Sobre o Projeto

O **NotaGest** é um sistema inovador voltado ao **gerenciamento digital de notas fiscais relacionadas à construção e reforma de imóveis**, oferecendo uma plataforma completa que permite a **organização, controle e consulta rápida de documentos fiscais** de maneira prática.  

A plataforma possibilita aos usuários o **cadastro detalhado de imóveis**, o **envio e armazenamento de imagens das notas fiscais**, a **geração de relatórios em PDF** e a **exportação de dados em Excel**, garantindo que toda a documentação esteja sempre organizada e acessível. Com isso, o sistema **reduz significativamente o uso de papel**, promovendo uma gestão mais sustentável e eficiente.  

Além disso, o NotaGest foi desenvolvido pensando em diferentes perfis de usuários: desde **proprietários e administradores de imóveis**, até **empresas de construção e profissionais autônomos**, proporcionando uma **interface intuitiva**, **navegação simplificada** e funcionalidades voltadas à **facilidade de uso e agilidade na tomada de decisões**.  

O sistema também contribui para a **regularização de obras e reformas junto a órgãos públicos**, oferecendo suporte para **declarações fiscais**, **auditorias internas** e **consultas rápidas sobre despesas e investimentos em cada imóvel**.  

> 💡 O projeto foi desenvolvido no curso de **Desenvolvimento de Software Multiplataforma (DSM)** da **FATEC Votorantim**, integrando conceitos de front-end, back-end e banco de dados. A ideia é criar uma solução prática e moderna que atenda às necessidades reais do mercado de construção civil, trazendo **eficiência, organização e confiabilidade** para o gerenciamento de documentos fiscais.

---

## ⚙️ Arquitetura do Projeto

O sistema foi unificado e estruturado de forma otimizada para a versão **4.0**. O microsserviço de autenticação existente nas versões anteriores foi completamente **absorvido e integrado ao Backend Principal**, centralizando a regra de negócios, melhorando a performance e simplificando a orquestração de serviços.

A comunicação entre a interface do usuário e o servidor é realizada por meio de uma **API RESTful** segura.

| Módulo | Descrição | Principais Tecnologias |
|:--------|:-----------|:------------------------|
| **Frontend (NotaGest-TypeScript)** | Interface web interativa onde o usuário gerencia imóveis, faz upload de recibos, visualiza dashboards de gastos e gera relatórios. | Next.js 15, React 19, TypeScript, Tailwind CSS v4, Storybook, Recharts |
| **Backend (NotaGest-Express)** | API centralizada responsável pelas regras de negócio, autenticação (JWT), upload de arquivos, integração de IA e logs de observabilidade. | Node.js, Express 5, TypeScript, MongoDB (Mongoose), Google Gemini AI, Multer, bcryptjs |

---

## 📘 Diagrama de Casos de Uso

<p align="center">
  <img src="https://i.postimg.cc/R0hGcxDF/Diagrama-de-caso-de-uso.png" alt="Diagrama de Caso de Uso do NotaGest" width="600"/>
</p>

---

## 💡 Funcionalidades e Requisitos

O **NotaGest** foi desenvolvido com foco em **eficiência, organização e facilidade de uso**, atendendo tanto a usuários individuais quanto a empresas do setor de construção civil.

### Requisitos Funcionais

#### 💻 Frontend (Interface)
- **Autenticação Avançada:** Permitir autenticação de usuários (registro, login com validação e permanência de sessão segura).
- **Gestão de Imóveis:** Permitir o cadastro, edição e exclusão de imóveis com dados detalhados.
- **Upload Inteligente:** Realizar upload de notas fiscais e recibos em formato de imagem, com integração para visualização.
- **Dashboard Financeiro:** Exibir gráficos interativos detalhados de despesas e investimentos gerados via **Recharts**.
- **Exportação de Relatórios:** Possibilitar a geração de relatórios estilizados em **PDF** (via jsPDF e jsPDF-AutoTable) e a exportação de dados consolidados em planilhas **Excel (.xlsx)**.

#### ⚙️ Backend (Servidor)
- **API RESTful:** Disponibilizar endpoints limpos e tipados para todas as entidades (Usuários, Imóveis, Notas Fiscais).
- **Segurança de Rotas (JWT):** Implementar middleware de autenticação via token JWT para proteção de rotas privadas.
- **Criptografia Robustecida:** Criptografia de senhas utilizando a biblioteca **bcryptjs**.
- **Upload de Arquivos:** Upload físico e gerenciamento de arquivos com **Multer**.
- **Integração de Inteligência Artificial:** Integração ativa com o **Google Gemini AI** (`@google/generative-ai`) para futuras análises fiscais inteligentes.
- **Documentação de Rotas (Swagger):** API documentada de forma viva e interativa usando **Swagger UI Express** e **Swagger JSDoc**.
- **Observabilidade em Tempo Real:** Middleware interceptor integrado com **Better Stack** para monitoramento de rotas e alertas automáticos de instabilidade.

### Requisitos Não Funcionais

- **Usabilidade & Estética:** Interface altamente intuitiva, responsiva e moderna desenvolvida com **Next.js 15**, **Tailwind CSS v4** e animações dinâmicas (**AOS**).
- **Desempenho Elevado:** Requisições assíncronas otimizadas e carregamento dinâmico no frontend.
- **Segurança:** Proteção de dados sensíveis na comunicação HTTPS, validação rigorosa de payloads (`express-validator`) e sanitização de dados.
- **Alta Disponibilidade & Observabilidade:** Monitoramento do backend para alertas imediatos de picos de tráfego, erros HTTP ou lentidão acima de 1 segundo.
- **DevSecOps:** Garantia de qualidade contínua com análise estática de código automatizada nas Sprints via GitHub Actions e **Sonar Cloud**.

---

## 🛠️ Guia de Instalação e Execução (Passo a Passo)

Siga os passos abaixo para baixar, configurar e rodar o ecossistema completo do NotaGest localmente.

### 📋 Pré-requisitos
Certifique-se de ter instalado em sua máquina:
1. **Git** (para clonar os repositórios)
2. **Docker Desktop** (Altamente recomendado para rodar o ecossistema unificado)
3. **Node.js** (versão 20 ou superior, caso queira rodar manualmente sem Docker)

---

### Passo 1: Clonar os Repositórios
Crie uma pasta principal para o projeto (ex: `NotaGest_4.0`) e, dentro dela, abra o terminal e execute os comandos para clonar o frontend e o backend no mesmo nível de diretório:

```bash
# Clonar o repositório do Backend
git clone https://github.com/AnaLauraMS/Backend_NotaGest_4.0.git Backend_NotaGest_4.0

# Clonar o repositório do Frontend
git clone https://github.com/AnaLauraMS/Frontend_NotaGest_4.0.git Frontend_NotaGest_4.0
```

Seus diretórios devem ficar estruturados da seguinte forma:
```text
NotaGest_4.0/
├── Backend_NotaGest_4.0/ (Contém a API principal e o docker-compose.yml)
├── Frontend_NotaGest_4.0/ (Contém a interface do Next.js)
```

---

### Passo 2: Configuração das Variáveis de Ambiente (`.env`)

#### 🔧 Configurando o Backend
Entre na pasta `Backend_NotaGest_4.0`, crie um arquivo `.env` baseado no `.env.example` e preencha as variáveis correspondentes:

```bash
cd Backend_NotaGest_4.0
cp .env.example .env
```

| Variável | Descrição / Valor Recomendado |
|:---|:---|
| `PORT` | Porta de escuta da API (Padrão: `5000`) |
| `MONGO_URI` | URI de conexão com o MongoDB. Se for rodar pelo Docker Compose local, utilize: `mongodb://mongodb:27017/notagest` |
| `JWT_SECRET` | Uma string secreta e segura para assinar os tokens de autenticação |
| `GEMINI_API_KEY` | Sua chave de API obtida no Google AI Studio para os recursos de Inteligência Artificial |
| `BETTERSTACK_TOKEN` | Seu token do Better Stack Logs para envio de telemetria |

#### 🔧 Configurando o Frontend
Entre na pasta `Frontend_NotaGest_4.0` (volte uma pasta antes se necessário), crie o arquivo `.env` baseado no `.env.example` e preencha as variáveis correspondentes:

```bash
cd ../Frontend_NotaGest_4.0
cp .env.example .env
```

| Variável | Descrição / Valor Recomendado |
|:---|:---|
| `PORT` | Porta onde a aplicação Next.js rodará localmente (Padrão: `4000` no Docker ou `3001` no npm) |
| `NEXT_PUBLIC_AUTH_SERVICE_URL` | URL de autenticação base: `http://localhost:5000/api/users` |
| `NEXT_PUBLIC_BACKEND_URL` | URL do servidor backend principal: `http://localhost:5000` |

---

### Passo 3: Execução via Docker Compose (Método Recomendado)
A orquestração via Docker é a forma mais prática de rodar o ecossistema completo (Frontend, Backend e Banco de Dados) de forma isolada e integrada.

1. Navegue até a pasta do **Backend** (onde se encontra o arquivo `docker-compose.yml`):
   ```bash
   cd ../Backend_NotaGest_4.0
   ```
2. Inicialize o Docker Compose executando:
   ```bash
   docker-compose up --build
   ```
3. O Docker irá automaticamente baixar a imagem oficial do **MongoDB**, realizar o build das imagens personalizadas do **Backend** e do **Frontend**, configurar a rede isolada e inicializar os serviços.
4. **Acessando a aplicação:**
   - **Interface Web (Frontend):** Acesse seu navegador em [http://localhost:4000](http://localhost:4000)
   - **API REST (Backend):** Acesse em [http://localhost:5000](http://localhost:5000)
   - **Documentação de Rotas (Swagger):** Disponível em [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

Para desligar todos os containers e limpar os recursos criados, use o comando:
```bash
docker-compose down
```

---

### Passo 4: Execução Manual para Desenvolvimento (Sem Docker)
Caso deseje rodar a aplicação em modo de desenvolvimento puro de forma individual, siga os passos abaixo:

#### 1. Executando o Banco de Dados
Certifique-se de ter uma instância local do **MongoDB** rodando na porta `27017` ou utilize um cluster na nuvem via **MongoDB Atlas**, alterando a `MONGO_URI` no arquivo `.env` do backend correspondente.

#### 2. Executando o Backend
Abra uma janela de terminal na pasta do backend, instale as dependências e inicie o servidor:
```bash
cd Backend_NotaGest_4.0
npm install
npm run dev
```
O servidor backend será iniciado e ficará ouvindo na porta `5000`.

#### 3. Executando o Frontend
Abra outra janela de terminal na pasta do frontend, instale as dependências e inicie o servidor de desenvolvimento:
```bash
cd Frontend_NotaGest_4.0
npm install
npm run dev
```
A interface do Next.js será inicializada e estará acessível em [http://localhost:3001](http://localhost:3001).

---

## 🔍 Observabilidade e Monitoramento (Backend)

O backend possui monitoramento contínuo em tempo real integrado ao **Better Stack**. Essa estrutura intercepta as requisições para coletar dados de tráfego, identificar erros e enviar alertas imediatos de incidentes.

### ✅ 1. Logs de Sucesso (LOG INFO)
Gerados automaticamente a cada processamento de rota com sucesso (retornos HTTP 2xx).

#### 🔹 1.1 Buscar Usuário Logado (`GET /api/users/me`)
<img width="579" height="56" alt="Logs de sucesso GET me" src="https://github.com/user-attachments/assets/1a7acfb6-e873-4148-9659-87411aaf0d16" />
<img width="739" height="348" alt="Painel Better Stack GET me" src="https://github.com/user-attachments/assets/7faede42-7702-48d2-83fe-14b42b20ff9d" />

#### 🔹 1.2 Buscar Usuário por E-mail (`GET /api/users/byEmail/:email`)
<img width="610" height="55" alt="Logs por email" src="https://github.com/user-attachments/assets/21e49f09-eb4c-4460-ba2e-e000665e7db6" />
<img width="744" height="364" alt="Painel por email" src="https://github.com/user-attachments/assets/1843ed90-e427-4de3-b724-ad2c216dad8b" />

#### 🔹 1.3 Buscar Perfil por ID (`GET /api/users/:id`)
<img width="608" height="113" alt="Logs perfil ID" src="https://github.com/user-attachments/assets/e1dbd1d6-a743-4bc6-bc22-72602312cd8b" />
<img width="744" height="405" alt="Painel detalhado" src="https://github.com/user-attachments/assets/f4be34bd-fa28-46b0-9cd2-103bb7c0587e" />
<img width="738" height="370" alt="Metadados do log" src="https://github.com/user-attachments/assets/d834d573-ca76-4cd5-9981-00169832bf28" />

#### 🔹 1.4 Atualizar Perfil (`PUT /api/users/:id`)
<img width="700" height="112" alt="Logs PUT update" src="https://github.com/user-attachments/assets/be844e5e-c246-4a4b-b21b-cc40179ee608" />
<img width="744" height="367" alt="Painel PUT update" src="https://github.com/user-attachments/assets/5d4eabc1-0135-43a5-9282-9ad2f50410c6" />
<img width="745" height="476" alt="Payload no Better Stack" src="https://github.com/user-attachments/assets/322dabff-c02b-4217-8ec5-fa14068ab61d" />

---

### ❌ 2. Logs de Erro (LOG ERROR)
Registrados quando ocorrem exceções no processamento ou acessos proibidos.

#### 🔹 2.1 Requisição sem Token JWT ou Token Inválido
<img width="543" height="52" alt="Erro 401 JWT" src="https://github.com/user-attachments/assets/f4b7f028-f3cb-4227-adb0-b477cf3c44a9" />
<img width="736" height="378" alt="Painel Better Stack Erro 401" src="https://github.com/user-attachments/assets/41ededea-d672-423f-9b49-38e74db82a08" />

#### 🔹 2.2 Usuário Inexistente no Banco de Dados
<img width="691" height="52" alt="Erro 404 Usuário" src="https://github.com/user-attachments/assets/3dcb6d4f-a2a6-4019-a914-07293054c8f4" />
<img width="747" height="394" alt="Painel Better Stack Erro 404" src="https://github.com/user-attachments/assets/3a79fec9-828a-4193-95a7-a027ed48eecc" />

#### 🔹 2.3 Erro de Validação de Body (Campos Inválidos)
<img width="718" height="53" alt="Erro de validação 400" src="https://github.com/user-attachments/assets/3f9c854f-a3a1-4569-9a8c-d9e0cb7337a0" />
<img width="595" height="778" alt="Filtro de erros no Better Stack" src="https://github.com/user-attachments/assets/61f3073b-e22e-4dc8-b3e5-b905ec9b4b28" />

---

### ❗ 3. Alertas Automáticos de Incidentes
Os incidentes são detectados automaticamente pelo Better Stack e enviam notificações instantâneas aos administradores.

<img width="1153" height="257" alt="Dashboard de alertas incidentes" src="https://github.com/user-attachments/assets/3fc026da-74fd-4101-b430-f0225c46a3fc" />

#### 🔹 Alerta de Erros Repetitivos (Respostas 500/401)
Dispara uma notificação urgente ao constatar um volume acima da média de falhas na autenticação ou quebras no servidor.
<img width="621" height="304" alt="Alerta e-mail de erros" src="https://github.com/user-attachments/assets/d3e05323-82a6-4161-a39e-99123f82cdf2" />
<img width="1187" height="391" alt="Logs estruturados de falhas" src="https://github.com/user-attachments/assets/5b14d7c5-88d5-428b-a2df-1cc6ca627a16" />
<img width="899" height="669" alt="Gráfico de ocorrência de erros" src="https://github.com/user-attachments/assets/f3dbbb6a-3cc7-494b-85b5-ec69df6b3735" />

#### 🔹 Alerta de Pico de Requests (Possível Ataque DDoS ou Loop)
<img width="739" height="142" alt="Pico detecção Better Stack" src="https://github.com/user-attachments/assets/1d0ebdb4-19f0-4a3b-a3e5-ccd9870b82a0" />
<img width="640" height="273" alt="Notificação de Pico" src="https://github.com/user-attachments/assets/ccc0e035-08b1-4d4a-adf7-b0c4781dce9b" />
<img width="1182" height="398" alt="Gráfico de tráfego de requisições" src="https://github.com/user-attachments/assets/c55d5f7d-5748-4d17-b1f5-c18b551b4490" />
<img width="629" height="641" alt="Alerta SMS/e-mail enviado" src="https://github.com/user-attachments/assets/092bf44f-4db5-4c74-9a79-1cd639abf998" />

#### 🔹 Alerta de Lentidão no Servidor (Requisições > 1 segundo)
Garante a experiência fluida do usuário, disparando chamados técnicos quando o tempo médio de resposta ultrapassa o limite tolerável.
<img width="542" height="243" alt="Alerta de tempo excedido" src="https://github.com/user-attachments/assets/40bfed35-593d-461a-8c43-95a15c1000b3" />
<img width="1162" height="385" alt="Detecção na linha do tempo" src="https://github.com/user-attachments/assets/a42592ba-5cf7-4143-b602-da70a83343a5" />
<img width="680" height="636" alt="Métricas do servidor" src="https://github.com/user-attachments/assets/ea2facbe-a8d0-4bd3-9f46-8b6729141cde" />

---

## 🛡️ DevSecOps & CI/CD
Tanto o frontend quanto o backend possuem fluxos de trabalho configurados no **GitHub Actions** (`.github/workflows`) para garantir integridade a cada alteração.
- **Análise do Sonar Cloud:** Varredura estática de segurança integrada para validação de vulnerabilidades, bugs pendentes, duplicação e cobertura de testes em ambas as bases de código.
- **Testes Unitários:** Rodados automaticamente pelo pipeline (Jest / Playwright) para evitar regressões.

---

## 📊 Histórico de Sprints e Entregas

### Sprint 2 — Módulo de Login / Cadastro
- Desenvolvimento das telas responsivas e acessíveis de **Login e Cadastro**.
- Processamento seguro com criptografia `bcryptjs` no servidor.
- Validação e segurança de dados do formulário de autenticação.
- Controle de Sessão no Frontend com armazenamento seguro de tokens.

<p align="center">
  <img src="https://i.postimg.cc/qBmkBsH9/sprint-2.png" alt="Sprint 2 Interface" width="600"/>
</p>

### Sprint 3 — Cadastro e Envio de Notas Fiscais
- Funcionalidades completas de upload, listagem, filtros e remoção de notas fiscais associadas aos imóveis cadastrados.
- Exportação inteligente de dados financeiros em **PDF** e **Excel**.
- Desenvolvimento de dashboards gráficos interativos com métricas de investimento mensal e acumulado.

<p align="center">
  <img src="https://i.postimg.cc/FRr4NRWH/Sprint-3.png" alt="Sprint 3 Interface" width="600"/>
</p>

---

## 🌐 Ambientes e Acesso ao Projeto

Os deploys ativos do projeto em produção estão disponíveis nos links abaixo:

- **Frontend (Interface Web):** [Acesse aqui via Vercel](https://nota-gest-frontend.vercel.app/)  
- **Backend (API Principal):** [Acesse aqui via Render](https://notagest-0o2r.onrender.com/)

---

## 👥 Integrantes e Autores do Projeto

*   **Ana Laura Martins Souto**
*   **Bianca Pichirilo Vergueiro Benatti**
*   **Jose Paulo de Oliveira**
*   **Rodolfo Antunes de Almeida**

---
<p align="center">
  Desenvolvido por estudantes do curso de <strong>Desenvolvimento de Software Multiplataforma (DSM) - FATEC Votorantim 2026</strong>.
</p>
