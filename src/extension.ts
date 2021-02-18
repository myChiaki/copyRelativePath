// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { copyRelativePathWithLine, copyRelativePathWithSelection } from './utils';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let provider1 = vscode.commands.registerCommand('copyRelativePath.copyRelativePathWitnLine', (path) => {
		copyRelativePathWithLine(path);
	});

	let provider2 = vscode.commands.registerCommand('copyRelativePath.copyRelativePathWithSelection', (path, position) => {
		copyRelativePathWithSelection();
	});

	context.subscriptions.push(provider1, provider2);
}

// this method is called when your extension is deactivated
export function deactivate() {}
