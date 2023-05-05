import closedDoorImage from '../assets/closed_door.png';
import {useState} from "react";
import useEth from "../../contexts/EthContext/useEth";
import WhitelistBtn from "./WhitelistBtn";
import PlayBtn from "./PlayBtn";
import {useLosingDoor} from "../../contexts/LosingDoorContext";

function Card() {
    const [value, setValue] = useState("?");
    const {state: {contract, accounts}} = useEth();
    const { losingDoor } = useLosingDoor();

    const play = async e => {
        if (e.target.tagName === "INPUT") {
            return;
        }

        if (losingDoor == null) {
            return;
        }

        console.log(losingDoor);
        const result = await contract.methods.play(1, parseInt(e.target.id)).call({from: accounts[0]});
        console.log('Gagné ? ' + result);
    };

    return (
        <div className="container">
            <div className="whitelist">
                <WhitelistBtn />
            </div>
            <div className="doors">
                <div onClick={play} className="door" id="1">
                    <img
                        src={closedDoorImage}
                        alt="Door 1"
                        id="1"
                    />
                </div>
                <div onClick={play} className="door" id="2">
                    <img
                        src={closedDoorImage}
                        alt="Door 2"
                        id="2"
                    /></div>
                <div onClick={play} className="door" id="3">
                    <img
                        src={closedDoorImage}
                        alt="Door 3"
                        id="3"
                    /></div>
            </div>
            <div id="result"></div>
            <div className="play">
                <PlayBtn />
            </div>
        </div>
    )
}

export default Card;