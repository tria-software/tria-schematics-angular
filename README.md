# Tria Schematics

## Documentação schematics

Este documento fornece instruções sobre como configurar e utilizar os schematics criados para o seu projeto Angular.

## Crianado novo projeto no Padrão Tria Software

### Criando novo projeto

Para criar um novo projeto, utilize o seguinte comando:

```bash
ng n --create-application false <novo-projeto>
```

### Instalação dos Schematics Angular

Para instalar os schematics angualar, utilize o seguinte comando:

```bash
npm install -g @angular-devkit/schematics-cli
```

O pacote _schematics_ é necessário para rodar os schematics do pacote [@tria-software/schematics-angular](https://www.npmjs.com/package/@tria-software/schematics-angular)

### Instalação dos Schematics Tria

Para instalar os schematics no projeto, utilize o seguinte comando:

```bash
npm install @tria-software/schematics-angular --save
```

### Configurar arquivos padrões do projeto

Para configurar os arquivos padrões no projeto, utilize o seguinte comando:

```bash
schematics ./node_modules/@tria-software/schematics-angular:default-project . --dry-run false
```

### Atualizar as dependências do arquivo

Para atualizar as dependências do arquivo packge.json do projeto, utilize o seguinte comando:

```bash
schematics ./node_modules/@tria-software/schematics-angular:update-dependencies . --dry-run false
```

## Schematics Disponíveis

Abaixo está a listagem dos schematics disponíveis:

1. **component** - Cria o componente principal/padrão.
2. **filter** - Cria um componente de filtro.
3. **new-edit** - Cria um componente de criação/edição.
4. **table-grid** - Cria um componente de grid de tabela.
5. **model** - Cria os DTO e Filters para utilização no projeto.
6. **service** - Cria serviços no padrão do projeto.
7. **create-components** - Cria todos os componentes.
8. **default-project** - Cria os arquivos padrões do projeto.
9. **update-dependencies** - Atualizar as dependências do arquivo packge.json do projeto.

## Utilização dos Schematics

Para executar um schematic, utilize o seguinte comando padrão:

```bash
schematics ./node_modules/@tria-software/schematics-angular:<nome-do-schematic> <nome-do-modulo-ou-component>
```

### Exemplo

Para criar todos os componets de um módulo chamado `nova-tela`, utilize o comando abaixo:

```bash
schematics ./node_modules/@tria-software/schematics-angular:create-components nova-tela
```

Certifique-se de substituir `<nome-do-schematic>` pelo nome do schematic desejado e `<nome-do-modulo-ou-component>` pelo nome do módulo/componente que você deseja criar.

## Estrutura de Diretórios

Abaixo está a árvore de diretórios gerada pelo schematic `create-components`:

```
src/
└──app/
  └──pages/
    └──nova-tela/
      ├──model/
      │  ├──nova-tela-dto.ts
      │  ├──nova-tela-filter.ts
      │  └──nova-tela-list.ts
      ├──nova-tela-filter/
      │  ├──nova-tela-filter.component.html
      │  ├──nova-tela-filter.component.scss
      │  └──nova-tela-filter.component.ts
      ├──nova-tela-new-edit/
      │  ├──nova-tela-new-edit.component.html
      │  ├──nova-tela-new-edit.component.scss
      │  └──nova-tela-new-edit.component.ts
      ├──nova-tela-table-grid/
      │  ├──nova-tela-table-grid.component.html
      │  ├──nova-tela-table-grid.component.scss
      │  └──nova-tela-table-grid.component.ts
      ├──service/
      │  └──nova-tela.service.ts
      ├──nova-tela-filter.component.html
      ├──nova-tela-filter.component.scss
      └──nova-tela-filter.component.ts
```
