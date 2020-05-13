require('babel-polyfill')

const Metaverse = require("metaversejs");

const TransportHID = require('@ledgerhq/hw-transport-node-hid').default;
const BtcApp = require('./ledgerjs-hw-app-btc').default;


const path = "44'/2302'/1'/0/0";

const getDevice = async () => {
    let transport = await TransportHID.create();
    let ledger = new BtcApp(transport);
    ledger.close = () => transport.close();
    console.log(ledger)
    return ledger;
};

const createDummyTransaction = async function() {

    const ledger = await getDevice();
    
    // we should get this output
    /*
    Signed transaction 040000000150e0deeb9900c827aabc9dd968def72931a1b8bdba876b53e0ba1d18bbafe595010000006b483045022100b67e97d0ad6dd8ee47fc4c567e93a124ca122bf5616a3f8d90a11103cc6cfa3702202ecd2b8e5c0ab124879be8d02eca1b174def8d792a7ddf737ee8f52e0bf447d5012103b8a7892f5b333881a261465938ea4170b3387aadedc8db0b5489eba930d512bdffffffff02706f9800000000001976a914d2b0d45dfdba50fbd227f968c79a29ece05144fb88ac0100000000000000003b5808000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac010000000000000000000000
    */
    let input =  [[[{"version":Buffer.from([4,0,0,0]),"inputs":[{"prevout":Buffer.from([127,143,195,116,91,171,17,136,198,18,244,145,87,118,109,122,197,141,135,8,46,118,3,62,37,128,49,70,22,8,171,176,0,0,0,0]),"vout":0,"script":Buffer.from([72,48,69,2,33,0,188,28,103,102,147,70,206,242,176,170,180,133,72,107,25,107,58,170,57,108,208,250,198,215,81,27,218,170,199,190,23,126,2,32,97,150,115,177,59,183,247,224,3,113,219,149,13,71,163,115,55,109,39,137,207,249,163,75,192,106,68,119,13,230,110,252,1,33,3,184,167,137,47,91,51,56,129,162,97,70,89,56,234,65,112,179,56,122,173,237,200,219,11,84,137,235,169,48,213,18,189]),"sequence":Buffer.from([255,255,255,255])},{"prevout":Buffer.from([241,131,117,43,194,127,150,44,30,32,51,198,57,165,141,115,51,233,160,33,171,15,149,65,33,48,79,41,84,227,18,255,0,0,0,0]),"vout":0,"script":Buffer.from([72,48,69,2,33,0,138,31,155,87,50,106,15,71,106,112,34,235,211,87,124,246,191,104,138,189,42,245,70,149,53,189,198,185,148,254,115,61,2,32,16,137,65,125,9,88,13,60,197,247,79,148,40,244,110,163,150,78,149,44,135,194,105,102,78,91,227,16,99,238,34,203,1,33,3,184,167,137,47,91,51,56,129,162,97,70,89,56,234,65,112,179,56,122,173,237,200,219,11,84,137,235,169,48,213,18,189]),"sequence":Buffer.from([255,255,255,255])},{"prevout":Buffer.from([253,41,79,57,110,109,202,216,29,229,183,67,39,43,98,67,101,200,163,101,227,235,24,77,46,187,31,122,173,188,239,231,1,0,0,0]),"vout":1,"script":Buffer.from([72,48,69,2,33,0,131,158,211,243,203,47,42,153,237,233,14,133,17,96,231,145,132,1,83,3,15,99,211,182,58,132,57,196,216,142,137,232,2,32,95,88,141,194,35,8,80,28,219,44,67,3,147,218,195,91,3,210,14,176,126,241,22,112,163,10,79,108,25,163,246,239,1,33,3,184,167,137,47,91,51,56,129,162,97,70,89,56,234,65,112,179,56,122,173,237,200,219,11,84,137,235,169,48,213,18,189]),"sequence":Buffer.from([255,255,255,255])}],"outputs":[{"amount":Buffer.from([112,234,57,2,0,0,0,0]),"script":Buffer.from([118,169,20,210,176,212,93,253,186,80,251,210,39,249,104,199,154,41,236,224,81,68,251,136,172]),"postfix":"0100000000000000"},{"amount":Buffer.from([128,209,240,8,0,0,0,0]),"script":Buffer.from([118,169,20,160,64,123,4,164,230,92,38,158,114,84,186,26,184,74,255,189,173,110,236,136,172]),"postfix":"0100000000000000"}],"locktime":Buffer.from([0,0,0,0]),"timestamp":Buffer.from([]),"nVersionGroupId":Buffer.from([]),"nExpiryHeight":Buffer.from([]),"extraData":Buffer.from([])},1,undefined,4294967295]],["44'/2302'/0'/0/0"],"44'/2302'/0'/0/0","02706f9800000000001976a914d2b0d45dfdba50fbd227f968c79a29ece05144fb88ac0100000000000000003b5808000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac0100000000000000",undefined,1,false,undefined,[],undefined,{"version":4,"outputsPrefix":"0000","outputScriptChunks":[Buffer.from([2,112,111,152,0,0,0,0,0,25,118,169,20,210,176,212,93,253,186,80,251,210,39,249,104,199,154,41,236,224,81,68,251,136,172,1,0,0,0,0,0,0,0]),Buffer.from([0,59,88,8,0,0,0,0,25,118,169,20,160,64,123,4,164,230,92,38,158,114,84,186,26,184,74,255,189,173,110,236,136,172,1,0,0,0,0,0,0,0])]}]; 
 
    const transaction = await ledger.createPaymentTransactionNew(...input);
 
    await ledger.close();
 
    console.log('Signed transaction', transaction);
    const decoded = await Metaverse.transaction.decode(transaction);
    console.log('Signed transaction decoded');
    console.log(decoded);
    return transaction;
}

createDummyTransaction();
