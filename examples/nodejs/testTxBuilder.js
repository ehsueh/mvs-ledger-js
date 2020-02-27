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
  return wallet;
  // console.log(addresses)
}

// transferETP = async () => {
//   let tx = await txBuilder.ETPTransferTx(
//     "tTe1ZzgxtZ8Q6o972DJbvHTPg3Bja5wydc",
//     100000000,
//     "tD2tYRPZkUjTWx4RtGMKj5M1j8cJdzBR47"
//   );
//   let wallet = await createWallet();
//   tx = await wallet.sign(tx);
//   tx = await tx.encode();
//   tx = await blockchain.transaction.broadcast(tx.toString("hex"));
//   console.log("txHash in test file ==>\n", tx);
// };

// transferETP();

// registerAvatar = async () => {
//   let tx = await txBuilder.didRegisterTx(
//     "lilSister",
//     "tD2tYRPZkUjTWx4RtGMKj5M1j8cJdzBR47"
//   );
//   console.log("didRegister tx in test file => \n", tx);
//   let wallet = await createWallet();
//   tx = await wallet.sign(tx);
//   tx = await tx.encode();
//   tx = await blockchain.transaction.broadcast(tx.toString("hex"));
//   console.log("txHash in test file ==>\n", tx);
// };

// registerAvatar();

const issueMST = async () => {
  let tx = await txBuilder.issueMSTTx(
    "lilSister",
    "MSTTTTT",
    1000000,
    4,
    "description for MST.Symbol"
  );
  let wallet = await createWallet();
  tx = await wallet.sign(tx)
  tx = await tx.encode()
  tx = await blockchain.transaction.broadcast(tx.toString('hex'))
  console.log("TxHash in test file =>", tx)
};

issueMST();
// const getAvatar = async avatar_symbol => {
//   let avatarInfo = await blockchain.avatar.get(avatar_symbol);
//   console.log(avatarInfo)
//   return avatarInfo;
// };

// getAvatar("lilSister")
