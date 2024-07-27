import { Rule, SchematicContext, Tree, apply, url, applyTemplates, move, mergeWith, chain } from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';

export default function (options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {

    // Definir caminho padrão se não estiver definido
    options.path = options.path ? normalize(options.path as string) : normalize('src/app/pages');

    // Ajuste o caminho dos arquivos
    const templateSource = apply(url('./files'), [
      applyTemplates({
        ...options,
        ...strings,
      }),
      move(''), // Corrigir o caminho de destino
    ]);


    return chain([
      mergeWith(templateSource),
    ]);
  };
}
