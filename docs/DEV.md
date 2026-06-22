# My Commands - Dev Notes

> A bunch of custom VS Code commands.

Raw text, light-weight, zero-dependancy - this extension provides some commonly used text commands mostly targeting Markdown use, with somewhat opinionated command picking design leaning towards daily personal use.

## Folder Structure

In short:

```text
Keep in repo/dev:
src/
package.json
package-lock.json
tsconfig.json
.eslintrc.json
.vscodeignore

Ship in VSIX:
package.json
out/extension.js
possibly README.md, LICENSE, CHANGELOG.md, icon/assets

Do not ship:
src/
out/test/
*.map
*.ts
node_modules dev-only files
```

Details:

* `.eslintrc.json` configures linting for TypeScript source files. It is only for development quality checks. It should not be shipped.
* `.vscodeignore` controls what is excluded from the packaged extension. Your current file excludes `src`, `.ts`, `.map`, test/dev config files, etc. That is normal because VS Code runs compiled JavaScript, not TypeScript. Microsoft’s publishing docs describe packaging a VS Code extension into VSIX for distribution, and `.vscodeignore` is the packaging filter used for excluding unnecessary files.
* `package.json` is the extension manifest and npm metadata. It tells VS Code the extension name, version, commands, entry point, supported VS Code version, scripts, and dependencies. This file is mandatory. Your `"main": "./out/extension.js"` means VS Code loads the compiled JavaScript from `out/extension.js`, not `src/extension.ts`.
* `package-lock.json` locks exact npm dependency versions. Keep it in the repository. It is not important at runtime for the extension, but it makes builds reproducible.
* `tsconfig.json` configures the TypeScript compiler. It says: compile `src` into `out`, use CommonJS modules, target ES2020, use strict type checking, and emit source maps.

`src/extension.ts` is the main TypeScript source file. This is the file you edit. It registers three commands:

```ts
mycommands.sortline_csv
mycommands.dot_lines
mycommands.sort_sections
```

But your `package.json` declares six commands:

```json
mycommands.sortline_csv
mycommands.dot_lines
mycommands.sort_sections
mycommands.indent_sort_sections
mycommands.unindent_sort_sections
mycommands.lines
```

So three commands are currently declared but not registered. They will appear in the Command Palette but will fail or do nothing because no implementation is registered for them. Before publishing, either implement/register them or remove them from `package.json`.

* `out/extension.js` is the compiled runtime JavaScript generated from `src/extension.ts`. This is what VS Code actually executes because `package.json` points to it.
* `out/extension.js.map` maps the compiled JavaScript back to TypeScript for debugging. Your `.vscodeignore` excludes `**/*.map`, so it will not be packaged.
* `src/test/...` contains TypeScript test source files. These are for development only.
* `out/test/...` contains compiled test JavaScript. These are generated from `src/test/...`. They are used by `npm test`, but they should not be shipped in a published extension. Your current `.vscodeignore` does **not** exclude `out/test/**`, so your published VSIX may include compiled tests unnecessarily.

## Setup

For end-user:

* Manual install: Download `vsix` from release page; Install from VS Code using `Extension` > `Install from VSIX...`
* Marketplace install: Download from marketplace.

For development and first-time build after downloading the repo source, use:

* `npm install -g yo generator-code` for generator
* `npm install -g @vscode/vsce`
* `npm install` to install `package.json`
* `vsce package` to generate vsix

```bash
npm run compile
vsce package
vsce publish
```

Because your `package.json` has:

```json
"vscode:prepublish": "npm run compile"
```

`vsce` should compile before packaging, so `out` can be regenerated from `src`. The final package needs `out/extension.js`.

## TODO

- [ ] (Command) Sort Lines Ascending (ignore Tags)
- [ ] (Command) Sort MD Sections
- [ ] (Publishing) Release on VS Code Marketplace
- [ ] (Publishing) Refine extension publisher information, icons, documentation

## Requirements

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts: