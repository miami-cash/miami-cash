import React, {useCallback, useEffect, useReducer} from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import {actions, initialState, reducer} from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifact => {
      if (artifact) {
        const customGasPrice = "20000000000"; // mettre ici votre gas price personnalisé
        const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545", null, {
          transactionConfirmationBlocks: 1,
          transactionBlockTimeout: 5,
          transactionPollingTimeout: 120000,
          defaultGasPrice: customGasPrice,
          defaultGas: 0, // pour définir une limite de gas illimitée
        });
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        let address, contract;
        try {
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/SimpleStorage.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
