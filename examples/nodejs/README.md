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