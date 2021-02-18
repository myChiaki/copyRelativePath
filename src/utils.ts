import * as vscode from 'vscode';
import { activate } from './extension';
import * as path from 'path';

function getCurrentWorkspaceUri (): vscode.Uri | undefined {
    const workspaces = vscode.workspace.workspaceFolders;
    if (workspaces?.length && workspaces.length === 1) {
        return workspaces[0].uri;
    }

    const editor = vscode.window.activeTextEditor;
    const activePageUri =  editor?.document.uri;
    const activePagePath = activePageUri?.fsPath;
    let activeWorkspaceUri = undefined;
    workspaces?.some(workspace => {
        const workspacePath = workspace.uri.path;
        if (activePagePath?.indexOf(workspacePath) === 0) {
            activeWorkspaceUri = workspace.uri;
            return true;
        }
        return false;
    });
    return activeWorkspaceUri;
}

function getRelativePath (targetUri: vscode.Uri): string {
    const targetPath = targetUri.fsPath;
    const activeWorkspaceUri = getCurrentWorkspaceUri();
    if (!activeWorkspaceUri) {
        vscode.window.showErrorMessage('The workspace of current file is not opened.');
        return targetPath;
    }

    const activeWorkspacePath = activeWorkspaceUri.fsPath;
    const relativePath = path.relative(activeWorkspacePath, targetPath);
    return relativePath;
}

function getActiveLine (): number | undefined {
    const editor = vscode.window.activeTextEditor;
    return editor?.selection.active.line && editor?.selection.active.line + 1;
}

function getSelection (): string | undefined {
    const editor = vscode.window.activeTextEditor;
    const wordPoz = editor?.document.getWordRangeAtPosition(editor.selection.active);
    const word = editor?.document.getText(wordPoz);
    return word;
}

export const copyRelativePathWithLine = (targetUri: vscode.Uri): void => {
    const relativePath = getRelativePath(targetUri);
    const activeLine = getActiveLine();
    const relPathWithLine = relativePath + ':' + activeLine;
    vscode.env.clipboard.writeText(relPathWithLine);
    vscode.window.showInformationMessage(relPathWithLine);
};

export const copyRelativePathWithSelection = (): void => {
    // const relativePath = getRelativePath(targetUri);
    const editor = vscode.window.activeTextEditor;
    const doc = editor?.document;
    const fileName = doc?.fileName || '';
    const relativePath = vscode.workspace.asRelativePath(fileName);
    const selection = getSelection();
    const relPathWithSelection = relativePath + ':' + selection;
    vscode.env.clipboard.writeText(relPathWithSelection);
    vscode.window.showInformationMessage(relPathWithSelection);
    return;
};