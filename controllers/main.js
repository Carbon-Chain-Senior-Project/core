const SHA256 = require('crypto-js/sha256');
//const bc= require('express').Router();

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = Number(amount);
    }
}

class POP{
    constructor(customerAddress, businessAddress, amount){
        this.customerAddress = customerAddress;
        this.businessAddress = businessAddress;
        this.amount = Number(amount);
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = ''){
   
      this.timestamp = timestamp;
      this.transactions = transactions;
      this.previousHash = previousHash;
      this.hash = this.calculateHash();
      this.nonce=0;
    }
    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions)+ this.nonce).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty)  !== Array(difficulty +1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        
        console.log('mined block ' + this.hash)
    }
}
class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        
        
        //total number of pop need to create new block
        this.popLimit = 100
        this.current = 0;
        this.pendingPOP = [];
       
        this.pendingTransactions = [];
        this.miningReward = 100000;
    }
    //creates the starting genesis block to begin the blockchain
    createGenesisBlock(){
        return new Block("01/01/2018","Genesis block", "0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }
    minePendingTransactions()  {
        //This doesn't work on larger blockchains since you can't load in the massive number of transactions into each block
        let block = new Block(Date.now(),this.pendingTransactions);
        block.mineBlock(this.difficulty);
        console.log('block mined')
        this.chain.push(block);
        //reset pending transactions

        //distribute pop rewards here
        this.pendingTransactions = [
        ];
        for(let i = 0; i < this.pendingPOP.length; i++){
            let contributionRatio = this.pendingPOP[i].amount / this.current;
            console.log(contributionRatio);
            let reward = contributionRatio * this.miningReward;
            console.log(reward);
            console.log(this.pendingPOP[i].customerAddress);
            this.pendingTransactions.push( new Transaction(null, this.pendingPOP[i].customerAddress, Math.floor(contributionRatio * this.miningReward)));
            
        }
        this.current = 0;
        this.pendingPOP = [];
    }
    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }
    addPOP(POP){
        this.pendingPOP.push(POP);
        this.current += POP.amount;

        if(this.current >= this.popLimit){
            this.minePendingTransactions();
        }
        //check to see if difficulty has been met        
    }
    getBalanceOfAddress(address){
        let balance = 0;
        for(const block of this.chain){
            for (const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;

                }
                if(trans.toAddress === address){
                    balance = trans.amount + balance;
                }
            }
        }
        //never returned balance - wes
        return balance;
    }
    isChainValid(){
        for(let i = 1; i< this.chain.length;i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
        }
        return true;
    }
}

/*let cChain = new Blockchain();
console.log("block successfully started");
//first is sender second is receiver

cChain.createTransaction(new Transaction('address1','address2',100));
cChain.createTransaction(new Transaction('address2','address1',50));

cChain.minePendingTransactions('address1');

console.log('\n poops balance is ' + cChain.getBalanceOfAddress('poopsaddress'));
console.log('going again');
cChain.minePendingTransactions('poopsaddress');
console.log('\n poops balance is ' + cChain.getBalanceOfAddress('address1'));
*/
module.exports = {
    Blockchain: Blockchain,
    Transaction: Transaction,
    POP: POP
}


