## VSCode Terminal Setup

This extension lets you setup your terminals with two clicks. If you have multiple services you need to run (e.g. microservices) you can just set the configuration up once in your .vscode/settings.json and then from then on you can just execute the batch via command palette!

## Setup

Go to your ./vscode.settings.json and add the following:

```
{
    "setupTerminal": {
        "cmd1": {
            "description": "The description of you command batch e.g. Run backend",
            "commands": [
                {
                    "command": "your first terminal command e.g. yarn start:dev"
                },
                {
                    "command": "your second terminal command e.g. yarn start:dev"
                },
            ]
        }
    }
}
```

Edit the fields as necessary. Then open your command palette, and run:

```> Setup terminal```

Your command groups will appear below on hitting enter. Select your group to run the commands!

