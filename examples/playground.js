// import "babel-polyfill";
import React, { useEffect, useState } from "react";
import "./App.css";
import Metaverse from "metaversejs";
import Blockchain from "mvs-blockchain";

import Transport from "@ledgerhq/hw-transport-webusb";
// import Transport from "@ledgerhq/hw-transport-webhid";
import AppBtc from "@ledgerhq/ledgerjs-hw-app-btc";

function App() {
  const walletPath = "44'/2302'/0'/0/0";
  const [btc, setBtc] = useState(null);
  const [walletInfo, setWalletInfo] = useState(null);
  const [blockchain, setBlockchain] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const getBtcAddress = async () => {
      const transport = await Transport.create();
      const btc = new AppBtc(transport);
      const result = await btc.getWalletPublicKey(walletPath);
      setBtc(btc);
      setWalletInfo(result);
    };
    getBtcAddress();
  }, []);

  useEffect(() => {
    setBlockchain(
      Blockchain({
        url: "https://explorer.mvs.org/api/"
      })
    );

    const getBalance = async address => {
      let blockchain = Blockchain({
        url: "https://explorer.mvs.org/api/"
      });

      let height = await blockchain.height();

      let txs = await blockchain.addresses.txs([address]);

      let utxo = await Metaverse.output.calculateUtxo(
        txs.transactions,
        address
      );

      let balances = await blockchain.balance.all(utxo, address, height);
      setBalance(balances);
    };

    if (walletInfo) {
      getBalance(walletInfo.bitcoinAddress);
    }
  }, [walletInfo]);

  const getDevice = async () => {
    //let transport = await TransportU2F.create();
    let transport = await Transport.create();
    let ledger = new AppBtc(transport);
    ledger.close = () => transport.close();
    return ledger;
  };

  const createBTCTransaction = async function() {
    alert(1)
    const ledger = await getDevice();
    console.log(ledger);
    let inputs = [
        [
            {
                "version":{"type":"Buffer","data":[4,0,0,0]},
                "inputs":[
                    {
                        "prevout":{"type":"Buffer","data":[9,115,169,139,185,54,170,83,201,180,124,233,89,209,154,133,66,98,212,77,95,143,31,92,151,163,187,250,50,11,77,219,0,0,0,0]},
                        "vout":0,
                        "script":{"type":"Buffer","data":[72,48,69,2,33,0,163,246,111,140,197,161,139,250,253,127,241,75,234,100,207,147,82,25,16,145,7,122,94,99,106,125,39,224,112,67,76,196,2,32,42,143,248,234,124,148,89,195,0,185,135,87,115,229,109,57,161,174,163,57,122,51,125,138,252,119,123,170,8,52,117,150,1,33,2,158,152,48,13,133,142,233,12,195,56,152,76,120,79,165,195,36,24,22,91,226,215,7,35,8,172,125,95,51,136,67,176]},
                        "sequence":{"type":"Buffer","data":[255,255,255,255]}
                    },
                    {
                        "prevout":{"type":"Buffer","data":[17,234,213,88,231,166,158,103,219,61,246,10,13,47,178,145,216,14,138,107,204,59,128,205,35,22,41,185,40,207,238,32,0,0,0,0]},
                        "vout":0,
                        "script":{"type":"Buffer","data":[71,48,68,2,32,4,106,99,102,171,243,12,137,110,97,44,27,243,41,241,185,34,96,184,216,88,9,108,217,32,253,59,7,92,235,71,2,2,32,73,236,146,199,226,7,246,119,62,21,66,5,118,187,2,71,236,151,153,122,178,3,203,107,107,77,23,3,36,178,23,238,1,33,2,158,152,48,13,133,142,233,12,195,56,152,76,120,79,165,195,36,24,22,91,226,215,7,35,8,172,125,95,51,136,67,176]},
                        "sequence":{"type":"Buffer","data":[255,255,255,255]}
                    }
                ],
                "outputs":[
                    {
                        "amount":{"type":"Buffer","data":[0,0,0,0,0,0,0,0]},
                        "script":{"type":"Buffer","data":[118,169,20,160,64,123,4,164,230,92,38,158,114,84,186,26,184,74,255,189,173,110,236,136,172]},
                        "postfix":"01000000020000000200000003444e411027000000000000"
                    },
                    {
                        "amount":{"type":"Buffer","data":[0,0,0,0,0,0,0,0]},
                        "script":{"type":"Buffer","data":[118,169,20,210,176,212,93,253,186,80,251,210,39,249,104,199,154,41,236,224,81,68,251,136,172]},
                        "postfix":"01000000020000000200000003444e41204e000000000000"
                    },
                    {
                        "amount":{"type":"Buffer","data":[208,108,4,0,0,0,0,0]},
                        "script":{"type":"Buffer","data":[118,169,20,210,176,212,93,253,186,80,251,210,39,249,104,199,154,41,236,224,81,68,251,136,172]},
                        "postfix":"0100000000000000"
                    }
                ],
                "locktime":{"type":"Buffer","data":[0,0,0,0]},
                "timestamp":{"type":"Buffer","data":[]},
                "nVersionGroupId":{"type":"Buffer","data":[]},
                "nExpiryHeight":{"type":"Buffer","data":[]},
                "extraData":{"type":"Buffer","data":[]}
            },
            0,
            null,
            4294967295
        ],
        [
            {
                "version":{"type":"Buffer","data":[4,0,0,0]},
                "inputs":[{"prevout":{"type":"Buffer","data":[101,186,93,104,40,49,94,170,216,189,241,144,71,230,115,250,143,110,221,57,110,14,175,16,167,179,27,212,230,49,100,20,1,0,0,0]},"vout":1,"script":{"type":"Buffer","data":[72,48,69,2,33,0,147,188,143,70,156,123,170,51,242,232,154,183,60,179,219,1,170,242,255,125,75,51,100,155,144,174,175,83,223,60,33,67,2,32,87,231,194,30,7,72,249,170,3,115,86,40,201,87,89,173,142,22,50,122,221,111,13,163,182,128,115,103,234,239,28,215,1,33,3,184,167,137,47,91,51,56,129,162,97,70,89,56,234,65,112,179,56,122,173,237,200,219,11,84,137,235,169,48,213,18,189]},"sequence":{"type":"Buffer","data":[255,255,255,255]}}],
                "outputs":[{"amount":{"type":"Buffer","data":[224,147,4,0,0,0,0,0]},"script":{"type":"Buffer","data":[118,169,20,210,176,212,93,253,186,80,251,210,39,249,104,199,154,41,236,224,81,68,251,136,172]},"postfix":"0100000000000000"},{"amount":{"type":"Buffer","data":[192,237,101,0,0,0,0,0]},"script":{"type":"Buffer","data":[118,169,20,160,64,123,4,164,230,92,38,158,114,84,186,26,184,74,255,189,173,110,236,136,172]},"postfix":"0100000000000000"}],
                "locktime":{"type":"Buffer","data":[0,0,0,0]},
                "timestamp":{"type":"Buffer","data":[]},
                "nVersionGroupId":{"type":"Buffer","data":[]},
                "nExpiryHeight":{"type":"Buffer","data":[]},
                "extraData":{"type":"Buffer","data":[]}
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
            "0300000000000000001976a914d2b0d45dfdba50fbd227f968c79a29ece05144fb88ac01000000020000000200000003444e41d204000000000000",
            "00000000000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac01000000020000000200000003444e413e22000000000000",
            "b0c66500000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac0100000000000000",
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

    return transaction;
  };

  const buildTx = async address => {
    if (blockchain && balance && btc) {
      let target = {
        ETP: 100 //100 million units = 1 ETP
      };

      let recipient_address = "MT7By3irp1nzTvha3zGe7t8h61HtUSzTAn";
      let height = await blockchain.height();
      let txs = await blockchain.addresses.txs([address]);
      let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [
        address
      ]);

      console.log("MTV utxo",utxos);
      let result = await Metaverse.output.findUtxo(utxos, target, height);
      let tx = await Metaverse.transaction_builder.send(
        result.utxo,
        recipient_address,
        undefined,
        target,
        result.utxo[0].address,
        result.change
      );
      console.log("MTV tx",await tx);

      return await tx;
    }
  };

  const ledgerSignMsg = async tx => {
    if (btc) {
      let result = await btc.signMessageNew(
        walletPath,
        Buffer.from("test").toString("hex")
      );
      console.log(await result);
    } else {
      console.warn("BTC NOT DEFINED YET");
    }
  };

  const ledgerSignTx = async () => {
    if (btc && walletInfo) {
      let tx = await buildTx(await walletInfo.bitcoinAddress);//1
      console.log("1tx in ledgerSing",tx)
      console.log("2",await tx.encode())//2
      let decode = await tx.encode();
      let txN = Metaverse.encoder.decodeTransaction(new Metaverse.transaction(),
        await decode,"mainnet");
      console.log('3obj',txN)//3
      console.log("4",await txN.encode());//4
      // console.log(Buffer.from(JSON.stringify(txN)).toJSON())
      // let equal = false;
      // for(let i =0; i < decode.length; i++) {
      //   if(decode[i] === txN.encode()[i]) {
      //       equal = true;
      //   }else {
      //     equal = false;
      //   }
      // }

      // console.log("5", equal)
      const tx1 = await btc.splitTransaction(await tx.encode().toString("hex"));
      
      console.log(tx1);

      const outputsScript = btc.serializeTransactionOutputs(tx1);
      console.log(outputsScript.toString("hex"))
      // let tx2 = btc.serializeTransaction(tx1) //tx.encode() in MetaverseJs
      // console.log(tx2);
      console.log("SVEN",Metaverse.script.fromASM(tx.inputs[0].previous_output.script).buffer)
      let inputs = [
        [{
          "version":Buffer.from( [4, 0, 0, 0] ),
          "inputs": [
            {
              "prevout": Buffer.from([
                  200,
                  198,
                  244,
                  154,
                  224,
                  61,
                  44,
                  38,
                  3,
                  100,
                  185,
                  65,
                  172,
                  161,
                  53,
                  91,
                  181,
                  132,
                  149,
                  119,
                  40,
                  253,
                  4,
                  167,
                  98,
                  95,
                  156,
                  22,
                  208,
                  172,
                  234,
                  79,
                  1,
                  0,
                  0,
                  0
                ]),
              "vout": 0,
              "script":Buffer.from([71,48,68,2,32,4,106,99,102,171,243,12,137,110,97,44,27,243,41,241,185,34,96,184,216,88,9,108,217,32,253,59,7,92,235,71,2,2,32,73,236,146,199,226,7,246,119,62,21,66,5,118,187,2,71,236,151,153,122,178,3,203,107,107,77,23,3,36,178,23,238,1,33,2,158,152,48,13,133,142,233,12,195,56,152,76,120,79,165,195,36,24,22,91,226,215,7,35,8,172,125,95,51,136,67,176]),
              "sequence":Buffer.from( [255, 255, 255, 255] ),
              
            }
          ],
          "outputs": [
            {
              "amount": Buffer.from([100, 0, 0, 0, 0, 0, 0, 0] ),
              "script": Buffer.from([
                  118,
                  169,
                  20,
                  210,
                  176,
                  212,
                  93,
                  253,
                  186,
                  80,
                  251,
                  210,
                  39,
                  249,
                  104,
                  199,
                  154,
                  41,
                  236,
                  224,
                  81,
                  68,
                  251,
                  136,
                  172
                ]),
              "postfix": "0100000000"
            },
            {
              "amount":Buffer.from([1, 0, 0, 0, 0, 0, 0, 0] ),
              "script": Buffer.from([
                  139,
                  214,
                  11,
                  0,
                  0,
                  0,
                  0,
                  25,
                  118,
                  169,
                  20,
                  160,
                  64,
                  123,
                  4,
                  164,
                  230,
                  92,
                  38,
                  158,
                  114,
                  84,
                  186,
                  26,
                  184,
                  74,
                  255,
                  189,
                  173,
                  110,
                  236,
                  136,
                  172,
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0
                ]),
              "postfix": "0100000000"
            }
          ],
          "locktime":Buffer.from([0,0,0,0] ),
          "timestamp": Buffer.from([]),
          "nVersionGroupId": Buffer.from([]),
          "nExpiryHeight": Buffer.from([]),
          "extraData": Buffer.from([])
        }
        ,0,null]
      ]

      tx1.outputs[0]["postfix"] = "0100000000"
      tx1.outputs[1]["postfix"] = "0100000000"

      console.log("02"+tx1.outputs[0].amount.toString("hex")+ "19" + tx1.outputs[0].script.toString("hex") + tx1.outputs[1].amount.toString("hex") + "2d" + tx1.outputs[1].script.toString("hex"))
      console.log(JSON.stringify(tx1))
      let options = {
        version: 4,
        outputsPrefix: "0808",
        outputScriptChunks: [
            Buffer.from(tx1.outputs[0].amount.toString("hex")+ "19" + tx1.outputs[0].script.toString("hex") , 'hex'),
            Buffer.from(tx1.outputs[1].amount.toString("hex") + "2d" + tx1.outputs[1].script.toString("hex"), 'hex')
        ],
    };

    let locktime = undefined;
    let sigHash = 1;
    let segwit = false;
    let initialTimestamp = undefined;
    let additionals = [];
    let expiryHeight = undefined;

    let associatedKeysets = ["44'/2302'/0'/0/0", "44'/2302'/0'/0/0"];
    let changePath = "44'/2302'/0'/0/0";

    let outTx = await btc.createPaymentTransactionNew(
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

    console.log(await outTx)
      

      //   var tx = new Metaverse.transaction()
      //   //Add inputs
      //   tx.addInput("MT7By3irp1nzTvha3zGe7t8h61HtUSzTAn", "3b5c02c2315ea52d6256b8c078ea08fd51c5bf1663d17e6e088cdc34f94c2491", 1)

      //   //Add outputs
      //   var total = 0.2126
      //   var amount = 0.0126
      //   var change = total - amount
      //   const decimal = 10 ^ 8

      //   tx.addOutput("MNWVbJuNxq9FQNL1bWXx5sXiFRKjcFuuj9", "ETP", parseInt(amount * decimal))
      //   tx.addOutput("MT7By3irp1nzTvha3zGe7t8h61HtUSzTAn", "ETP", parseInt(change * decimal))
      //   console.log('transaction details: ' + tx)

      //   let buffer = tx.encode()
      //   console.log(buffer)
      //   let inputs = [
      //     [
      //         {
      //             "version": { "type": "Buffer", "data": [4, 0, 0, 0] },
      //             "inputs": [
      //                 {
      //                     "prevout": { "type": "Buffer", "data": [9, 115, 169, 139, 185, 54, 170, 83, 201, 180, 124, 233, 89, 209, 154, 133, 66, 98, 212, 77, 95, 143, 31, 92, 151, 163, 187, 250, 50, 11, 77, 219, 0, 0, 0, 0] },
      //                     "vout": 0,
      //                     "script": { "type": "Buffer", "data": [72, 48, 69, 2, 33, 0, 163, 246, 111, 140, 197, 161, 139, 250, 253, 127, 241, 75, 234, 100, 207, 147, 82, 25, 16, 145, 7, 122, 94, 99, 106, 125, 39, 224, 112, 67, 76, 196, 2, 32, 42, 143, 248, 234, 124, 148, 89, 195, 0, 185, 135, 87, 115, 229, 109, 57, 161, 174, 163, 57, 122, 51, 125, 138, 252, 119, 123, 170, 8, 52, 117, 150, 1, 33, 2, 158, 152, 48, 13, 133, 142, 233, 12, 195, 56, 152, 76, 120, 79, 165, 195, 36, 24, 22, 91, 226, 215, 7, 35, 8, 172, 125, 95, 51, 136, 67, 176] },
      //                     "sequence": { "type": "Buffer", "data": [255, 255, 255, 255] }
      //                 },
      //                 {
      //                     "prevout": { "type": "Buffer", "data": [17, 234, 213, 88, 231, 166, 158, 103, 219, 61, 246, 10, 13, 47, 178, 145, 216, 14, 138, 107, 204, 59, 128, 205, 35, 22, 41, 185, 40, 207, 238, 32, 0, 0, 0, 0] },
      //                     "vout": 0,
      //                     "script": { "type": "Buffer", "data": [71, 48, 68, 2, 32, 4, 106, 99, 102, 171, 243, 12, 137, 110, 97, 44, 27, 243, 41, 241, 185, 34, 96, 184, 216, 88, 9, 108, 217, 32, 253, 59, 7, 92, 235, 71, 2, 2, 32, 73, 236, 146, 199, 226, 7, 246, 119, 62, 21, 66, 5, 118, 187, 2, 71, 236, 151, 153, 122, 178, 3, 203, 107, 107, 77, 23, 3, 36, 178, 23, 238, 1, 33, 2, 158, 152, 48, 13, 133, 142, 233, 12, 195, 56, 152, 76, 120, 79, 165, 195, 36, 24, 22, 91, 226, 215, 7, 35, 8, 172, 125, 95, 51, 136, 67, 176] },
      //                     "sequence": { "type": "Buffer", "data": [255, 255, 255, 255] }
      //                 }
      //             ],
      //             "outputs": [
      //                 {
      //                     "amount": { "type": "Buffer", "data": [0, 0, 0, 0, 0, 0, 0, 0] },
      //                     "script": { "type": "Buffer", "data": [118, 169, 20, 160, 64, 123, 4, 164, 230, 92, 38, 158, 114, 84, 186, 26, 184, 74, 255, 189, 173, 110, 236, 136, 172] },
      //                     "postfix": "01000000020000000200000003444e411027000000000000"
      //                 },
      //                 {
      //                     "amount": { "type": "Buffer", "data": [0, 0, 0, 0, 0, 0, 0, 0] },
      //                     "script": { "type": "Buffer", "data": [118, 169, 20, 210, 176, 212, 93, 253, 186, 80, 251, 210, 39, 249, 104, 199, 154, 41, 236, 224, 81, 68, 251, 136, 172] },
      //                     "postfix": "01000000020000000200000003444e41204e000000000000"
      //                 },
      //                 {
      //                     "amount": { "type": "Buffer", "data": [208, 108, 4, 0, 0, 0, 0, 0] },
      //                     "script": { "type": "Buffer", "data": [118, 169, 20, 210, 176, 212, 93, 253, 186, 80, 251, 210, 39, 249, 104, 199, 154, 41, 236, 224, 81, 68, 251, 136, 172] },
      //                     "postfix": "0100000000000000"
      //                 }
      //             ],
      //             "locktime": { "type": "Buffer", "data": [0, 0, 0, 0] },
      //             "timestamp": { "type": "Buffer", "data": [] },
      //             "nVersionGroupId": { "type": "Buffer", "data": [] },
      //             "nExpiryHeight": { "type": "Buffer", "data": [] },
      //             "extraData": { "type": "Buffer", "data": [] }
      //         },
      //         0,
      //         null,
      //         4294967295
      //     ],
      //     [
      //         {
      //             "version": { "type": "Buffer", "data": [4, 0, 0, 0] },
      //             "inputs": [{ "prevout": { "type": "Buffer", "data": [101, 186, 93, 104, 40, 49, 94, 170, 216, 189, 241, 144, 71, 230, 115, 250, 143, 110, 221, 57, 110, 14, 175, 16, 167, 179, 27, 212, 230, 49, 100, 20, 1, 0, 0, 0] }, "vout": 1, "script": { "type": "Buffer", "data": [72, 48, 69, 2, 33, 0, 147, 188, 143, 70, 156, 123, 170, 51, 242, 232, 154, 183, 60, 179, 219, 1, 170, 242, 255, 125, 75, 51, 100, 155, 144, 174, 175, 83, 223, 60, 33, 67, 2, 32, 87, 231, 194, 30, 7, 72, 249, 170, 3, 115, 86, 40, 201, 87, 89, 173, 142, 22, 50, 122, 221, 111, 13, 163, 182, 128, 115, 103, 234, 239, 28, 215, 1, 33, 3, 184, 167, 137, 47, 91, 51, 56, 129, 162, 97, 70, 89, 56, 234, 65, 112, 179, 56, 122, 173, 237, 200, 219, 11, 84, 137, 235, 169, 48, 213, 18, 189] }, "sequence": { "type": "Buffer", "data": [255, 255, 255, 255] } }],
      //             "outputs": [{ "amount": { "type": "Buffer", "data": [224, 147, 4, 0, 0, 0, 0, 0] }, "script": { "type": "Buffer", "data": [118, 169, 20, 210, 176, 212, 93, 253, 186, 80, 251, 210, 39, 249, 104, 199, 154, 41, 236, 224, 81, 68, 251, 136, 172] }, "postfix": "0100000000000000" }, { "amount": { "type": "Buffer", "data": [192, 237, 101, 0, 0, 0, 0, 0] }, "script": { "type": "Buffer", "data": [118, 169, 20, 160, 64, 123, 4, 164, 230, 92, 38, 158, 114, 84, 186, 26, 184, 74, 255, 189, 173, 110, 236, 136, 172] }, "postfix": "0100000000000000" }],
      //             "locktime": { "type": "Buffer", "data": [0, 0, 0, 0] },
      //             "timestamp": { "type": "Buffer", "data": [] },
      //             "nVersionGroupId": { "type": "Buffer", "data": [] },
      //             "nExpiryHeight": { "type": "Buffer", "data": [] },
      //             "extraData": { "type": "Buffer", "data": [] }
      //         },
      //         1,
      //         null,
      //         4294967295
      //     ]
      // ];

      // let associatedKeysets = ["44'/2302'/0'/0/0", "44'/2302'/0'/0/0"];
      // let changePath = "44'/2302'/0'/0/0";
      // let outputsScript = "030300000000000000001976a914d2b0d45dfdba50fbd227f968c79a29ece05144fb88ac01000000020000000200000003444e41d20400000000000000000000000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac01000000020000000200000003444e413e22000000000000b0c66500000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac0100000000000000";

      // let locktime = undefined;
      // let sigHash = 1;
      // let segwit = false;
      // let initialTimestamp = undefined;
      // let additionals = [];
      // let expiryHeight = undefined;
      // let options = undefined;
      // // {
      // //     version: 4,
      // //     outputsPrefix: "040400",
      // //     outputScriptChunks: [buffer],
      // // };

      // const transaction = await btc.createPaymentTransactionNew(
      //     inputs,
      //     associatedKeysets,
      //     changePath,
      //     outputsScript,
      //     locktime,
      //     sigHash,
      //     segwit,
      //     initialTimestamp,
      //     additionals,
      //     expiryHeight,
      //     options
      // );
      // console.log(transaction)
    } else {
      console.warn("BTC OR WALLET INFO NOT DEFINED YET");
    }
  };

  const buildArrayTx = async ()=>{
    let inputs = [
      [
          {
              "version":Buffer.from([4,0,0,0]),
              "inputs":[
                  {
                      "prevout":Buffer.from([200, 198, 244, 154, 224, 61, 44, 38, 3, 100, 185, 65, 172, 161, 53, 91, 181, 132, 149, 119, 40, 253, 4, 167, 98, 95, 156, 22, 208, 172, 234, 79, 1, 0, 0, 0]),
                      "vout":0,
                      "script":Buffer.from([72,48,69,2,33,0,163,246,111,140,197,161,139,250,253,127,241,75,234,100,207,147,82,25,16,145,7,122,94,99,106,125,39,224,112,67,76,196,2,32,42,143,248,234,124,148,89,195,0,185,135,87,115,229,109,57,161,174,163,57,122,51,125,138,252,119,123,170,8,52,117,150,1,33,2,158,152,48,13,133,142,233,12,195,56,152,76,120,79,165,195,36,24,22,91,226,215,7,35,8,172,125,95,51,136,67,176]),
                      "sequence":Buffer.from([255,255,255,255])
                  }
              ],
              "outputs":[
                  {
                      "amount":Buffer.from([100, 0, 0, 0, 0, 0, 0, 0]),
                      "script":Buffer.from([118, 169, 20, 210, 176, 212, 93, 253, 186, 80, 251, 210, 39, 249, 104, 199, 154, 41, 236, 224, 81, 68, 251, 136, 172]),
                      "postfix":"01000000020000000200000003444e411027000000000000"
                  },
                  {
                      "amount":Buffer.from([1, 0, 0, 0, 0, 0, 0, 0]),
                      "script":Buffer.from([139, 214, 11, 0, 0, 0, 0, 25, 118, 169, 20, 160, 64, 123, 4, 164, 230, 92, 38, 158, 114, 84, 186, 26, 184, 74, 255, 189, 173, 110, 236, 136, 172, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                      "postfix":"01000000020000000200000003444e41204e000000000000"
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
          
      ]
  ];

  let associatedKeysets = ["44'/2302'/0'/0/0", "44'/2302'/0'/0/0"];
  let changePath = "44'/2302'/0'/0/0";
  let outputsScript = "020300000000000000001976a914d2b0d45dfdba50fbd227f968c79a29ece05144fb88ac01000000020000000200000003444e41d20400000000000000000000000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac01000000020000000200000003444e413e22000000000000b0c66500000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac0100000000000000";
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
          Buffer.from("0200000000000000001976a914d2b0d45dfdba50fbd227f968c79a29ece05144fb88ac01000000020000000200000003444e41d204000000000000", 'hex'),
          Buffer.from("00000000000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac01000000020000000200000003444e413e22000000000000", 'hex'),
          Buffer.from("b0c66500000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac0100000000000000", 'hex'),
      ],
  };
  const transaction = await btc.createPaymentTransactionNew(
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

  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <code>MetaLedger</code>
        </p>
        <a
          className="App-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={ledgerSignTx}
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
