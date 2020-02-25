const blockchain = require("mvs-blockchain")({
  url: "https://explorer-testnet.mvs.org/api/"
});
const Metaverse = require("metaversejs");
const txBuilder = require("./txBuilder");

const mnemonic =
  "alcohol hammer involve little wide kitten antenna fly census escape front arctic suggest angry affair flag sick pattern potato place page reopen sing mango";

async function createWallet() {
  let wallet = await Metaverse.wallet.fromMnemonic(mnemonic, "testnet");

  addresses = await wallet.getAddresses(); // get list of addresses
  return wallet
  // console.log(addresses)
}

transferETP = async () => {
  let tx = await txBuilder.ETPTransferTx(
    "tTe1ZzgxtZ8Q6o972DJbvHTPg3Bja5wydc",
    100000000,
    "tD2tYRPZkUjTWx4RtGMKj5M1j8cJdzBR47"
  );
  let wallet = await createWallet();
  tx = await wallet.sign(tx);

  //Encode the transaction into bytecode
  tx = await tx.encode();

  //Broadcast the transaction to the metaverse network.
  tx = await blockchain.transaction.broadcast(tx.toString("hex"));
};

transferETP();
