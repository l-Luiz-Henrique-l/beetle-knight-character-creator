# Beetle Knight Character Creator

Aplicação web desenvolvida para automatizar a criação e o gerenciamento de personagens do sistema autoral de RPG **Beetle Knight**.

O projeto surgiu da ideia de transformar regras originalmente utilizadas em fichas e documentos em uma experiência interativa, permitindo que o jogador crie seu personagem passo a passo enquanto o sistema aplica automaticamente parte das regras, cálculos e modificadores.

## Sobre o projeto

O Character Creator possui um fluxo guiado de criação de personagens, envolvendo atributos, espécie, antecedente, itens especiais e emblemas.

Além da criação inicial, o projeto também conta com uma ficha interativa para gerenciamento de informações do personagem durante o jogo.

O principal objetivo do projeto foi praticar a transformação de regras de um sistema de jogo em lógica de software, trabalhando com gerenciamento de estado, regras de negócio e construção de interfaces reutilizáveis.

## Funcionalidades

- Criação de personagem em múltiplas etapas
- Distribuição de dados entre atributos
- Seleção de expertise
- Sistema de espécies com características próprias
- Busca dinâmica de imagens das espécies através da API da Wikipédia
- Seleção e geração de antecedentes
- Geração de itens especiais através de rolagens
- Aplicação de bônus e modificadores de itens
- Gerenciamento de emblemas
- Ficha de personagem editável
- Controle de pontos de vida e propósito
- Gerenciamento de equipamentos e anotações
- Sistema de movimentação
- Sistema próprio de rolagem de dados
- Vantagem e desvantagem através de alteração do tipo de dado
- Identificação de resultados mínimos e máximos nas rolagens
- Sistema experimental de cadastro e login local

## Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zod
- shadcn/ui
- Lucide React
- JSON para armazenamento das informações do sistema

## Regras de jogo transformadas em código

Uma das partes principais do projeto foi transformar regras do RPG em lógica programável.

O sistema utiliza diferentes tipos de dados para representar atributos:

`d4 → d6 → d8 → d10 → d12 → d20`

E permite modificar o dado utilizado em uma rolagem através de vantagem ou desvantagem.

Também existe uma camada responsável por acumular modificadores provenientes de itens e aplicá-los aos atributos e recursos do personagem.

Exemplos de informações afetadas por esses modificadores:

- atributos
- movimento
- espaços de magia
- pontos de propósito
- espaços de emblema

## Estrutura dos dados

Parte das informações do sistema foi separada da interface e armazenada em arquivos JSON.

Entre elas:

- espécies
- antecedentes
- itens
- emblemas
- informações gerais do sistema

Isso permite alterar ou expandir o conteúdo do RPG sem precisar modificar diretamente os componentes da interface.

## Status do projeto

🚧 **Protótipo em desenvolvimento**

O projeto foi desenvolvido como estudo e protótipo de uma ferramenta para o sistema Beetle Knight e ainda possui funcionalidades planejadas.

Atualmente, personagens criados são mantidos apenas durante a sessão da aplicação.

O sistema de cadastro e login também é apenas uma implementação local para demonstração, utilizando `localStorage`, e não deve ser considerado um sistema de autenticação para produção.

## Próximos passos

- Persistência dos personagens
- Backend e autenticação real
- Melhorar o sistema de rolagens
- Expandir as regras automatizadas
- Melhorar responsividade e experiência mobile
- Adicionar novas mecânicas do sistema
- Publicar uma versão online do projeto

---

Desenvolvido por **Luiz Henrique Freitas dos Santos**.
