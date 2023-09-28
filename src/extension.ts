import * as vscode from "vscode";

export function activate({ subscriptions }: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "neo-keybinds" is now active!');

  const myScheme = "neo-keybinds";
  const myProvider = new (class implements vscode.TextDocumentContentProvider {
    onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
    onDidChange = this.onDidChangeEmitter.event;

    provideTextDocumentContent(uri: vscode.Uri): string {
      return cowsay.say({ text: uri.path });
    }
  })();

  let disposable = vscode.commands.registerCommand(
    "neo-keybinds.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello World from neo-keybinds!");
    }
  );

  subscriptions.push(
    vscode.workspace.registerTextDocumentContentProvider(myScheme, myProvider)
  );

  subscriptions.push(
    vscode.commands.registerCommand("cowsay.say", async () => {
      const what = await vscode.window.showInputBox({
        placeHolder: "cowsay...",
      });
      if (what) {
        const uri = vscode.Uri.parse("cowsay:" + what);
        const doc = await vscode.workspace.openTextDocument(uri);
        await vscode.window.showTextDocument(doc, { preview: false });
      }
    })
  );

  subscriptions.push(
    vscode.commands.registerCommand("cowsay.backwards", async () => {
      if (!vscode.window.activeTextEditor) {
        return;
      }
      const { document } = vscode.window.activeTextEditor;
      if (document.uri.scheme !== myScheme) {
        return;
      }
      const say = document.uri.path;
      const newSay = say.split("").reverse().join("");
      const newUri = document.uri.with({ path: newSay });
      await vscode.window.showTextDocument(newUri, { preview: false });
    })
  );

  subscriptions.push(disposable);
}

export function deactivate() {}
