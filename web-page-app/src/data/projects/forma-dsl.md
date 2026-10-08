An attempt to build my own DSL: a declarative language for 3D modeling and scene composition, with reusable components and a live solve-as-you-type preview. The repo is a monorepo - the language and its geometry kernel binding, an MCP server that writes `.forma` files, a browser editor, a landing page, and the reference manual - all published from one place.

```hcl
param height { type = number  default = 20  min = 8  max = 40 }

model "riser" {
  part "body" {
    color = "#6f7d8c"
    difference {
      extrude {
        height = var.height
        rounded_rect { size = [40, 20]  radius = 4  center = true }
      }
      translate { offset = [0, 0, 3]  cylinder { radius = 5  height = var.height } }
    }
  }
}
```

### Key Features & Details

- A declarative language with parameters, booleans (difference/union/intersection), extrusion, and reusable components, evaluated by a geometry kernel compiled to the same runtime the browser editor uses
- An MCP server (`forma-dsl-mcp`) that lets an AI assistant write and solve `.forma` files directly over stdio
- A browser editor (CodeMirror + three.js) with live re-solving as a parameter slider moves
- Syntax highlighting, the editor's examples, and the MCP server's tool catalogue are all generated from the language's own registries, so nothing describing the language can drift from what it actually accepts
- Two npm packages (`forma-dsl`, `forma-dsl-mcp`) published via npm's OIDC trusted publishing, versioned together from the same tag
- A reference manual built from the same source, with every internal link checked at build time

**Purpose:** figuring out what a small, typed, declarative modeling language should look like - parsing, evaluation, a geometry kernel, and the tooling around all three - end to end.

[Try the editor](https://kalpak44.github.io/forma-dsl/editor/) · [Read the reference](https://kalpak44.github.io/forma-dsl/docs/)
