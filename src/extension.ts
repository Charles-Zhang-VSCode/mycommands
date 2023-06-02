// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// The extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('MyComands extension is activated!');

	// Provide implementations to the comamnds defined in the package.json file;
	// Commands defined in package.json file do not require extention to be loaded to display.
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('mycommands.sortline_csv', () => {
		let activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor) {
			return;
		}
		
		let text = activeEditor.document.getText();
		console.log(text);

		vscode.window.showInformationMessage('Done!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
