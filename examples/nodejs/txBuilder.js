const blockchain = require("mvs-blockchain")({
  url: "https://explorer-testnet.mvs.org/api/"
});
const Metaverse = require("metaversejs");

const getAvatar = async avatar_symbol => {
  let avatarInfo = await blockchain.avatar.get(avatar_symbol);
  return avatarInfo;
};

const ETPTransferTx = async (sender, amount, recipient) => {
  let target = {
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
  ]);
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

const issueMSTTx = async (
  issuer,
  symbol,
  max_supply,
  decimalPrecision,
  description
) => {
  let avatar_info = await getAvatar(issuer);
  if (avatar_info) {
    let recipient_address = avatar_info.address;
    let change_address = avatar_info.address;

    let height = await blockchain.height();

    let txs = await blockchain.addresses.txs([recipient_address]);
    let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [
      recipient_address
    ]);

    let result = await Metaverse.output.findUtxo(utxos, {}, height, 1000000000); // Fee for MST creation is 10ETP

    let tx = await Metaverse.transaction_builder.issueAsset(
      result.utxo,
      recipient_address,
      symbol,
      max_supply,
      decimalPrecision,
      issuer,
      description,
      0,
      false,
      change_address,
      result.change,
      true,
      0,
      "testnet"
    );
    return tx;
  } else {
    console.error(
      "You need an avatar to register MST or MIT for this address."
    );
    throw "You need an avatar to register MST or MIT for this address.";
  }
};

const transferMSTTx = async (sender, amount, recipient_address, symbol) => {
  let target = {};
  target[symbol] = amount;

  change_address = sender;
  let height = await blockchain.height();
  let txs = await blockchain.addresses.txs([sender]);
  let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [sender]);
  let result = await Metaverse.output.findUtxo(utxos, target, height);
  let tx = await Metaverse.transaction_builder.send(
    result.utxo,
    recipient_address,
    undefined,
    target,
    change_address,
    result.change
  );
  return tx;
};

const registerMITTx = async (issuer, symbol, content) => {
  let avatar_info = await getAvatar(issuer);
  if (avatar_info) {
    let recipient_address = avatar_info.address;
    let change_address = recipient_address;

    let height = await blockchain.height();
    let txs = await blockchain.addresses.txs([recipient_address]);
    let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [
      recipient_address
    ]);
    let result = await Metaverse.output.findUtxo(utxos, {}, height, 10000); //Collect utxo to pay fee of 0.0001 ETP
    let tx = await Metaverse.transaction_builder.registerMIT(
      result.utxo,
      recipient_address,
      issuer,
      symbol,
      content,
      change_address,
      result.change
    );
    return tx;
  } else {
    console.error(
      "You need an avatar to register MST or MIT for this address."
    );
    throw "You need an avatar to register MST or MIT for this address.";
  }
};

const transferMITTx = async (sender_avatar, symbol, recipient_avatar) => {
  let recipient_avatar_info = await getAvatar(recipient_avatar);
  let recipient_address = recipient_avatar_info.address;

  let sender_avatar_info = await getAvatar(sender_avatar);
  let sender = sender_avatar_info.address;

  let change_address = sender;

  let height = await blockchain.height();
  let txs = await blockchain.addresses.txs([sender]);

  let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [sender]); //Get all utxo

  let results = await Promise.all([
    Metaverse.output.findUtxo(utxos, {}, height),
    Metaverse.output.filter(utxos, {
      symbol: symbol
    })
  ]);
  let tx = await Metaverse.transaction_builder.transferMIT(
    results[0].utxo.concat(results[1]),
    sender_avatar,
    recipient_address,
    recipient_avatar,
    symbol,
    change_address,
    results[0].change
  );
  return tx;
};

module.exports.ETPTransferTx = ETPTransferTx;
module.exports.didRegisterTx = didRegisterTx;
module.exports.issueMSTTx = issueMSTTx;
module.exports.transferMSTTx = transferMSTTx;
module.exports.registerMITTx = registerMITTx;
module.exports.transferMITTx = transferMITTx;
