import {
  chain,
  Rule,
  SchematicContext,
  Tree,
  mergeWith,
  apply,
  url,
  template,
  move,
  MergeStrategy,
  renameTemplateFiles,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { normalize } from 'path';

// Adiciona os arquivos personalizados
function addCustomFiles(options: any, projectOptions: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {

    // Definir caminho padrão se não estiver definido
    options.path = options.path ? normalize(options.path as string) : normalize('');


    const sourceTemplates = url('./files');
    const sourceParameterizedTemplates = apply(sourceTemplates, [
      template({
        ...options,
        ...strings
      }),
      renameTemplateFiles(), // Remove o sufixo .template dos arquivos
      move(normalize(projectOptions.directory))
    ]);

    const mergeFiles = mergeWith(sourceParameterizedTemplates, MergeStrategy.Overwrite);
    return mergeFiles(_tree, _context);
  };
}

export default function (options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const projectOptions = {
      name: options.name,
      version: options.version || '15.0.0',
      directory: options.directory || options.name,
      routing: true,
      style: 'scss'
    };

    const rule = chain([
      // Adiciona os arquivos personalizados
      addCustomFiles(options, projectOptions),
    ])

    return rule(_tree, _context);
  };
}
