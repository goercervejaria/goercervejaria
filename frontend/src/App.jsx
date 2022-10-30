import "./App.css";
import { contractABI, contractAddress } from "./constants.js";
import { useEffect, useState } from "react";
import { initWeb3, getAccount } from "./utils/web3Provider";
import PrimaryButton from "./components/primaryButton.jsx";
import Content from "./components/content.jsx";
import Web3 from "web3";

function App() {
  //connecting to blockchain
  const [account, setAccount] = useState(localStorage.getItem("account") ? localStorage.getItem("account") : "");
  const [isMinted, setIsMinted] = useState(false);

  useEffect(() => {
    (async () => {
    // await initWeb3();
    window.web3x = new Web3(window.ethereum);
    if (localStorage.getItem("isWeb3Connected")) {
      getAccount().then((account) => {
        setAccount((prevAcc) => {
          console.log("prevAcc", prevAcc);
          console.log("newAcc:", account);
          return account;
        });
      });
    }
    })();
  }, []);

  async function handleConnectToMetamask() {
    let selectedAccount = await getAccount();
    setAccount(selectedAccount);
    //update localstorage
    localStorage.setItem("isWeb3Connected", true);
    localStorage.setItem("account", selectedAccount);
  }

  return (
    <div className="App">
      <div className="navbar">
        <div className="logo">LOGO</div>
        <div className="links"></div>
        {account.length == 0 ? (
          <div></div>
        ) : (
          <div> Connected </div>
        )}
      </div>

      <Content handleConnectToMetamask={handleConnectToMetamask} account={account}/>
    </div>
  );
}

export default App;
