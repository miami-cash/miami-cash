// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.18;

import "./Ownable.sol";

contract Casino is Ownable {
    struct Player {
        address addr;
        bool isWhiteListed;
    }

    struct Constants {
        uint8 nbDoor;
        uint8 nbWinningDoor;
        uint winningMultiplier;
        uint losingMultiplier;
    }

    uint loosingDoor = 0;
    Constants private constants = Constants({
        nbDoor: 3,
        nbWinningDoor: 2,
        winningMultiplier: 12,
        losingMultiplier: 8
    });
    enum Status {SUCCESS, LOSE, PENDING}

    // Tableau de la liste blanche pour stocker les informations des joueurs
    mapping(address => Player) public whiteList;

    // Evénement qui se déclenche lorsqu'un joueur fait un pari
    event BetPlaced(address indexed player, uint amount, uint door);

    // Evénement qui se déclenche lorsqu'un joueur gagne un pari
    event BetWon(address indexed player, uint amount, uint door);

    // Evénement qui se déclenche lorsqu'un joueur perd un pari
    event BetLost(address indexed player, uint amount, uint door);

    // Evénement qui se déclenche lorsqu'un joueur rejoint la whitelist
    event PlayerWhitelisted(address indexed player);

    // Le taux multiplicateur minimal et maximal pour les paris
    uint constant MIN_MULTIPLIER = 102;
    uint constant MAX_MULTIPLIER = 110;

    // Le montant minimal et maximal pour les paris
    uint constant MIN_BET_AMOUNT = 0.005 ether;
    uint constant MAX_BET_AMOUNT = 1 ether;

    // Le nombre de portes
    uint constant DOOR_COUNT = 3;

    // Fonction pour inscrire un joueur sur la whitelist
    function addToWhiteList() public {
        whiteList[msg.sender].isWhiteListed = true;
        emit PlayerWhitelisted(msg.sender);
    }

    // Fonction pour retirer un joueur de la whitelist
    function removeFromWhiteList() public {
        whiteList[msg.sender].isWhiteListed = false;
    }

    function randomPorte() public view returns (uint){
        uint loosingdoor = uint(keccak256(abi.encodePacked(block.timestamp, block.number - 1, msg.sender))) % DOOR_COUNT;
        return loosingdoor;
    }

    function resetGame() public {
        loosingDoor = 0;
    }

    function win(uint betAmount, uint winningMultiplier) internal {
        uint payout = betAmount * winningMultiplier / 10;
        payable(msg.sender).transfer(payout);
    }

    function lose(uint betAmount, uint losingMultiplier) internal {
        uint payout = betAmount * losingMultiplier / 10;
        payable(msg.sender).transfer(payout);
    }

    function play(uint betAmount, uint choosedDoor, uint winningMultiplier, uint losingMultiplier) public payable returns (bool){
        require(msg.value == betAmount);
        require(loosingDoor == 0);
        require(choosedDoor / 3 <= 1);
        loosingDoor = randomPorte();
        if (choosedDoor == loosingDoor) {
            lose(betAmount, losingMultiplier);
            return false;
        }
        else {
            win(betAmount, winningMultiplier);
            return true;
        }
    }

    function credit() public payable {
    }

    function withdraw(uint amount) public payable onlyOwner {
        require(amount <= address(this).balance);
        payable(owner()).transfer(amount);
    }

}