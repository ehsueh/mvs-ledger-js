### Getting the Metaverse app on the ledger

Once it's Ledger officially merge Metaverse codes into the main build, you will be able to install the Metaverse app from Ledger Live as you would with Bitcoin app. However since the Ledger security review process is long, we'll give a short guide of how to do it for those who can't wait and want to play with the Metaverse app on their Nano device right away!

The binary build of the app is called `app.hex`. To load it, you will first need to install the dependencies and the [python loader tool](https://github.com/LedgerHQ/blue-loader-python) in a virtual environment:
```
virtualenv ledger
source ledger/bin/activate
pip install ledgerblue
```

Now load the app by running this line and enter youru pin and confirm on the ledger device when it asks for permission to continue,
```
 python -m ledgerblue.loadApp --curve secp256k1 --tlv --targetId 0x31100004 --delete --fileName bin/app.hex --appName "Metaverse" --appVersion 1.2.9 --dataSize 0x00000040 --path "" --appFlags 0x850 --icon 010000000000000000ffffffffffff47f207f04ff24ff24ff24ff24ff24ff24ff26ffbffffffffffff
```

If you want to delete it, execute this line below. You will need to confirm the action on the ledger device too.
```
python -m ledgerblue.deleteApp --appName "Metaverse" --targetId 0x31100004
```

### How to run

Here is a js example to interact with the ledger:
```
npm i
node index.js
```

### Bolos Device Log

In debug mode, the ledger device will print its log to the console if you run the `USBTool`.
```
./usbtool -v 0x2c97 log
```
To download the tool and for more debugging tips, check out [Ledger's doc](https://ledger.readthedocs.io/en/latest/userspace/debugging.html).

### Build Metaverse App

If you want to modify the codes and the Metaverse app yourself, download the codes on master branch from this repositor
```
git clone https://github.com/smdmitry/ledger-app-metaverse
```

then run this command inside the folder where the `Makefile` is:
```
docker run -v `pwd`:/code cryptoxic/ledger-sdk 'make clean && make COIN=metaverse'
```

Note that if you don't specify `COIN`, by default, `bitcoin` will be built.

### Get Public Keys

Import requirements:
```
require('babel-polyfill')
const TransportHID = require('@ledgerhq/hw-transport-node-hid').default;
const BtcApp = require('./ledgerjs-hw-app-btc').default;
```
A function to get the ledger device:
```
const getDevice = async () => {
    let transport = await TransportHID.create();
    let ledger = new BtcApp(transport);
    ledger.close = () => transport.close();
    console.log(ledger)
    return ledger;
};
```
To get a public address, provide a derivation path to the `getWalletPublicKey()` function. `walletInfo` will contain a Metaverse address `bitcoinAddress`, chain code `chainCode` and the public key `publicKey`
```
const path = "44'/2302'/1'/0/0";
const ledger = await getDevice();
const walletInfo = await ledger.getWalletPublicKey(path);
```
To get the master extended public key for Metaverse, use Metaverse's slip number (BIP0044):
```
const xpub = await ledger.getWalletPublicKey("44'/2302'/").publicKey;
```

### Preparing the ledger txn object from Metaverse's txn object (metaversejs)
```
const mvsTxnToLedgerInput = async function(tx, path) {
    const encoded_tx = tx.encode() // modified encode.js to return {version, inputs (array of buffers), outputs (array of buffers), locktime}

    let inputs = []
    let outputs = []
    await encoded_tx.inputs.forEach((tx_input, index) => {
        const input = {
            "prevout": tx_input.slice(0,36),
            "vout": tx_input.readUInt32LE(32,36),
            "script": Metaverse.script.fromASM(tx.inputs[index].previous_output.script).buffer,
            "sequence": Buffer.from([255,255,255,255]) // disabled
        }
        inputs.push(input);
    });
    await encoded_tx.outputs.forEach((tx_output) => {
        const attachment_start = tx_output.slice(8,9)[0] + 9
        const output = {
            "amount": tx_output.slice(0,8), 
            "script": tx_output.slice(9,attachment_start), // don't pass the first byte (length)
            "postfix": tx_output.slice(attachment_start,).toString('hex')
        }
        outputs.push(output);
    });

    // append number of output to start of first chunk
    let outputScriptChunks = encoded_tx.outputs
    outputScriptChunks[0] = Buffer.concat([Buffer.from([encoded_tx.outputs.length-1]), outputScriptChunks[0]])

    let associatedKeysets = [path, path];
    let changePath = path;
    let outputsScript = Buffer.concat(outputScriptChunks).toString('hex');
    let locktime = undefined;
    let sigHash = 1;
    let segwit = false;
    let initialTimestamp = undefined;
    let additionals = [];
    let expiryHeight = undefined;
    let options = {
        version: tx.version,
        outputsPrefix: "040400",
        outputScriptChunks: outputScriptChunks,
    };

    let ledger_inputs = [
        [
            {
                "version": encoded_tx.version,
                "inputs": inputs,
                "outputs": outputs,
                "locktime": encoded_tx.locktime,
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

    const ledger_object = {
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
    }

    return ledger_object;
}
```

### Signing a transaction
```
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
)
```