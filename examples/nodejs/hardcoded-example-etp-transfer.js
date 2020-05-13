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
    /* Decoded mvs txn object: { 
       inputs: [
        {
            previous_output:Object {hash: "9bbe7c8b15c4a1a3d9d04696ff1a38ee2d6c667e712978968c…", index: 1}
            script:"[ 3045022100b784499be0a1d91ef581c1be425fdd645a120944f7a3693579343cbdbb5c67700220663b22006cecd445dfb9aa30ed2506d58195e80c9c009583d1dfbf8c92ccc7ba01 ] [ 03b8a7892f5b333881a261465938ea4170b3387aadedc8db0b5489eba930d512bd ]"
            sequence:4294967295
        }
       ],
       outputs: [
        {
            address:"MT7By3irp1nzTvha3zGe7t8h61HtUSzTAn"
            attachment:Object {version: 1, type: 0}
            script:"OP_DUP OP_HASH160 [ d2b0d45dfdba50fbd227f968c79a29ece05144fb ] OP_EQUALVERIFY OP_CHECKSIG"
            value:129990000
        },{
            address:"MNWVbJuNxq9FQNL1bWXx5sXiFRKjcFuuj9"
            attachment:Object {version: 1, type: 0}
            script:"OP_DUP OP_HASH160 [ a0407b04a4e65c269e7254ba1ab84affbdad6eec ] OP_EQUALVERIFY OP_CHECKSIG"
            value:10000000
        }
       ],
       version:4
    
    // we should get this output
    // https://explorer.mvs.org/tx/1fcdefb56e39d3940be881fff49ae0e314c1dd87538247612568dad3bba35b5a
    // signed_output = "04000000019800a4054506d68c967829717e666c2dee381aff9646d0d9a3a1c4158b7cbe9b010000006b483045022100b784499be0a1d91ef581c1be425fdd645a120944f7a3693579343cbdbb5c67700220663b22006cecd445dfb9aa30ed2506d58195e80c9c009583d1dfbf8c92ccc7ba012103b8a7892f5b333881a261465938ea4170b3387aadedc8db0b5489eba930d512bdffffffff02707dbf07000000001976a914d2b0d45dfdba50fbd227f968c79a29ece05144fb88ac010000000000000080969800000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac010000000000000000000000"
    */
    let input =  
    [
        [
            [
                {
                    "version":Buffer.from([4,0,0,0]),
                    "inputs":[
                        {
                            "prevout":Buffer.from([80,224,222,235,153,0,200,39,170,188,157,217,104,222,247,41,49,161,184,189,186,135,107,83,224,186,29,24,187,175,229,149,1,0,0,0]),
                            "vout":1,
                            "script":Buffer.from([72,48,69,2,33,0,182,126,151,208,173,109,216,238,71,252,76,86,126,147,161,36,202,18,43,245,97,106,63,141,144,161,17,3,204,108,250,55,2,32,46,205,43,142,92,10,177,36,135,155,232,208,46,202,27,23,77,239,141,121,42,125,223,115,126,232,245,46,11,244,71,213,1,33,3,184,167,137,47,91,51,56,129,162,97,70,89,56,234,65,112,179,56,122,173,237,200,219,11,84,137,235,169,48,213,18,189]),
                            "sequence":Buffer.from([255,255,255,255])
                        }
                    ],
                    "outputs":[
                        {
                            "amount":Buffer.from([112,111,152,0,0,0,0,0]),
                            "script":Buffer.from([118,169,20,210,176,212,93,253,186,80,251,210,39,249,104,199,154,41,236,224,81,68,251,136,172]),
                            "postfix":"0100000000000000"
                        },
                        {
                            "amount":Buffer.from([0,59,88,8,0,0,0,0]),
                            "script":Buffer.from([118,169,20,160,64,123,4,164,230,92,38,158,114,84,186,26,184,74,255,189,173,110,236,136,172]),
                            "postfix":"0100000000000000"
                        }
                    ],
                    "locktime":Buffer.from([0,0,0,0]),
                    "timestamp":Buffer.from([]),
                    "nVersionGroupId":Buffer.from([]),
                    "nExpiryHeight":Buffer.from([]),
                    "extraData":Buffer.from([])
                },
                1,
                null,
                4294967295
            ]
        ],
        ["44'/2302'/0'/0/0"],
        "44'/2302'/0'/0/0",
        "02707dbf07000000001976a914d2b0d45dfdba50fbd227f968c79a29ece05144fb88ac010000000000000080969800000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac0100000000000000",
        undefined,
        1,
        false,
        undefined,
        [],
        undefined,
        {
            "version":4,
            "outputsPrefix":"0000",
            "outputScriptChunks":[
                Buffer.from([2,112,125,191,7,0,0,0,0,25,118,169,20,210,176,212,93,253,186,80,251,210,39,249,104,199,154,41,236,224,81,68,251,136,172,1,0,0,0,0,0,0,0]),
                Buffer.from([128,150,152,0,0,0,0,0,25,118,169,20,160,64,123,4,164,230,92,38,158,114,84,186,26,184,74,255,189,173,110,236,136,172,1,0,0,0,0,0,0,0])
            ]
        }
    
    ]
 
    const transaction = await ledger.createPaymentTransactionNew(...input);
 
    await ledger.close();
 
    console.log('Signed transaction', transaction);
    const decoded = await Metaverse.transaction.decode(transaction);
    console.log('Signed transaction decoded');
    console.log(decoded);
    return transaction;

    /* APDU LOG 
    New APDU received:
    E042000009000000010400000001
    Init transaction parser
    Add to hash full
    04000000
    Add to hash full
    01
    Number of inputs : 1
    Process input
    New APDU received:
    E04280002550E0DEEB9900C827AABC9DD968DEF72931A1B8BDBA876B53E0BA1D18BBAFE595010000006B
    Process input
    Add to hash full
    50E0DEEB9900C827AABC9DD968DEF72931A1B8BDBA876B53E0BA1D18BBAFE59501000000
    Add to hash full
    6B
    Script to read 107
    Process input script, remaining 107
    New APDU received:
    E042800032483045022100B67E97D0AD6DD8EE47FC4C567E93A124CA122BF5616A3F8D90A11103CC6CFA3702202ECD2B8E5C0AB124879B
    Process input script, remaining 107
    Add to hash full
    483045022100B67E97D0AD6DD8EE47FC4C567E93A124CA122BF5616A3F8D90A11103CC6CFA3702202ECD2B8E5C0AB124879B
    Process input script, remaining 57
    New APDU received:
    E042800032E8D02ECA1B174DEF8D792A7DDF737EE8F52E0BF447D5012103B8A7892F5B333881A261465938EA4170B3387AADEDC8DB0B54
    Process input script, remaining 57
    Add to hash full
    E8D02ECA1B174DEF8D792A7DDF737EE8F52E0BF447D5012103B8A7892F5B333881A261465938EA4170B3387AADEDC8DB0B54
    Process input script, remaining 7
    New APDU received:
    E04280000B89EBA930D512BDFFFFFFFF
    Process input script, remaining 7
    Add to hash full
    89EBA930D512
    Process input script, remaining 1
    Disabling P2SH consumption
    Add to hash full
    BD
    Add to hash full
    FFFFFFFF
    Process input
    Input hashing done
    New APDU received:
    E04280000102
    Input hashing done
    Add to hash full
    02
    Number of outputs : 2
    New APDU received:
    E04280002A706F9800000000001976A914D2B0D45DFDBA50FBD227F968C79A29ECE05144FB88AC0100000000000000
    Add to hash full
    706F980000000000
    Add to hash full
    19
    Script to read 33
    Process output script, remaining 33
    Add to hash full
    76A914D2B0D45DFDBA50FBD227F968C79A29ECE05144FB88AC0100000000000000
    Process output script, remaining 0
    New APDU received:
    E04280002A003B5808000000001976A914A0407B04A4E65C269E7254BA1AB84AFFBDAD6EEC88AC0100000000000000
    Process output script, remaining 0
    Add to hash full
    003B580800000000
    Add to hash full
    19
    Script to read 33
    Process output script, remaining 33
    Add to hash full
    76A914A0407B04A4E65C269E7254BA1AB84AFFBDAD6EEC88AC0100000000000000
    Process output script, remaining 0
    New APDU received:
    E04280000400000000
    Process output script, remaining 0
    Output hashing done
    Add to hash full
    00000000
    Transaction parsed
    New APDU received:
    E040000015058000002C800008FE800000000000000000000000
    pin ok
    Using private component
    C7E3509E7D0C887C7363B7E5E2A0947E4B8C2A92023D9CD54E0182B044CA2F74
    To hash
    03B8A7892F5B333881A261465938EA4170B3387AADEDC8DB0B5489EBA930D512BD
    Hash160
    A0407B04A4E65C269E7254BA1AB84AFFBDAD6EEC
    Checksum
    10CEAC3C
    Length to encode 25
    To encode
    32A0407B04A4E65C269E7254BA1AB84AFFBDAD6EEC10CEAC3C
    Length encoded 34
    Encoded
    4D4E5756624A754E78713946514E4C31625758783573586946524B6A634675756A39
    Length 34
    New APDU received:
    E0440000050400000001
    Init transaction parser
    Add to hash full
    04000000
    Add to hash full
    01
    Number of inputs : 1
    Process input
    New APDU received:
    E04480003B0138320052359800A4054506D68C967829717E666C2DEE381AFF9646D0D9A3A1C4158B7CBE9B01000000003B580800000000ECA8EBB417742A9319
    Process input
    Trusted input hash
    9800A4054506D68C967829717E666C2DEE381AFF9646D0D9A3A1C4158B7CBE9B01000000
    Add to hash full
    9800A4054506D68C967829717E666C2DEE381AFF9646D0D9A3A1C4158B7CBE9B01000000
    Adding amount
    003B580800000000
    New amount
    0000000008583B00
    Add to hash full
    19
    Script to read 25
    Process input script, remaining 25
    New APDU received:
    E04480001D76A914A0407B04A4E65C269E7254BA1AB84AFFBDAD6EEC88ACFFFFFFFF
    Process input script, remaining 25
    Add to hash full
    76A914A0407B04A4E65C269E7254BA1AB84AFFBDAD6EEC88
    Process input script, remaining 1
    Disabling P2SH consumption
    Add to hash full
    AC
    Add to hash full
    FFFFFFFF
    Process input
    Input hashing done
    Presign ready
    New APDU received:
    E04AFF0015058000002C800008FE800000000000000000000000
    state=1
    Using private component
    C7E3509E7D0C887C7363B7E5E2A0947E4B8C2A92023D9CD54E0182B044CA2F74
    New APDU received:
    E04AFF0E020000
    state=1
    New APDU received:
    E04A00002B02707DBF07000000001976A914D2B0D45DFDBA50FBD227F968C79A29ECE05144FB88AC0100000000000000
    state=1
    Checksum
    9F84A9F7
    Length to encode 25
    To encode
    32D2B0D45DFDBA50FBD227F968C79A29ECE05144FB9F84A9F7
    Length encoded 34
    Encoded
    4D5437427933697270316E7A54766861337A4765377438683631487455537A54416E
    ETP_VERSION 1
    ETP_BUFF Type = 00000000
    ATTACHMENT.TYPE.ETP_TRANSFER
    ETP_OUT_TYPE 0
    New APDU received:
    E04A80002A80969800000000001976A914A0407B04A4E65C269E7254BA1AB84AFFBDAD6EEC88AC0100000000000000
    state=2
    New APDU received:
    E04800001B058000002C800008FE800000000000000000000000000000000001
    Using private component
    C7E3509E7D0C887C7363B7E5E2A0947E4B8C2A92023D9CD54E0182B044CA2F74
    Finalize hash with
    0000000001000000
    Hash1
    7B127725117C946B2AB2E7B5EB307E995CD938345D5B88E5295A889E0EDE5C59
    Hash2
    F929A42A11C8B4E9BD7AAB1B2C7E5717C6DDBEE3EEAE36EE24446885C038BE33
*/

}

createDummyTransaction();
