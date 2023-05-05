// SPDX-License-Identifier: GPL-3.0
import "./Ownable.sol";
pragma solidity ^0.8.18;

contract Casino is Ownable {
    struct Player {
        address addr;
        bool isWhiteListed;
        uint totalWin;
        uint loosingDoor;
    }

    struct Constants {
        uint8 nbDoor;
        uint8 nbWinningDoor;
        uint winningMultiplier;
        uint losingMultiplier;
        uint minBetAmount;
        uint maxBetAmount;
    }

    Constants private constants = Constants({
        nbDoor: 3,
        nbWinningDoor: 2,
        winningMultiplier: 12,
        losingMultiplier: 8,
        minBetAmount: 5000000 gwei,
        maxBetAmount: 1000000000 gwei
    });

    // Tableau de la liste blanche pour stocker les informations des joueurs
    mapping(address => Player) public casinoPlayer;
    // Evénement qui se déclenche lorsqu'un joueur fait un pari
    event BetPlaced(address indexed player, uint amount, uint door);

    event BetInitiated(address indexed player, uint amount);
    // Evénement qui se déclenche lorsqu'un joueur gagne un pari
    event BetWon(address indexed player, uint amount, uint door);

    // Evénement qui se déclenche lorsqu'un joueur perd un pari
    event BetLost(address indexed player, uint amount, uint door);

    // Evénement qui se déclenche lorsqu'un joueur rejoint la whitelist
    event PlayerWhitelisted(address indexed player);

    // Fonction pour inscrire un joueur sur la whitelist
    function addToWhiteList() public {
        require(!casinoPlayer[msg.sender].isWhiteListed, "Le joueur est deja whitelist");
        casinoPlayer[msg.sender] = Player({
            addr: msg.sender,
            isWhiteListed: true,
            totalWin: 0,
            loosingDoor: 0
        });
        emit PlayerWhitelisted(msg.sender);
    }

    // Fonction pour retirer un joueur de la whitelist
    function removeFromWhiteList() public {
        casinoPlayer[msg.sender].isWhiteListed = false;
    }

    function randomPorte() public view returns (uint){
        uint loosingdoor = uint(keccak256(abi.encodePacked(block.timestamp, block.number - 1, msg.sender))) % constants.nbDoor;
        return loosingdoor;
    }

    function resetGame() internal {
        casinoPlayer[msg.sender].loosingDoor = 0;
    }

    function win(uint betAmount, uint winningMultiplier) internal {
        uint payout = betAmount * winningMultiplier / 10;
        //payable(msg.sender).transfer(payout);
        casinoPlayer[msg.sender].totalWin += (payout - betAmount);
    }

    function lose(uint betAmount, uint losingMultiplier) internal {
        uint payout = betAmount * losingMultiplier / 10;
        payable(msg.sender).transfer(payout);
        casinoPlayer[msg.sender].totalWin += (payout - betAmount);
    }

    function play(uint betAmount, uint choosedDoor) public payable returns (bool){
        require(choosedDoor / 3 <= 1, "la porte choisi doit etre 1 2 ou 3");
        require(casinoPlayer[msg.sender].loosingDoor != 0, "le joueur doit avoir clique sur jouer");
        emit BetPlaced(msg.sender, betAmount, choosedDoor);
        if (choosedDoor == casinoPlayer[msg.sender].loosingDoor) {
            emit BetLost(msg.sender, betAmount, choosedDoor);
            lose(betAmount, constants.losingMultiplier);
            resetGame();
            return false;
        }
        else {
            emit BetWon(msg.sender, betAmount, choosedDoor);
            win(betAmount, constants.winningMultiplier);
            resetGame();
            return true;
        }
    }

    function initiate(uint betAmount) public payable returns (uint){
        casinoPlayer[msg.sender].loosingDoor = 0;
        require(casinoPlayer[msg.sender].isWhiteListed, "Le joueur doit etre whitelisted");
        require(casinoPlayer[msg.sender].loosingDoor == 0, "la porte perdante doit etre 0");
        emit BetInitiated(msg.sender, betAmount);
        casinoPlayer[msg.sender].loosingDoor = randomPorte();
        return casinoPlayer[msg.sender].loosingDoor;
    }

    /*
    function credit() public payable {
    }
    */

    function withdraw(uint amount) public payable onlyOwner {
        require(amount <= address(this).balance, "le montant recupere doit etre inferieur au solde");
        payable(owner()).transfer(amount);
    }
}