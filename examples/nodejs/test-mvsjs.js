

const Metaverse = require('metaversejs');
const blockchain = require('mvs-blockchain')();


(async()=>{

let target = {
    ETP: 100 //100 million units = 1 ETP
};

const address = "MNWVbJuNxq9FQNL1bWXx5sXiFRKjcFuuj9";
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

console.log(tx)
const encoded_tx = tx.encode()
// const decoded_tx = Metaverse.encoder.
console.log(encoded_tx)
// const decoded_tx = Metaverse.transaction.decode(encoded_tx.toString('hex'), 'ledger')
// Metaverse.script.fromBuffer()
// console.log(decoded_tx)
})()


// const target = [
//     Buffer.from("0300000000000000001976a914d2b0d45dfdba50fbd227f968c79a29ece05144fb88ac01000000020000000200000003444e41d204000000000000", 'hex'),
//     Buffer.from("00000000000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac01000000020000000200000003444e413e22000000000000", 'hex'),
//     Buffer.from("b0c66500000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac0100000000000000", 'hex'),
// ]

// const source = '040003482340820938409283048203840283904802384923840928394028340823098429384032804'