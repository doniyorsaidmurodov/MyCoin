const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('25abbbc58227eeeefcac58a2be44b6af6b25bfd867c14b8582c4544cd5c5499a');
const myWalletAddress = myKey.getPublic('hex');

let MyCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
MyCoin.addTransaction(tx1);

console.log(`\n Starting the miner...`);
MyCoin.minePendingTransactions(myWalletAddress);
console.log(`\n Balance of xavier is`, MyCoin.getBalanceOfAddress(myWalletAddress));

MyCoin.chain[1].transactions[0].amount = 1;

console.log('Is chain valid?', MyCoin.isChainValid());

// console.log(`Mining block 1...`);
// MyCoin.addBlock(new Block(1, "05/06/2017", {amount: 12}));

// console.log(`Mining block 2...`);
// MyCoin.addBlock(new Block(2, "12/05/2018", {amount: 40}));

/*
console.log(`Is blockchain valid ? ${MyCoin.isChainValid()}`);

console.log(`Changing block...`);
MyCoin.chain[1].data = {amount: 100};
console.log(`Is blockchain valid ? ${MyCoin.isChainValid()}`);

// console.log(JSON.stringify(liteCoin, null, 4));
*/

