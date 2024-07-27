import { Rule, SchematicContext, Tree, apply, url, applyTemplates, move, mergeWith, chain } from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';
import { insertImport, addProviderToModule } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import * as ts from 'typescript';

function addImportToModule(modulePath: string, symbolName: string, importPath: string): Rule {
  return (host: Tree) => {
    const text = host.read(modulePath);
    if (!text) {
      throw new Error(`File ${modulePath} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    const sourceFile = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

    const change = insertImport(sourceFile, modulePath, symbolName, importPath);
    const recorder = host.beginUpdate(modulePath);
    if (change instanceof InsertChange) {
      recorder.insertLeft(change.pos, change.toAdd);
    }
    host.commitUpdate(recorder);

    return host;
  };
}

function addProvidersToModule(modulePath: string, symbolName: string, importPath: string): Rule {
  return (host: Tree) => {
    const text = host.read(modulePath);
    if (!text) {
      throw new Error(`File ${modulePath} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    const sourceFile = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

    const proviverChanges = addProviderToModule(sourceFile, modulePath, symbolName, importPath);

    const recorder = host.beginUpdate(modulePath);
    for (const change of [...proviverChanges]) {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    }
    host.commitUpdate(recorder);

    return host;
  };
}

export default function (options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {

    // Definir caminho padrão se não estiver definido
    options.path = options.path ? normalize(options.path as string) : normalize('src/app/pages');

    const dasherizedName = strings.dasherize(options.name).concat('');

    // Ajuste o caminho dos arquivos
    const templateSource = apply(url('./files'), [
      applyTemplates({
        ...options,
        ...strings,
      }),
      move(''), // Corrigir o caminho de destino
    ]);

    // Ajustar o caminho do módulo principal
    const modulePath = 'src/app/app.module.ts';
    const className = strings.classify(`${options.name}Service`);
    const importPath = `${options.path}/${dasherizedName}/service/${dasherizedName}.service`.replace('src/app/', './'); // Corrigir o caminho de importação

    return chain([
      mergeWith(templateSource),
      addImportToModule(modulePath, className, importPath),
      addProvidersToModule(modulePath, className, importPath),
    ]);
  };
}
