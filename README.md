# Virtu Platform

A **Virtu Platform** é uma aplicação web moderna desenvolvida para gerenciamento de academias de artes marciais. Sistema completo que oferece controle total sobre alunos, graduações, planos e assinaturas, construído com foco na experiência do usuário e performance.

## 💪 Sobre o projeto

O Virtu é um sistema completo para gestão de academias de artes marciais, permitindo o controle de:

- **Alunos**: Cadastro e gestão completa de alunos
- **Graduações**: Sistema completo de graduações e progressão
- **Planos**: Gerenciamento de planos e mensalidades
- **Assinaturas**: Controle de assinaturas dos alunos
- **Dashboard Administrativo**: Painel de controle com métricas e informações relevantes
- **Autenticação Segura**: Sistema de login e controle de acesso
- **Interface Responsiva**: Design adaptável para diferentes dispositivos

## Principais Tecnologias

### Frontend
- **[Next.js 15](https://nextjs.org)** - Framework React com App Router
- **[React 19](https://react.dev)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org)** - Tipagem estática para JavaScript
- **[Tailwind CSS](https://tailwindcss.com)** - Framework CSS utilitário
- **[Radix UI](https://www.radix-ui.com)** - Componentes acessíveis e customizáveis

### Autenticação e Formulários
- **[NextAuth.js](https://next-auth.js.org)** - Autenticação para Next.js
- **[React Hook Form](https://react-hook-form.com)** - Gerenciamento de formulários
- **[Zod](https://zod.dev)** - Validação de esquemas TypeScript

### UI/UX
- **[Lucide React](https://lucide.dev)** - Ícones modernos
- **[Sonner](https://sonner.emilkowal.ski)** - Notificações toast
- **[Next Themes](https://github.com/pacocoursey/next-themes)** - Suporte a temas

### Ferramentas de Desenvolvimento
- **[ESLint](https://eslint.org)** - Linting de código
- **[PostCSS](https://postcss.org)** - Processamento de CSS
- **[Turbopack](https://turbo.build/pack)** - Bundler rápido para desenvolvimento

## Como Executar

1. Instale as dependências:
```bash
npm install
# ou
pnpm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
pnpm dev
```

3. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento com Turbopack
- `npm run build` - Gera a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linting do código
