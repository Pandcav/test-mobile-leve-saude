
# Leve Saúde Feedback

[![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)](https://firebase.google.com/)

Aplicativo móvel para coleta e gerenciamento de feedback de usuários da plataforma Leve Saúde, desenvolvido com React Native e Expo.

## 📱 Sobre o Projeto

O **Leve Saúde Feedback** é um aplicativo móvel que permite aos usuários enviar feedback, sugestões e relatar problemas relacionados aos serviços da plataforma Leve Saúde. O app oferece uma interface intuitiva e moderna para facilitar a comunicação entre usuários e a equipe de desenvolvimento.

## ✨ Funcionalidades

- 📝 Envio de feedback e sugestões
- 🐛 Relatório de bugs e problemas
- 🔐 Sistema de autenticação seguro
- 📊 Dashboard para visualização de feedbacks
- 🌙 Interface moderna e responsiva
- 📱 Compatível com iOS e Android

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **TypeScript** - Tipagem estática para JavaScript
- **Firebase** - Backend as a Service (autenticação e banco de dados)
- **React Navigation** - Navegação entre telas
- **Vector Icons** - Ícones personalizados
- **ESLint & Prettier** - Qualidade e formatação de código

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Android Studio (para Android) ou Xcode (para iOS)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Pandcav/test-mobile-leve-saude.git
cd test-mobile-leve-saude
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente para Firebase (crie um arquivo `.env` baseado no `.env.example`)

### Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm start
```

Para executar no Android:
```bash
npm run android
```

Para executar no iOS:
```bash
npm run ios
```

Para executar na web:
```bash
npm run web
```

## 📝 Scripts Disponíveis

- `npm start` - Inicia o servidor Expo
- `npm run android` - Executa no emulador/dispositivo Android
- `npm run ios` - Executa no simulador/dispositivo iOS
- `npm run web` - Executa no navegador web
- `npm run lint` - Executa o ESLint
- `npm run lint:fix` - Corrige problemas do ESLint automaticamente
- `npm run format` - Formata o código com Prettier
- `npm run format:check` - Verifica formatação com Prettier

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── auth/           # Componentes de autenticação (vazio)
│   ├── buttons/        # Componentes de botões
│   │   ├── PrimaryButton.tsx
│   │   ├── SecondaryButton.tsx
│   │   ├── SubmitButton.tsx
│   │   └── TabButton.tsx
│   ├── feedback/       # Componentes de feedback (vazio)
│   ├── ui/             # Componentes de UI (vazio)
│   ├── AppNavigator.tsx
│   └── index.ts
├── config/             # Configurações do app
│   └── firebase.ts     # Configuração do Firebase
├── contexts/           # Contextos React
│   └── AuthContext.tsx # Contexto de autenticação
├── hooks/              # Hooks customizados (vazio)
├── navigation/         # Configuração de navegação (vazio)
├── screens/            # Telas do aplicativo
│   ├── auth/           # Telas de autenticação
│   │   └── LoginScreen.tsx
│   └── main/           # Telas principais
│       └── FeedbackScreen.tsx
├── types/              # Definições de tipos TypeScript
│   └── index.ts
└── utils/              # Funções utilitárias (vazio)
```

## 🔧 Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Configure a autenticação e o Firestore
3. Adicione as credenciais no arquivo de configuração
4. Ative as permissões necessárias no Firestore

## 📱 Build para Produção

Para gerar builds de produção, utilize o Expo Application Services (EAS):

```bash
npx eas build --platform android
npx eas build --platform ios
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE.txt](LICENSE.txt) para mais detalhes.

