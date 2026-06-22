// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TextEditorEdit } from 'vscode';

interface MarkdownSection {
	headerLine: string;
	title: string;
	level: number;
	leadLines: string[];
	children: MarkdownSection[];
}

// The extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('MyCommands extension is activated!');

	// Provide implementations to the commands defined in the package.json file;
	// Commands defined in package.json file do not require extension to be loaded to display.
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('mycommands.sortline_csv', sortlineCSV));
	context.subscriptions.push(vscode.commands.registerCommand('mycommands.dot_lines', dotLines));
	context.subscriptions.push(vscode.commands.registerCommand('mycommands.sort_markdown_sections', sortMarkdownSections));
	context.subscriptions.push(vscode.commands.registerCommand('mycommands.indent_markdown_sections', indentMarkdownSections));
	context.subscriptions.push(vscode.commands.registerCommand('mycommands.unindent_markdown_sections', unindentMarkdownSections));
	context.subscriptions.push(vscode.commands.registerCommand('mycommands.count_lines', countLines));
}

export function deactivate() {}

// Implementations
function sortlineCSV() {
	let activeEditor = vscode.window.activeTextEditor;
	if (!activeEditor || activeEditor.selection.isEmpty) {
		return;
	}

	let selectionRange = activeEditor.selection;
	let selection = activeEditor.document.getText(selectionRange);
	let words = selection.split(',').map(w => w.trim()).sort();

	activeEditor.edit((edit: TextEditorEdit) => {
		edit.replace(selectionRange, words.join(', '));
	});
}

function dotLines() {
	let activeEditor = vscode.window.activeTextEditor;
	if (!activeEditor || activeEditor.selection.isEmpty) {
		return;
	}

	let selectionRange = activeEditor.selection;
	let selection = activeEditor.document.getText(selectionRange);
	let lines = selection.split('\n').map(w => '* ' + w.trim());

	activeEditor.edit((edit: TextEditorEdit) => {
		edit.replace(selectionRange, lines.join('\n'));
	});
}

function indentMarkdownSections() {
	transformSelectedText(text => text.replace(/^(#+) (.*)$/gm, '#$1 $2'));
}

function unindentMarkdownSections() {
	transformSelectedText(text => text.replace(/^#{2,} (.*)$/gm, match => match.substring(1)));
}

function sortMarkdownSections() {
	let activeEditor = vscode.window.activeTextEditor;
	if (!activeEditor) {
		return;
	}

	let targetRange = activeEditor.selection.isEmpty
		? new vscode.Range(activeEditor.document.positionAt(0), activeEditor.document.positionAt(activeEditor.document.getText().length))
		: activeEditor.selection;

	let text = activeEditor.document.getText(targetRange);
	let sortedText = serializeMarkdown(parseMarkdown(text));

	activeEditor.edit((edit: TextEditorEdit) => {
		edit.replace(targetRange, sortedText);
	});
}

function countLines() {
	let activeEditor = vscode.window.activeTextEditor;
	if (!activeEditor) {
		return;
	}

	let text = activeEditor.selection.isEmpty
		? activeEditor.document.getText()
		: activeEditor.document.getText(activeEditor.selection);

	text = text.replace(/\r/g, '');

	let lineCount = text.length === 0 ? 0 : text.split('\n').length;
	let target = activeEditor.selection.isEmpty ? 'Document' : 'Selected';

	vscode.window.showInformationMessage(`${target} lines: ${lineCount}`);
}

function transformSelectedText(transform: (text: string) => string) {
	let activeEditor = vscode.window.activeTextEditor;
	if (!activeEditor || activeEditor.selection.isEmpty) {
		return;
	}

	let selectionRange = activeEditor.selection;
	let selection = activeEditor.document.getText(selectionRange);
	let transformed = transform(selection);

	activeEditor.edit((edit: TextEditorEdit) => {
		edit.replace(selectionRange, transformed);
	});
}

function parseMarkdown(text: string): MarkdownSection {
	let normalizedText = text.replace(/\r/g, '');
	let lines = normalizedText.split('\n');

	let root: MarkdownSection = {
		headerLine: '',
		title: '',
		level: 0,
		leadLines: [],
		children: []
	};

	let stack: MarkdownSection[] = [root];

	for (let line of lines) {
		let match = line.match(/^(#+) (.*)$/);

		if (!match) {
			stack[stack.length - 1].leadLines.push(line);
			continue;
		}

		let section: MarkdownSection = {
			headerLine: line,
			title: match[2],
			level: match[1].length,
			leadLines: [],
			children: []
		};

		while (stack.length > 1 && stack[stack.length - 1].level >= section.level) {
			stack.pop();
		}

		stack[stack.length - 1].children.push(section);
		stack.push(section);
	}

	return root;
}

function serializeMarkdown(root: MarkdownSection): string {
	sortMarkdownSectionChildren(root);
	return serializeMarkdownSection(root, true);
}

function sortMarkdownSectionChildren(section: MarkdownSection) {
	section.children.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));

	for (let child of section.children) {
		sortMarkdownSectionChildren(child);
	}
}

function serializeMarkdownSection(section: MarkdownSection, isRoot: boolean): string {
	let lines: string[] = [];

	if (!isRoot) {
		lines.push(section.headerLine);
	}

	lines.push(...section.leadLines);

	for (let child of section.children) {
		lines.push(...serializeMarkdownSection(child, false).split('\n'));
	}

	return lines.join('\n');
}