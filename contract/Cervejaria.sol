// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";


contract BasicNft is ERC721, Ownable, VRFConsumerBaseV2 {
    string public constant TOKEN_URI =
    "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-BEER.json";
    uint256 private s_tokenCounter;
    address SL_PublicKey = 0xD3Ff96cf6925a905dce544140F06B9745e2bcBae;
    // Your subscription ID.
    uint64 s_subscriptionId;

    // Goerli coordinator. For other networks,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    address vrfCoordinator = 0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D;

    // The gas lane to use, which specifies the maximum gas price to bump to.
    // For a list of available gas lanes on each network,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    bytes32 s_keyHash = 0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15;

    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Storing each word costs about 20,000 gas,
    // so 100,000 is a safe default for this example contract. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.
    uint32 callbackGasLimit = 700000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    // For this example, retrieve 2 random values in one request.
    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
    uint32 numWords = 2;

    uint256[] public s_randomWords;
    uint256 public s_requestId;
    address s_owner;
    VRFCoordinatorV2Interface COORDINATOR;

    string public _beer;

    constructor() ERC721("Beer", "BER") VRFConsumerBaseV2(0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D)  {
        s_tokenCounter = 0;
        COORDINATOR = VRFCoordinatorV2Interface(0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D);
        // s_owner = msg.sender;
        s_subscriptionId = 5722;


    }

    address OwnerOfNft;

    event CreateRandNft(uint tokenId, string nftName);

    mapping(string => bool) public token_ids;

    mapping(uint256 => string) public _tokenURIs;

    mapping(uint256 => string) public _nftNames;


    function verifyTokenAndStore(string memory token_id, uint8 _v, bytes32 _r, bytes32 _s) public {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, keccak256(abi.encodePacked(token_id))));
        require(ecrecover(prefixedHashMessage, _v, _r, _s) == SL_PublicKey, "Not signed by the SL");
        token_ids[token_id] = true;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function _setNftName(uint256 tokenId, string memory _nftName) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: NAme set of nonexistent token");
        _nftNames[tokenId] = _nftName;
    }

    function requestRandomWords() public {
        // Will revert if subscription is not set and funded.
        s_requestId = COORDINATOR.requestRandomWords(
            s_keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        OwnerOfNft = msg.sender;
    }

    function generateBeerName() public returns (string memory) {

        string[10] memory brands = ['Token', 'Vitalik', 'Gas', 'Stake', 'Contract', 'Smart', 'The Merge', 'The Merge', 'The Merge', 'The Merge'];
        string[10] memory beers = ['Lager', 'Witbier', 'Pilsener', 'Weissbier', 'Ale', 'IPA', 'Stout', 'Porter', 'Dunkel', 'Dunkel'];
        string memory beer = string(abi.encodePacked(brands[s_randomWords[0] % 10], beers[s_randomWords[1] % 10]));
        _beer = beer;
        return beer;

    }

    function fulfillRandomWords(
        uint256, /* requestId */
        uint256[] memory randomWords
    ) internal override {
        s_randomWords = randomWords;
        s_tokenCounter = s_tokenCounter + 1;
        _safeMint(OwnerOfNft, s_tokenCounter);
        _setTokenURI(s_tokenCounter, TOKEN_URI);
        _setNftName(s_tokenCounter, generateBeerName());
        emit CreateRandNft(s_tokenCounter, _beer);
    }


    function recoverPubKey(string memory token_id, uint8 _v, bytes32 _r, bytes32 _s) pure public returns (address){
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, keccak256(abi.encodePacked(token_id))));
        return ecrecover(prefixedHashMessage, _v, _r, _s);
    }

    function checkHashedMessage(string memory token_id) public pure returns (bytes32){
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(token_id));
        return prefixedHashMessage;
    }

    function tokenURI() public pure returns (string memory) {
        // require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }


    function getTokenIds(string memory token_id) public view returns (bool){
        return token_ids[token_id];
    }
}
