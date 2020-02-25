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

  let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [sender]);

  let result = await Metaverse.output.findUtxo(utxos, target, height);

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

const didRegisterTx = async (avatar_symbol, avatar_address) => {
  let change_address = avatar_address;
  let height = await blockchain.height();
  let txs = await blockchain.addresses.txs([avatar_address]);
  let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [
    avatar_address
  ]); //Get all utxo for the avatar address
  let result = await Metaverse.output.findUtxo(utxos, {}, height, 100000000); //Collect utxo to pay for the fee of 1 ETP
  let tx = await Metaverse.transaction_builder.issueDid(
    result.utxo,
    avatar_address,
    avatar_symbol,
    change_address,
    result.change,
    80000000,
    "testnet"
  );
  return tx;
};

module.exports.ETPTransferTx = ETPTransferTx;
module.exports.didRegisterTx = didRegisterTx;
