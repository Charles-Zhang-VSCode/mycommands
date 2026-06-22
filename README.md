# My Commands

A small collection of practical VS Code commands for everyday text editing and Markdown cleanup.

## Features

My Commands adds lightweight commands for common text transformations directly from the **Command Palette**:

* `Dots (Enumerate Lines as MD Format)`
* `Sort Line Items (CSV)`
* `Indent Markdown Sections`
* `Unindent Markdown Sections`
* `Sort Markdown Sections`
* `Count Lines`

### Commands

**`Dots (Enumerate Lines as MD Format)`**

Converts selected lines into Markdown bullet points.

Example:

```text
Apple
Banana
Cherry
````

Becomes:

```md
* Apple
* Banana
* Cherry
```

**`Sort Line Items (CSV)`**

Sorts comma-separated items in the selected text.

Example:

```text
banana, apple, cherry
```

Becomes:

```text
apple, banana, cherry
```

**`Indent Markdown Sections`**

Adds one heading level to each selected Markdown section header.

Example:

```md
# Title
## Section
```

Becomes:

```md
## Title
### Section
```

**`Unindent Markdown Sections`**

Removes one heading level from each selected Markdown section header. Level 1 headers are left unchanged.

Example:

```md
# Title
## Section
### Details
```

Becomes:

```md
# Title
# Section
## Details
```

**`Sort Markdown Sections`**

Sorts Markdown sections alphabetically by heading title while preserving section hierarchy and content.

This is useful for organizing notes, documentation, outlines, and Markdown files with repeated sections.

**`Count Lines`**

Counts the number of lines in the selected text. If no text is selected, it counts the lines in the whole document.

## Usage

Open the Command Palette with `Ctrl+Shift+P` / `Cmd+Shift+P` / `F1`, then search for any command ending with `- MyCommands`.

## Notes

Markdown section commands recognize GitHub-style headings such as:

```md
# Heading
## Section
### Subsection
```

Only headings that start with one or more `#` characters followed by a space are treated as section headers.

## Known Issues

<!-- See Github [issues](https://github.com/Charles-Zhang-VSCode/mycommands/issues) -->

N/A

## Release Notes

### 0.0.1

Initial setup.
