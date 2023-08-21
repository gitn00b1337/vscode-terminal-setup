import * as vscode from "vscode";

export const EXTENSION_ID = "setupTerminal";

export type SetupTerminalConfigItem = {
    command: string
};

export type SetupTerminalConfigGroup = {
    description: string
    commands: SetupTerminalConfigItem[]   
};

export type ParsedSetupTerminalConfigItem = {
    command: string
};

export type ParsedSetupTerminalConfigGroup = {
    items: ParsedSetupTerminalConfigItem[]
    internalFn?: () => void
} & vscode.QuickPickItem;

export type SetupTerminalConfig = {
    [ groupName: string ]: SetupTerminalConfigItem[]
};

/**
 * Gets the parsed command groups from the user's settings.json in .vscode
 * @returns The sanitised, parsed command groups
 */
export function getCommandGroups() {
    const config = getSettingConfig();
    return parseSettingConfig(config);
}

function getSettingConfig() {
    return vscode.workspace
        .getConfiguration()
        .get(EXTENSION_ID);
}

export function parseSettingConfig(config: any): ParsedSetupTerminalConfigGroup[] {
    if (!config) {
        return [];
    }

    return Object.keys(config)
        .reduce<ParsedSetupTerminalConfigGroup[]>((groups, groupKey) => {
            const { success, group } = parseGroup({ config, groupKey });
            
            if (!success || !group) {
                return groups;
            }
            return [
                ...groups,
                group,
            ];
        }, []);
}

type ParseGroupProps = {
    config: vscode.WorkspaceConfiguration;
    groupKey: keyof vscode.WorkspaceConfiguration
};

type ParseGroupResult = {
    success: boolean;
    group?: ParsedSetupTerminalConfigGroup;
};

function parseGroup({ config, groupKey }: ParseGroupProps): ParseGroupResult {
    const configGroup = config[groupKey];
    const { success, group } = sanitizeGroup(groupKey, configGroup as SetupTerminalConfigGroup);

    return {
        success,
        group,
    };
}

function sanitizeGroup(groupName: keyof vscode.WorkspaceConfiguration, configGroup: SetupTerminalConfigGroup): { success: boolean, group: ParsedSetupTerminalConfigGroup | undefined } {
    const isInvalid = !configGroup
        || (!isString(groupName) || !groupName?.toString()?.trim().length)
        || !Array.isArray(configGroup.commands);

    if (isInvalid) {
        return { 
            group: undefined,
            success: false
        };
    }
    
    const items = configGroup?.commands?.reduce<ParsedSetupTerminalConfigItem[]>((items, item) => {
        const isInvalid = (!isString(item.command) || !item.command?.toString()?.trim().length);

        if (isInvalid) {
            return items;
        }

        return [
            ...items,
            {
                command: item.command.trim(),   
            },
        ];
    }, []) || [];

    return {
        success: true,
        group: {
            items,
            label: groupName.toString().trim(),
            description: configGroup.description?.toString()?.trim() || '',
        }
    };
}

function isString(item: any) {
    return typeof item === 'string';
}