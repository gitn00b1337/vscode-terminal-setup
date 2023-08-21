import * as vscode from 'vscode';
import { ParsedSetupTerminalConfigGroup, } from "./config";
import { disposeAll } from './terminal';

/**
 * Shows the VS Code quick picker and returns the user selection, if selected
 * @param groups The sanitized command groups available for execution
 * @returns The user selected group or undefined
 */
export async function showCommandsPick(groups: ParsedSetupTerminalConfigGroup[]) {
    const allGroups = addInternalCommandGroups(groups);

    return await vscode.window.showQuickPick(allGroups, { matchOnDescription: true, });
}

function addInternalCommandGroups(groups: ParsedSetupTerminalConfigGroup[]): ParsedSetupTerminalConfigGroup[] {
    return [
        ...groups,
        {
            label: 'Close All Terminals',
            description: 'Closes all active terminals',
            items: [],
            internalFn: disposeAll
        }
    ];
}