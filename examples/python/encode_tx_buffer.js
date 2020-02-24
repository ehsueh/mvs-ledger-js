const Metaverse = require('metaversejs')


//Transaction object
const from = "MT7By3irp1nzTvha3zGe7t8h61HtUSzTAn"
const to = "MNWVbJuNxq9FQNL1bWXx5sXiFRKjcFuuj9"
const utxo = "bfeafe95b4865b518b4c81a2e6ca6e3fc1bab5ff6f05688796681ffc13cc8e90"
const asset = "DNA"
let tx = new Metaverse.transaction()
//Add inputs // we don't care about adding input (just want the encoded output)
//tx.addInput(from, utxo, 0)

//Add outputs
const total = 0.8
const amount = 0.1
const change = total - amount
const decimal = 4 - 2

// The above will always generate the encoded output buffer with this prefix and suffix
const prefix = "04000000000100000000000000001976a914a0407b04a4e65c269e7254ba1ab84affbdad6eec88ac"
const suffix = "00000000"

/* Current Metaverse supported operations:
https://docs.mvs.org/developers/mvs-transaction-format-and-signing.html#Output-attachment
    1. etp transfer
    2. other mst creation
    3  other mst transfer
    4. attach blockchain message
    5. did creation
    6. did transfer
    7. asset_cert creation (e.g. domain, naming, mining, witness, marriage, kyc)
    8. asset_mit creation
    9. asset_mit transfer
*/

// case 1
// tx.addOutput(to, asset, parseInt(amount * 10 ^ decimal))

// case 2

// case 3
//tx.addMessage(to, "12345678901234567890");

// case 4

// case 5

registerMIT(utxo, recipient_address, issuer_avatar, symbol, content, change_address, change, fee)

// case 6

// case 7

// case 8

// case 9

// Don't care about change either
//  tx.addOutput(from, asset, parseInt(change * 10 ^ decimal))

let buffer = tx.encode().toString("hex").toUpperCase()
console.log(buffer.substring(prefix.length,buffer.length-suffix.length))
