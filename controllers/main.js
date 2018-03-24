const SHA256 = require('crypto-js/sha256');

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
        this.current = 0; //currentpop
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
        this.pendingTransactions = []; //clear pending transactions

        //loop through all pending proof of purchases and create new transaction rewarding carbonlinks propotional to the total current POP
        for(let i = 0; i < this.pendingPOP.length; i++){
            let contributionRatio = this.pendingPOP[i].amount / this.current;
            let reward = Math.floor(contributionRatio * this.miningReward);
            this.pendingTransactions.push( new Transaction(null, this.pendingPOP[i].customerAddress, reward));
            console.log(this.pendingPOP[i].customerAddress + " has been rewarded " + reward);            
        }

        //reset the block
        //will need to hanlde the case where a new pop or transaction enter the network during this proccess
        this.current = 0;
        this.pendingPOP = [];
    }
    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }
    addPOP(POP){
        this.pendingPOP.push(POP);
        this.current += POP.amount;
        
        //check to see if difficulty has been met        
        if(this.current >= this.popLimit){
            this.minePendingTransactions();
        }
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

        //possible create an object holding the current balance of each account?
        //totally unspend transaction outputs is the proper way, but more can be done here
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

//exports for express
module.exports = {
    Blockchain: Blockchain,
    Transaction: Transaction,
    POP: POP
}


