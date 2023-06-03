// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TextEditorEdit } from 'vscode';

// The extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('MyComands extension is activated!');

	// Provide implementations to the comamnds defined in the package.json file;
	// Commands defined in package.json file do not require extention to be loaded to display.
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('mycommands.sortline_csv', sortlineCSV));
	context.subscriptions.push(vscode.commands.registerCommand('mycommands.dot_lines', dotLines));
	context.subscriptions.push(vscode.commands.registerCommand('mycommands.sort_sections', sortSections));
}

export function deactivate() {}

// Implementations
function sortlineCSV() {
	let activeEditor = vscode.window.activeTextEditor;
	if (!activeEditor) {
		return;
	}

	activeEditor.edit((edit: TextEditorEdit) => {
		if (activeEditor && !activeEditor.selection.isEmpty) {
			let selection = activeEditor.document.getText(activeEditor.selection);
			let words = selection.split(',').map(w => w.trim()).sort();
			edit.replace(activeEditor.selection, words.join(', '));
		}
	});
}
function dotLines() {
	let activeEditor = vscode.window.activeTextEditor;
	if (!activeEditor) {
		return;
	}

	activeEditor.edit((edit: TextEditorEdit) => {
		if (activeEditor && !activeEditor.selection.isEmpty) {
			let selection = activeEditor.document.getText(activeEditor.selection);
			let lines = selection.split('\n').map(w => '* ' + w.trim()).sort();
			edit.replace(activeEditor.selection, lines.join('\n'));
		}
	});
}
function sortSections() {
	vscode.window.showInformationMessage('Not implemented.');
}