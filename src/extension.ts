import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "neokeybinds" is now active!');

  let disposable = vscode.commands.registerCommand(
    "neokeybinds.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello World from neoKeybinds!");
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
