const {Blockchain, Transaction} = require('./blockchain');

let MyCoin = new Blockchain();
MyCoin.createTransaction(new Transaction('address1', 'address2', 100));
MyCoin.createTransaction(new Transaction('address2', 'address1', 30));

console.log(`\n Starting the miner...`);
MyCoin.minePendingTransactions('xaviers-address');
console.log(`\n Balance of xavier is`, MyCoin.getBalanceOfAddress('xaviers-address'));

console.log(`\n Starting the miner again...`);
MyCoin.minePendingTransactions('xaviers-address');
console.log(`\n Balance of xavier is`, MyCoin.getBalanceOfAddress('xaviers-address'));

console.log(`\n Starting the miner again...`);
MyCoin.minePendingTransactions('xaviers-address');
console.log(`\n Balance of xavier is`, MyCoin.getBalanceOfAddress('xaviers-address'));

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

