import {EthProvider} from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import Game from "./components/Game";
import LosingDoorContext, {LosingDoorProvider} from "./contexts/LosingDoorContext";

function App() {
    return (
        <EthProvider>
            <div id="App">
                <LosingDoorProvider>
                    <div className="container">
                        <Intro/>
                    </div>
                </LosingDoorProvider>
            </div>
        </EthProvider>
    );
}

export default App;
