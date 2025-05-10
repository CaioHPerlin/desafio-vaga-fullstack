# 📄 Gerenciador de Tarefas - Desafio Técnico

## 🚀 Como Rodar o Projeto Localmente

### **Pré-requisitos**

- Node.js (v16 ou superior)
- Docker e Docker Compose para inicialização do banco de dados

### **Passos para Instalação**

#### 1. Clone o repositório:

```bash
git clone https://github.com/CaioHPerlin/desafio-vaga-fullstack.git
cd desafio-vaga-fullstack
```

#### 2. Inicie o banco de dados:

O arquivo docker-compose na raíz desse projeto contém um serviço de banco de dados mysql pré-configurado (com variáveis de ambiente definidas em plain text) para facilitar o teste. Simplesmente incie o serviço:

```bash
docker-compose up -d db
```

#### 3. Defina as variáveis de ambiente do backend

O diretório `/backend` contém um `.env.example` com alguns valores pré-definidos, simplesmente copie-o e renomeie a cópia para `.env`.

#### 4. Defina as variáveis de ambiente do frontend

O diretório `/frontend` contém um `.env.example` com um valor pré-definido que aponta para `http://localhost:3000`, endereço padrão local do backend. Copie o arquivo e renomeie a cópia para `.env`.

#### 5. Instale as dependências e execute ambos os projetos

```bash
cd frontend
npm i
npm run dev
```

```bash
cd backend
npm i
npm run start:dev
```

## 🛠️ Tecnologias Utilizadas

### **Frontend**

- **React** com Hooks e Context API
- **TypeScript**
- **TailwindCSS** para estilização
- **shadcn/ui** para componentes base
- **React Query** para gerenciamento de estado e data fetching
- **Vite** como bundler
- Integração com API REST através do **Axios**

### **Backend**

- **Node.js** com **NestJS**
- **TypeScript**
- Autenticação com **JWT**
- **TypeORM** para gerenciamento do banco de dados
- Validações com `class-validator`
- **Passport** para _middlewares_ (Guards e Strategies) de autenticação
- **Swagger** para documentação da API

### **Banco de Dados**

- **MySQL**

---
