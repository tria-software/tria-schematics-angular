import { Rule, SchematicContext, Tree, chain, schematic } from '@angular-devkit/schematics';

export default function (options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {

    return chain([
      schematic("component", options),
      schematic("table-grid", options),
      schematic("new-edit", options),
      schematic("filter", options),
      schematic("model", options),
      schematic("service", options),
    ]);

  };
}
