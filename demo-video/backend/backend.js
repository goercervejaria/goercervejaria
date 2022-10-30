const Web3 = require('web3');

const Provider = require("@truffle/hdwallet-provider");


const web3 = new Web3('https://goerli.infura.io/v3/fc2663324bd34f068c373e76c5b97edf');

//create a new account
 const account = web3.eth.accounts.create();
 //console.log(account);
web3.eth.accounts.wallet.add('0x61a28f1d6ff3ea392751821d6ea3cf72d812545d2ea63d1d0064bfd0bdc3b242')

//create a random string generator function
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    return result;

    var sign = web3.eth.account.sign(rasult,private_key);
}

function signature_gen(random, private_key){
    var sign =   web3.eth.accounts.sign(random, private_key);
// //pick value of v from array
    return sign
    var v =sign.v;
    var r = sign.r;
    var s = sign.s;
    var signature = sign.signature;

}

module.exports = { makeid, signature_gen };
