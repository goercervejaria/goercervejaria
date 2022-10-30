import Web3 from "web3";
import { contractABI, contractAddress } from "../constants";

let selectedAccount;

export async function initWeb3() {
    if (typeof window.ethereum == "undefined") {
        console.log("no metamask")
    }
    window.web3x = new Web3(window.ethereum);
    return new Promise((r) => setTimeout(r, 2000))
}

export async function getAccount(){

    try {
        let accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        selectedAccount = await accounts[0]
        console.log("selected Account: ", selectedAccount)
        return selectedAccount;

    } catch (e) {
        console.log("couldn't connect to mm accounts", e)
    }

}

async function createEventListener(getLastBeerInfo) {
    console.log("creating event listener")
    const contract = new window.web3x.eth.Contract(contractABI, contractAddress);
    contract.once('CreateRandNft', {
    }, function(error, event){ 
        console.log(event);
        console.log(error)
        let tokenId = event.returnValues.tokenId;
        let nftName = event.returnValues.nftName;
        getLastBeerInfo(tokenId, nftName);
    });


}

export async function mintNFT(getLastBeerInfo){
    console.log("minting NFT, provider: ", window.web3x)
    let contract = new window.web3x.eth.Contract(contractABI, contractAddress);
    // call the request random words function to generate a random number
    // after a while, a random no is geerated and mint nft fn is called (through chainlink)
    let txResult = await contract.methods.requestRandomWords().send({ from: selectedAccount });
    console.log(txResult)
    createEventListener(getLastBeerInfo);
}

export async function getTokenCounter() {
    let contract = new window.web3x.eth.Contract(contractABI, contractAddress);
    let tokenCounter = await contract.methods.getTokenCounter().call();
    console.log("token counter: ", tokenCounter)
    return tokenCounter;
}

export async function getNFTFromBlockchain(i) {
    let contract = new window.web3x.eth.Contract(contractABI, contractAddress);
    // let nftName = await contract.methods.getNftName(i).call();
    let nftOwner = await contract.methods.ownerOf(i).call();
    // get a random no from 1 to 10
    let r = Math.floor(Math.random() * 100) + 1;
    return ["Nft "+r, nftOwner];

}