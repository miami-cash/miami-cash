# Miami Cash

Ce projet utilise Solidity, Web3.js, Truffle et Ganache pour créer un casino en ligne autour de la blockchain Ethereum.

## Prérequis

- Node.js
- Ganache (https://www.trufflesuite.com/ganache)
- Truffle (`npm install -g truffle`)
- Metamask (https://metamask.io/)
- React (`npx create-react-app my_app`)
- Web3 (`npm install web3`)
- Solidity (`npm install -g solc`)

## Installation

1. Clonez ce repository : `git clone https://github.com/nom-du-projet.git`
2. Installez les dépendances : `npm install`
3. Démarrez Ganache et importez un compte à utiliser pour votre application. Pour plus d'informations, consultez la documentation de Ganache.
4. Dans un terminal, démarrez le serveur Truffle : `truffle develop`
5. Dans le terminal de Truffle, compilez les contrats : `compile`
6. Dans le terminal de Truffle, migrez les contrats sur le réseau local de Ganache : `migrate`
7. Dans le terminal de Truffle, copiez l'adresse du contrat généré dans la sortie de la migration.
8. Dans le dossier du projet, créez un fichier `.env` et ajoutez la variable d'environnement suivante : `REACT_APP_CONTRACT_ADDRESS=adresse_du_contrat`.
8 (alternatif). Avec l'application Ganache ajoutez le contrat depuis la section Contracts.
9. Dans un autre terminal, démarrez l'application React : `npm start`
10. Connectez-vous à votre compte Metamask dans le navigateur et configurez-le pour utiliser le réseau local de Ganache.
11. Accédez à l'application en naviguant sur `http://localhost:8080/`.

## Utilisation

L'application vous permettra de mettre en place un casino en ligne autour de la blockchain Ethereum.
Les retraits ne sont pas fonctionnels pour le moment suite à un problème de balance présent dans le smart-contract.

![image](https://media.istockphoto.com/id/1158005632/fr/photo/le-croupier-tient-une-boule-de-roulette-dans-un-casino-dans-sa-main.jpg?s=612x612&w=0&k=20&c=RCU6zkJVXtHg_7EVDp8eiAHd4IxIrAlGSYC10PK3BgI=).