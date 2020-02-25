const blockchain = require("mvs-blockchain")({
  url: "https://explorer-testnet.mvs.org/api/"
});
const Metaverse = require("metaversejs");

const ETPTransferTx = async (sender, amount, recipient) => {
  var target = {
    ETP: amount
  };

  let height = await blockchain.height();

  let txs = await blockchain.addresses.txs([sender]);

  //Get all utxo
  let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [sender]);

  //Collect enough utxos to pay for the transfer
  let result = await Metaverse.output.findUtxo(utxos, target, height);

  //Build the transaction object
  let tx = await Metaverse.transaction_builder.send(
    result.utxo,
    recipient,
    undefined,
    target,
    result.utxo[0].address,
    result.change
  );
  return tx;
};

module.exports.ETPTransferTx = ETPTransferTx;
