import closedDoorImage from '../assets/closed_door.png';
import ContractBtns from "../Demo/ContractBtns";
import PlayBtns from "./PlayBtns";
import {useState} from "react";
import useEth from "../../contexts/EthContext/useEth";

function Card() {
    const [value, setValue] = useState("?");
    const { state: {contract, accounts} } = useEth();

    const play = async e => {
        if (e.target.tagName === "INPUT") {
            return;
        }
        console.log('test')
        await contract.methods.play(2, 1, 1, 1).send({ from: accounts[0] });
    };

    return (
        <div className="container">
            <div className="doors">
                <div onClick={play} className="door" id="door1">
                    <img src={closedDoorImage} alt="Door 1" />
                </div>
                <div onClick={play} className="door" id="door2">
                    <img src={closedDoorImage} alt="Door 2" />
                </div>
                <div onClick={play} className="door" id="door3">
                    <img src={closedDoorImage} alt="Door 3" />
                </div>
            </div>
            <PlayBtns setValue={setValue} />
            <div id="result"></div>
        </div>
    )
}

export default Card;