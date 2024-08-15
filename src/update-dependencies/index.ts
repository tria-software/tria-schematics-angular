import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

// Função para atualizar o package.json
function updatePackageJson(version: string = '15.0.2'): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJsonPath = '/package.json';

    if (!tree.exists(packageJsonPath)) {
      throw new Error('Could not find package.json');
    }

    const buffer = tree.read(packageJsonPath);
    if (buffer === null) {
      throw new Error('Failed to read package.json');
    }

    const packageJson = JSON.parse(buffer.toString());

    const angularVersion = `^${version}`;

    // Defina as versões desejadas das dependências
    packageJson.dependencies = {
      "@angular/animations": angularVersion,
      "@angular/cdk": "^14.2.7",
      "@angular/common": angularVersion,
      "@angular/compiler": angularVersion,
      "@angular/core": angularVersion,
      "@angular/forms": angularVersion,
      "@angular/localize": angularVersion,
      "@angular/material": "^14.2.7",
      "@angular/platform-browser": angularVersion,
      "@angular/platform-browser-dynamic": angularVersion,
      "@angular/router": angularVersion,
      "@ng-bootstrap/ng-bootstrap": "^14.0.0",
      "@ng-select/ng-select": "^10.0.1",
      "@popperjs/core": "^2.11.8",
      "angularx-qrcode": "^15.0.1",
      "bootstrap": "^5.3.2",
      "bootstrap-icons": "^1.11.2",
      "gerador-validador-cpf": "^5.0.2",
      "jquery": "^3.7.1",
      "jwt-decode": "^4.0.0",
      "jwt-encode": "^1.0.1",
      "ng-drag-drop": "^5.0.0",
      "ng2-currency-mask": "^13.0.3",
      "ng2-pdf-viewer": "^9.1.5",
      "ngx-mask": "^15.2.1",
      "ngx-toastr": "^16.0.0",
      "rxjs": "~7.5.0",
      "tslib": "^2.3.0",
      "tria-schematics-test": "latest",
      "zone.js": "~0.12.0"
    };

    // Defina as versões desejadas das dependências de desenvolvimento
    packageJson.devDependencies = {
      "@angular-devkit/build-angular": "^15.0.3",
      "@angular/cli": "^15.2.11",
      "@angular/compiler-cli": "^15.0.0",
      "@types/jasmine": "~4.3.0",
      "@types/jquery": "^3.5.29",
      "@types/jwt-encode": "^1.0.3",
      "@types/lodash": "^4.14.202",
      "jasmine-core": "~4.5.0",
      "karma": "~6.4.0",
      "karma-chrome-launcher": "~3.1.0",
      "karma-coverage": "~2.2.0",
      "karma-jasmine": "~5.1.0",
      "karma-jasmine-html-reporter": "~2.0.0",
      "typescript": "~4.8.2"
    };

    tree.overwrite(packageJsonPath, JSON.stringify(packageJson, null, 2));

    return tree;
  };
}

// Função para instalar dependências
function installDependencies(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.addTask(new NodePackageInstallTask());
    return tree;
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
      // Atualiza o package.json
      updatePackageJson(projectOptions.version),

      // Instala as dependências
      installDependencies(),
    ])

    return rule(_tree, _context);
  };
}
