import React from "react"
import { useEffect, useState } from "react"
import "./content.css"
import BeerCard from "./beerCard.jsx"
import LoadingCard from "./loadingCard.jsx"
import PrimaryButton from "./primaryButton"

import b1 from "../images/b1.jpg"
import b2 from "../images/b2.jpg"
import b3 from "../images/b3.jpg"
import b4 from "../images/b4.jpg"

import { mintNFT } from "../utils/web3Provider"
import { getTokenCounter } from "../utils/web3Provider"
import { getNFTFromBlockchain } from "../utils/web3Provider"
import { initWeb3 } from "../utils/web3Provider"

function Content({ handleConnectToMetamask, account}) {
    let beerList = [b1,b2,b3,b4,b1,b2,b3,b4,b1,b2,b3,b4,b1,b2,b3,b4,b1,b2,b3,b4,b1,b2,b3,b4,b1,b2,b3,b4] // POC, the nft images are hardcoded locally
    let [beerNames, setBeerNames] = useState([]) // names are stored on chain
    let [beerAddress, setBeerAddress] = useState([])
    let [status, setStatus] = useState("idle") // onclick, status to verifying, then minting, then idle
    let [activeBeerName, setActiveBeerName] = useState("")
    
    async function getBeerInfo() {
        let tempBeerNames = []
        let tempBeerAddress = []
        // api calls to get total number of tokens
        await initWeb3()
        // console.log("getbeerinfo", window.web3x)
        let totalTokens = parseInt(await getTokenCounter())
        // console.log("get")
        console.log(
            "beerNames.len",
            beerNames.length,
            "totalTokens",
            totalTokens
            )
            for (let i = beerNames.length + 1; i <= totalTokens; i++) {
                let [name, address] = await getNFTFromBlockchain(i)
                tempBeerNames.push(name)
                tempBeerAddress.push(address)
            }
            console.log("tempBeerNames", tempBeerNames)
            setBeerNames((prev) => [...prev, ...tempBeerNames])
            setBeerAddress((prev) => [...prev, ...tempBeerAddress])
    }

    async function getLastBeerInfo(tokenId, beerName) {
        setStatus("idle")
        console.log("idle")
        // api calls to get total number of tokens
        await initWeb3()
        // console.log("getbeerinfo", window.web3x)
        let totalTokens = parseInt(await getTokenCounter())
        // console.log("get")
        console.log(
            "beerNames.len",
            beerNames.length,
            "totalTokens",
            totalTokens
        )

        let [_, address] = await getNFTFromBlockchain(tokenId)

        console.log("tempBeerNames", beerName, "add", address)

        setBeerNames((prev) => [...prev, beerName])
        setBeerAddress((prev) => [...prev, address])

        setActiveBeerName(beerName)
    }

    useEffect(() => {
        console.log("child re render");
        (async () => {
            if (localStorage.getItem("isWeb3Connected")) {
                await getBeerInfo()
            }
        })()
    }, [account])


    async function handleMintBeer() {
        // mint beer
        // set status to verifying
        setStatus("verifying")
        console.log("verifying")
        await new Promise((r) => setTimeout(r, 2000))
        setStatus("minting")
        console.log("minting") // calling smart contract's random fn (which in turn mints the nfs after a callback)
        await mintNFT(getLastBeerInfo)
    }

    async function handleClickBeer(name) {
        console.log("clicked")
        console.log(name)
        setActiveBeerName(name)
    }

    return (
        <div className="content">
            <h1 className="display-2">
            Görcervejaria<span className="vim-caret"></span>
                <div className="lead mb-3 text-mono text-success">
                On-chain Proof of Liveliness for your NFT beer
                </div>
                {localStorage.getItem("isWeb3Connected") ? (
                    <div className="upper-banner d-flex flex-row">
                        <div className="lead text-mono"> Beer: </div>
                        <div className="lead text-mono text-warning">
                            {" "}
                            {activeBeerName}
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
                <div className="beer-card-container">
                    {beerNames.map((beerName, index) => (
                        <BeerCard
                            key={index}
                            beerImage={beerList[index]}
                            status="idle"
                            beerName={beerName}
                            beerAddress={beerAddress[index]}
                            onClick={handleClickBeer}
                            active={activeBeerName === beerName}
                        />
                    ))}

                    {status == "verifying" || status == "minting" ? (
                        <LoadingCard
                            text={
                                status == "verifying"
                                    ? "Verifying you're human"
                                    : "Brewing your beer"
                            }
                        />
                    ) : null}
                </div>
                <div className="lower-banner d-flex justify-content-between align-items-center">
                    {localStorage.getItem("isWeb3Connected") ? (
                        <PrimaryButton
                            className="mint-beer-button"
                            onClick={handleMintBeer}
                            text="Mint Beer"
                        />
                    ) : (
                        <PrimaryButton
                            text="Connect to Metamask"
                            onClick={handleConnectToMetamask}
                        />
                    )}
                </div>
                <div className="lead ">
                In this PoC, we explore the flow to integrate external proximity-based verification tools to establish Proof of Liveliness in the NFT minting dApp.
                </div>
            </h1>
        </div>
    )
}

export default Content
