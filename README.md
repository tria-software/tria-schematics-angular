# Tria Schematics

## Documentação schematics

Este documento fornece instruções sobre como configurar e utilizar os schematics criados para o seu projeto Angular.

## Configuração

### Instalação dos Schematics

Para instalar os schematics no projeto, utilize o seguinte comando:

```bash
TODO
```

## Link dos Schematics

Para realizar o link dos schematics no projeto, utilize o seguinte comando:

```bash
TODO
```

## Build dos Schematics

Sempre que um schematic for adicionado ou editado, é necessário realizar o build. Utilize o comando abaixo:

```bash
TODO
```

## Schematics Disponíveis

Ao todo, existem 7 schematics disponíveis:

1. **component** - Cria o componente principal/padrão.
2. **filter** - Cria um componente de filtro.
3. **new-edit** - Cria um componente de criação/edição.
4. **table-grid** - Cria um componente de grid de tabela.
5. **model** - Cria os DTO e Filters para utilização no projeto.
6. **service** - Cria serviços no padrão do projeto.
7. **create-components** - Cria todos os componentes.

## Utilização dos Schematics

Para executar um schematic, utilize o seguinte comando padrão:

```bash
yarn ng g tria-schematics:<nome-do-schematic> <nome-do-modulo-ou-component>
```

### Exemplo

Para criar todos os componets de um módulo chamado `nova-tela`, utilize o comando abaixo:

```bash
yarn ng g tria-schematics:create-components nova-tela
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
