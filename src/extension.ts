import * as vscode from 'vscode';
import { getCommandGroups } from './config';
import { showCommandsPick } from './quick-pick';
import { runCommandGroup } from './terminal';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('terminalSetup.run', getSubscription));
}

async function getSubscription() {
	const commandGroups = getCommandGroups();

	const group = await showCommandsPick(commandGroups);

	if (!group) {
		return;

	}

	runCommandGroup(group);
}

// This method is called when your extension is deactivated
export function deactivate() {}
