# Forklift Timer App

Sistema de controle de tempo para operações de empilhadeira, desenvolvido com React e Vite.

## Funcionalidades

- ⏱️ Cronômetro para controle de tempo de descarregamento
- 📊 Painel de estatísticas em tempo real
- 📝 Histórico de operações
- 👥 Sistema de autenticação de usuários
- 🎯 Diferentes níveis de acesso (Operador, Supervisor, Administrador)

## Tecnologias Utilizadas

- React 18
- Vite
- TailwindCSS
- React Router DOM
- React Icons
- LocalStorage para persistência de dados

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/forklift-timer-app.git
```

2. Entre no diretório do projeto:
```bash
cd forklift-timer-app
```

3. Instale as dependências:
```bash
npm install
# ou
yarn install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes React
  ├── contexts/      # Contextos React (Auth)
  ├── hooks/         # Hooks personalizados
  ├── services/      # Serviços e APIs
  └── assets/        # Recursos estáticos
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção localmente
- `npm run lint` - Executa o linter no código

## Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
