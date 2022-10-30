contractABI = [
	{
		"inputs": [],
		"name": "SL_ADDRESS",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "hashedMessage",
				"type": "bytes32"
			},
			{
				"internalType": "uint8",
				"name": "_v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "_r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_s",
				"type": "bytes32"
			}
		],
		"name": "verify",
		"outputs": [],
		"stateMutability": "view",
		"type": "function"
	}
]


contractAddress = "0x8eC90E65156445fE3C72024eaF5FAEBDFc4C5BAe"

module.exports = { contractABI, contractAddress };