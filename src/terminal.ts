import * as vscode from 'vscode';
import { ParsedSetupTerminalConfigGroup } from "./config";

export function runCommandGroup(group: ParsedSetupTerminalConfigGroup) {
    for (const item of group.items) {
        const terminal = vscode.window.createTerminal();
        terminal.show();

        terminal.sendText(item.command, true);
    }
}

export function disposeAll() {
    const terminals = vscode.window.terminals;

    for (const terminal of terminals) {
        terminal.dispose();
        terminal.hide();
    }
}