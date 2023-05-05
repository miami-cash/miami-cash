import {EthProvider} from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import Game from "./components/Game";

function App() {
    return (
        <EthProvider>
            <div id="App">
                <div className="container">
                    <Intro/>
                </div>
            </div>
        </EthProvider>
    );
}

export default App;
