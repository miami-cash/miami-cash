import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function PlayBtns() {
    const { state: {contract, accounts} } = useEth();
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = e => {
        if (/^\d+$|^$/.test(e.target.value)) {
            setInputValue(e.target.value);
        }
    };

    const play = async e => {
        if (e.target.tagName === "INPUT") {
            return;
        }
        if (inputValue === "") {
            alert("Please enter a value to write.");
            return;
        }
        const newValue = parseInt(inputValue);
        await contract.methods.play(newValue).send({ from: accounts[0] });
    };

    return (
        <div className="btns">
            <div onClick={play} className="input-btn">
                play(<input
                type="text"
                placeholder="uint"
                value={inputValue}
                onChange={handleInputChange}
            />)
            </div>

        </div>
    );
}

export default PlayBtns;