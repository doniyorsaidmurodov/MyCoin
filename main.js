const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(`Block Mined: ${this.hash}`);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block(0, "06/06/2016", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    /*
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    */

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log(`Block succesfully mined!`);
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for(const block of this.chain) {
            for(const trans of block.transactions) {
                if(trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                if(trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            
            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

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