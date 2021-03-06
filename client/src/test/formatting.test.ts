import * as vscode from 'vscode';
import * as assert from 'assert';
import { getDocUri, activate} from './helper';

suite('Should get diagnostics', () => {
	test('formatting', async () => {
		await testformatting(getDocUri('formatting/before_formatting.ion'), getDocUri('formatting/after_formatting.ion'));
	});
});

async function testformatting(docUri_BF: vscode.Uri, docUri_AF: vscode.Uri) {
	await activate(docUri_BF);
	const textDocument_BF: vscode.TextDocument = vscode.window.activeTextEditor.document; 
	await vscode.commands.executeCommand ('editor.action.formatDocument'); 

	let textDocument_AF: vscode.TextDocument;
	await vscode.workspace.openTextDocument(docUri_AF).then(doc => {
		textDocument_AF = doc;
	});

	assert.equal(textDocument_BF.getText (), textDocument_AF.getText ()); 
}
