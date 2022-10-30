const { request, response } = require("express");
const express = require("express");
const lib = require("./backend");
const env = require("dotenv");
const axios = require("axios");
const Provider = require("@truffle/hdwallet-provider");
env.config();

// random string
let rand = lib.makeid(process.env.RANDOM);
let random = [
  {
    random: rand,
  },
];
// random string

//Signature
let private_key = process.env.PRIVATE_KEY;
let sig = lib.signature_gen(rand, private_key);
let sign = [
  {
    signature: sig.signature,
    v: sig.v,
    r: sig.r,
    s: sig.s,
  },
];
//Signature

const app = express();

app.use(express.json());

// random string
app.get("/random", (request, midl, response) => {
  response.json(random);
});

//Signature
app.get("/signature", (request, response) => {
  response.json(sign);
});

contractABI = [
  {
    inputs: [],
    name: "SL_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "hashedMessage",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "_v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_s",
        type: "bytes32",
      },
    ],
    name: "verify",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
];

contractAddress = "0xE08E8387B7a321E358E77BDc94aC94a1C4b0Da78";

// const accounts = web3.eth.getAccounts();
// console.log(accounts);
var pri_key =
  "0xe4c05bc4937e9819afba2cab23ce88be72d0a9ef7413f8e340c42e22f7606c36";

// var confirm = web3.eth.accounts.recover('0x3b2ef69dbc30d406b8f2a3e25b22f7df25adbf8c8136e0f625d49e1f97bc65e3', '0x1c', '0x70b9ec492231619f6abf223a2fe0e58f9c021a519159addb903c47d6cd10a0ec', '0x0877b948e7cd4d3708fffff74aea96b8bf7d4694d85d8aedd9a6c2434cef8ea4')
// console.log(confirm);
// var check = web3.eth.accounts.privateKeyToAccount('0x0c5b4428409641364a3738d7aa279ab11620519f631213ca775322f7d189e636');
// console.log(check);
// // // web3.eth.accounts.hashMessage("siahud");
var SmartContractAddress = contractAddress;
var SmartContractABI = contractABI;
var address = "0x3e452f64ee72A78b9F42270569063C5956355A1E";

var rpc_url = "https://goerli.infura.io/v3/fc2663324bd34f068c373e76c5b97edf";
const sendData = async () => {
  console.log("in function");
  var provider = new Provider(private_key, rpc_url);
  var web3 = new Web3(provider);
  var myContract = new web3.eth.Contract(
    SmartContractABI,
    SmartContractAddress
  );
  try {
    var receipt = await myContract.methods
      .verify(sign.messageHash, 27, sign.r, sign.s)
      .send({ from: address });

    console.log(receipt);
  } catch (error) {
    console.log(error);
  }
};

sendData();

app.get("/", (request, response) => {
  axios
    .get("https://localhost:3000/signature")
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((err) => {
      // Handle Error Here
      console.error(err);
    });
  //resp.data["v"]
  sendData();
  response.send("Deployed");
});

app.listen(process.env.PORT);
