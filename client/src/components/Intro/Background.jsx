import Game from "../Game";

function Background() {
    return (
        <div className="App">
            <div className="neon-border"></div>
            <h1 className="neon-title">Miami Cash</h1>
            {
                <Game />
            }
        </div>
    )
}

export default Background;