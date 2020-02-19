import TransportU2F from '@ledgerhq/hw-transport-u2f';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import BtcApp from './ledgerjs-hw-app-btc';

const getDevice = async () => {
    //let transport = await TransportU2F.create();
    let transport = await TransportWebUSB.create();
    let ledger = new BtcApp(transport);
    ledger.close = () => transport.close();
    return ledger;
}; 

const createBTCTransaction = async function() {
    let tx = await buildTx(await walletInfo.bitcoinAddress);//1
    tx = await btc.splitTransaction(await tx.encode().toString("hex"));
    const outputsScript = btc.serializeTransactionOutputs(tx);

    const ledger = await getDevice();
    let inputs = []
    let outputs = []
    let outputScriptChunks = []
    tx.inputs.forEach((tx_input, index) => {
        const input = {
            "prevout": Buffer.from(tx_input.previous_output.hash, 'hex').reverse(),
            "vout": tx_input.previous_output.index,
            "script": encodeInputScript(tx_input.script), // from metaversejs
            "sequence": Buffer.from([255,255,255,255]) // disabled
        }
        inputs.push(input);
    });
    tx.outputs.forEach((tx_output, index) => {
        const chunk = Buffer.from(tx_output.amount.toString("hex")+ tx_output.script.length.toString("hex") + tx_output.script.toString("hex") , 'hex')
        outputsScriptChunks.push(chunk)
        const output = {
            "amount": {"type":"Buffer","data": Buffer.from(tx_output.value.toString("hex"))},
            "script": outputScriptAsBuffer(tx_output),
            "postfix": attachmentAsBuffer(tx_output).toString("hex")
       }
       outputs.push(output);
    });
    let ledger_inputs = [
        [
            {
                "version":{"type":"Buffer","data":[4,0,0,0]},
                "inputs": inputs,
                "outputs": outputs,
                "locktime":{"type":"Buffer","data":[0,0,0,0]},
                "timestamp":{"type":"Buffer","data":[]},
                "nVersionGroupId":{"type":"Buffer","data":[]},
                "nExpiryHeight":{"type":"Buffer","data":[]},
                "extraData":{"type":"Buffer","data":[]}
            },
            0,
            null,
            4294967295
        ]
    ];

    let associatedKeysets = ["44'/2302'/0'/0/0", "44'/2302'/0'/0/0"];
    let changePath = "44'/2302'/0'/0/0";
    let outputsScript = outputsScript;
    let locktime = undefined;
    let sigHash = 1;
    let segwit = false;
    let initialTimestamp = undefined;
    let additionals = [];
    let expiryHeight = undefined;
    let options = {
        version: 4,
        outputsPrefix: "0808",
        outputScriptChunks: outputScriptChunks,
    };

    const transaction = await ledger.createPaymentTransactionNew(
        inputs,
        associatedKeysets,
        changePath,
        outputsScript,
        locktime,
        sigHash,
        segwit,
        initialTimestamp,
        additionals,
        expiryHeight,
        options
    );

    await ledger.close();

    return transaction;
};

createBTCTransaction();