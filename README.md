# My Commands

Raw text, light-weight, zero-dependancy - this extension provides some commonly used text commands mostly targeting Markdown use, with somewhat opinionated command picking design leaning towards daily personal use.

## Setup

For end-user:

* Download `vsix` from release
* Install from VS Code using `Extension` > `Install from VSIX...`

For development and first-time build after downloading the repo source, use:

* `npm install -g yo generator-code` for generator
* `npm install -g @vscode/vsce`
* `npm install` to install `package.json`
* `vsce package` to generate vsix

## Features

Commands:

* Dots (Enumerate Lines as MD Format)
* Sort Line Items (CSV)

Todo:

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

## Known Issues

<!-- See Github [issues](https://github.com/Charles-Zhang-VSCode/mycommands/issues) -->

N/A

## Release Notes

### 0.0.1

Initial setup.

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts: