# Tria Schematics Angular

## Documentação schematics

Este documento fornece instruções sobre como configurar e utilizar os schematics criados para o seu projeto Angular.

## Criando novo projeto no Padrão Tria Software

### Criando novo projeto

Para criar um novo projeto, utilize o seguinte comando:

```bash
ng n --create-application false <nome-do-projeto>
```

### Instalação dos Schematics Tria

Utilize o seguinte comando para navegar para pasta do projeto:

```bash
cd <nome-do-projeto>
```

E instale os schematics no projeto, utilize o seguinte comando:

```bash
npm install tria-schematics-angular --save
```

### Configurar arquivos padrões do projeto

Para configurar os arquivos padrões no projeto, utilize o seguinte comando:

```bash
ng g tria-schematics-angular:default-project .
```

### Atualizar as dependências do arquivo

Para atualizar as dependências do arquivo packge.json do projeto, utilize o seguinte comando:

```bash
ng g tria-schematics-angular:update-dependencies
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
ng g tria-schematics-angular:<nome-do-schematic> <nome-do-modulo-ou-component>
```

### Exemplo

Para criar todos os componets de um módulo chamado `novo-modulo`, utilize o comando abaixo:

```bash
ng g tria-schematics-angular:create-components <novo-modulo>
```

Certifique-se de substituir `<nome-do-schematic>` pelo nome do schematic desejado e `<nome-do-modulo-ou-component>` pelo nome do módulo/componente que você deseja criar.

## Estrutura de Diretórios

Abaixo está a árvore de diretórios gerada pelo schematic `create-components`:

```
src/
└──app/
  └──pages/
    └──novo-modulo/
      ├──model/
      │  ├──novo-modulo-dto.ts
      │  ├──novo-modulo-filter.ts
      │  └──novo-modulo-list.ts
      ├──novo-modulo-filter/
      │  ├──novo-modulo-filter.component.html
      │  ├──novo-modulo-filter.component.scss
      │  └──novo-modulo-filter.component.ts
      ├──novo-modulo-new-edit/
      │  ├──novo-modulo-new-edit.component.html
      │  ├──novo-modulo-new-edit.component.scss
      │  └──novo-modulo-new-edit.component.ts
      ├──novo-modulo-table-grid/
      │  ├──novo-modulo-table-grid.component.html
      │  ├──novo-modulo-table-grid.component.scss
      │  └──novo-modulo-table-grid.component.ts
      ├──service/
      │  └──novo-modulo.service.ts
      ├──novo-modulo-filter.component.html
      ├──novo-modulo-filter.component.scss
      └──novo-modulo-filter.component.ts
```
