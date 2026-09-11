# 🗂️ Organizador de Tarefas para Devs

Uma aplicação de lista de tarefas (to-do list) construída com **React** e **Tailwind CSS**, pensada para o dia a dia de quem programa: cadastre tarefas com nome, data, prioridade e descrição, marque como concluídas e acompanhe tudo salvo automaticamente no navegador.

## ✨ Funcionalidades

- ✅ Adicionar tarefas com nome, data, prioridade (`High`, `Med`, `Low`) e descrição
- ✅ Marcar tarefas como concluídas (checkbox)
- ✅ Remover tarefas
- ✅ Separação automática entre **Pendentes** e **Concluídas**
- ✅ Ordenação automática por prioridade e, em caso de empate, por data
- ✅ Persistência dos dados no `localStorage` — as tarefas continuam lá mesmo depois de fechar o navegador
- ✅ Interface responsiva, com tema escuro

## 🛠️ Tecnologias utilizadas

- [React](https://react.dev/) — biblioteca para construção da interface
- [Vite](https://vitejs.dev/) — servidor de desenvolvimento e build
- [Tailwind CSS](https://tailwindcss.com/) — estilização utilitária
- `localStorage` (Web Storage API) — persistência de dados no navegador
- `crypto.randomUUID()` — geração de IDs únicos para cada tarefa

## 🚀 Como rodar localmente

Pré-requisitos: [Node.js](https://nodejs.org/) instalado (recomendado LTS).

```bash
# 1. Clone o repositório
git clone https://github.com/manuellathomazini/Dev-Tarefas.git

# 2. Acesse a pasta do projeto
cd Dev-Tarefas

# 3. Instale as dependências
npm install

# 4. Rode o projeto em modo de desenvolvimento
npm run dev
```

A aplicação abrirá por padrão em `http://localhost:5173`.

## 🧩 Como usar

1. Preencha o nome da tarefa (campo obrigatório).
2. Opcionalmente, defina data, prioridade e uma descrição.
3. Clique em **Adicionar** — a tarefa aparece na lista de **Pendentes**.
4. Marque o checkbox para movê-la para **Concluídas**.
5. Clique em **Remover** para excluir a tarefa definitivamente.

Todas as alterações são salvas automaticamente — não é preciso clicar em "salvar".

## 👩‍💻 Autores

Desenvolvido por
- **Manuella Sousa Thomazini** - RM 573606
- **Henrique Gumbys Pagliato** - RM 570914
- **Murillo Dourado Vieira** - RM 571912
- **Renan Carlos Silva Bonanno** - RM 573043

## Link do repositório
https://github.com/manuellathomazini/Dev-Tarefas.git