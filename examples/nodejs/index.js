require('babel-polyfill')

const Metaverse = require("metaversejs");
const Blockchain = require("mvs-blockchain");

const TransportHID = require('@ledgerhq/hw-transport-node-hid').default;
const BtcApp = require('./ledgerjs-hw-app-btc').default;

const getDevice = async () => {
    let transport = await TransportHID.create();
    let ledger = new BtcApp(transport);
    ledger.close = () => transport.close();
    console.log(ledger)
    return ledger;
};

const blockchain = Blockchain({
    url: "https://explorer.mvs.org/api/"
});   
const path = "44'/2302'/0'/0/0";

const buildTx = async address => {

    let target = {
        ETP: 100 //100 million units = 1 ETP
    };

    let recipient_address = "MT7By3irp1nzTvha3zGe7t8h61HtUSzTAn";
    let height = await blockchain.height();
    let txs = await blockchain.addresses.txs([address]);
    let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [
       address
    ]);

    console.log("MTV utxo", utxos);
    let result = await Metaverse.output.findUtxo(utxos, target, height);
    let tx = await Metaverse.transaction_builder.send(
        result.utxo,
        recipient_address,
        undefined,
        target,
        result.utxo[0].address,
        result.change
    );
    // let tx = new Metaverse.transaction()
    // tx.addInput(result.utxos.inputs.address, result.utxos.inputs.previous_output.hash, 1)
    // tx.addOutput(recipient_address, "DNA", 0.1234)
    console.log("MTV tx", tx.inputs);

    return await tx;

};


async function transferMST(amount,MSTSymbol) {

    amount = parseInt(amount * 10**4)
    recipient_address = "MNWVbJuNxq9FQNL1bWXx5sXiFRKjcFuuj9"
    from_address = "MT7By3irp1nzTvha3zGe7t8h61HtUSzTAn"
  
    let target = {};
    target[MSTSymbol] = amount
    console.log(target)
  
    change_address = from_address
    let height = await blockchain.height()
    let txs = await blockchain.addresses.txs([from_address])
    let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [from_address]) //Get all utxo
    let result = await Metaverse.output.findUtxo(utxos, target, height) //Collect utxo for given target
    let tx = await Metaverse.transaction_builder.send(result.utxo, recipient_address, undefined, target, change_address, result.change)
    // tx = await wallet.sign(tx)
    // tx = await tx.encode()
    // tx = await blockchain.transaction.broadcast(tx.toString('hex'))
    console.log(tx)
  
    return(tx)
}

const createDummyTransaction = async function() {

    const ledger = await getDevice();
    let inputs = [
        [
            {
                "version":Buffer.from([4,0,0,0]),
                "inputs":[
                    {
                        "prevout":Buffer.from([9,115,169,139,185,54,170,83,201,180,124,233,89,209,154,133,66,98,212,77,95,143,31,92,151,163,187,250,50,11,77,219,0,0,0,0]),
                        "vout":0,
                        "script":Buffer.from([72,48,69,2,33,0,163,246,111,140,197,161,139,250,253,127,241,75,234,100,207,147,82,25,16,145,7,122,94,99,106,125,39,224,112,67,76,196,2,32,42,143,248,234,124,148,89,195,0,185,135,87,115,229,109,57,161,174,163,57,122,51,125,138,252,119,123,170,8,52,117,150,1,33,2,158,152,48,13,133,142,233,12,195,56,152,76,120,79,165,195,36,24,22,91,226,215,7,35,8,172,125,95,51,136,67,176]),
                        "sequence":Buffer.from([255,255,255,255])
                    },
                    {
                        "prevout":Buffer.from([17,234,213,88,231,166,158,103,219,61,246,10,13,47,178,145,216,14,138,107,204,59,128,205,35,22,41,185,40,207,238,32,0,0,0,0]),
                        "vout":0,
                        "script":Buffer.from([71,48,68,2,32,4,106,99,102,171,243,12,137,110,97,44,27,243,41,241,185,34,96,184,216,88,9,108,217,32,253,59,7,92,235,71,2,2,32,73,236,146,199,226,7,246,119,62,21,66,5,118,187,2,71,236,151,153,122,178,3,203,107,107,77,23,3,36,178,23,238,1,33,2,158,152,48,13,133,142,233,12,195,56,152,76,120,79,165,195,36,24,22,91,226,215,7,35,8,172,125,95,51,136,67,176]),
                        "sequence":Buffer.from([255,255,255,255])
                    }
                ],
                "outputs":[
                    {
                        "amount":Buffer.from([0,0,0,0,0,0,0,0]),
                        "script":Buffer.from([118,169,20,160,64,123,4,164,230,92,38,158,114,84,186,26,184,74,255,189,173,110,236,136,172]),
                        "postfix":"01000000020000000200000003444e411027000000000000"
                    },
                    {
                        "amount":Buffer.from([0,0,0,0,0,0,0,0]),
                        "script":Buffer.from([118,169,20,210,176,212,93,253,186,80,251,210,39,249,104,199,154,41,236,224,81,68,251,136,172]),
                        "postfix":"01000000020000000200000003444e41204e000000000000"
                    },
                    {
                        "amount":Buffer.from([208,108,4,0,0,0,0,0]),
                        "script":Buffer.from([118,169,20,210,176,212,93,253,186,80,251,210,39,249,104,199,154,41,236,224,81,68,251,136,172]),
                        "postfix":"0100000000000000"
                    }
                ],
                "locktime":Buffer.from([0,0,0,0]),
                "timestamp":Buffer.from([]),
                "nVersionGroupId":Buffer.from([]),
                "nExpiryHeight":Buffer.from([]),
                "extraData":Buffer.from([])
            },
            0,
            null,
            4294967295
        ],
        [
            {
                "version":Buffer.from([4,0,0,0]),
                "inputs":[{"prevout":Buffer.from([101,186,93,104,40,49,94,170,216,189,241,144,71,230,115,250,143,110,221,57,110,14,175,16,167,179,27,212,230,49,100,20,1,0,0,0]),"vout":1,"script":Buffer.from([72,48,69,2,33,0,147,188,143,70,156,123,170,51,242,232,154,183,60,179,219,1,170,242,255,125,75,51,100,155,144,174,175,83,223,60,33,67,2,32,87,231,194,30,7,72,249,170,3,115,86,40,201,87,89,173,142,22,50,122,221,111,13,163,182,128,115,103,234,239,28,215,1,33,3,184,167,137,47,91,51,56,129,162,97,70,89,56,234,65,112,179,56,122,173,237,200,219,11,84,137,235,169,48,213,18,189]),"sequence":Buffer.from([255,255,255,255])}],
                "outputs":[{"amount":Buffer.from([224,147,4,0,0,0,0,0]),"script":Buffer.from([118,169,20,210,176,212,93,253,186,80,251,210,39,249,104,199,154,41,236,224,81,68,251,136,172]),"postfix":"0100000000000000"},{"amount":Buffer.from([192,237,101,0,0,0,0,0]),"script":Buffer.from([118,169,20,160,64,123,4,164,230,92,38,158,114,84,186,26,184,74,255,189,173,110,236,136,172]),"postfix":"0100000000000000"}],
                "locktime":Buffer.from([0,0,0,0]),
                "timestamp":Buffer.from([]),
                "nVersionGroupId":Buffer.from([]),
                "nExpiryHeight":Buffer.from([]),
                "extraData":Buffer.from([])
            },
            1,
            null,
            4294967295
        ]
    ];

    let associatedKeysets = ["44'/2302'/0'/0/0", "44'/2302'/0'/0/0"];
    let changePath = "44'/2302'/0'/0/0";
    let outputsScript = "030300000000000000001976a914d2b0d45dfdba50fbd227f968c79a29ece05144fb88ac01000000020000000200000003444e41d20400000000000000000000000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac01000000020000000200000003444e413e22000000000000b0c66500000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac0100000000000000";
    let locktime = undefined;
    let sigHash = 1;
    let segwit = false;
    let initialTimestamp = undefined;
    let additionals = [];
    let expiryHeight = undefined;
    let options = {
        version: 4,
        outputsPrefix: "040400",
        outputScriptChunks: [
            Buffer.from("0300000000000000001976a914d2b0d45dfdba50fbd227f968c79a29ece05144fb88ac01000000020000000200000003444e41d204000000000000", 'hex'),
            Buffer.from("00000000000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac01000000020000000200000003444e413e22000000000000", 'hex'),
            Buffer.from("b0c66500000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac0100000000000000", 'hex'),
        ],
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
    console.log('Signed transaction', transaction);
    return transaction;
}


const createLedgerTransaction = async function() {
    const ledger = await getDevice();
    let walletInfo = await ledger.getWalletPublicKey(path);

    // Transfer ETP
    // let tx = await buildTx(await walletInfo.bitcoinAddress); 

    // Transfer MST
    let tx = await transferMST(0.1234, "DNA");
    
    let split_tx = await ledger.splitTransaction(await tx.encode().toString("hex"));

    let inputs = []
    let outputs = []
    let outputScriptChunks = []
    await tx.inputs.forEach((tx_input, index) => {
        console.log(tx_input);    
        const input = {
            "prevout": split_tx.inputs[index].prevout,
            // "prevout": Buffer.from(tx_input.previous_output.hash, 'hex').reverse(),
            "vout": tx_input.previous_output.index,
            "script": Metaverse.script.fromASM(tx_input.previous_output.script).buffer, 
            "sequence": Buffer.from([255,255,255,255]) // disabled
        }
        inputs.push(input);
    });
    await tx.outputs.forEach((tx_output) => {
        let amount_buffer = Buffer.alloc(8)
        amount_buffer.writeInt32LE(tx_output.value)
        const output = {
            "amount": {"type":"Buffer","data": amount_buffer},
            "script": Metaverse.encoder.outputScriptAsBuffer(tx_output).slice(1), // don't pass the first byte (length)
            "postfix": Metaverse.encoder.attachmentAsBuffer(tx_output).toString("hex")
        }
        outputs.push(output);
    });
    await split_tx.outputs.forEach((tx_output) => {
        const chunk = Buffer.from(tx_output.amount.toString("hex")+ tx_output.script.length.toString(16).padStart(2,0) + tx_output.script.toString("hex") , 'hex');
        outputScriptChunks.push(chunk);
    });

    let associatedKeysets = ["44'/2302'/0'/0/0", "44'/2302'/0'/0/0"];
    let changePath = "44'/2302'/0'/0/0";
    let outputsScript = split_tx.outputs.length.toString(16).padStart(2, '0') + ledger.serializeTransactionOutputs(split_tx).toString('hex');
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

    let ledger_inputs = [
        [
            {
                "version": Buffer.from([4,0,0,0]),
                "inputs": inputs,
                "outputs": outputs,
                "locktime": Buffer.from([0,0,0,0]),
                "timestamp": Buffer.from([]),
                "nVersionGroupId": Buffer.from([]),
                "nExpiryHeight": Buffer.from([]),
                "extraData": Buffer.from([])
            },
            0,
            null,
            4294967295
        ]
    ];

    const transaction = await ledger.createPaymentTransactionNew(
        ledger_inputs,
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

    console.log('Signed transaction', transaction);

    return transaction;
};

// createDummyTransaction();
createLedgerTransaction();