import React, {useEffect, useState} from 'react';
import useEth from '../../contexts/EthContext/useEth';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function WhitelistPopup({ show }) {
    if (!show) {
        return null;
    }

    return (
        <div className="whitelist-popup">
            Vous avez été ajouté à la liste blanche !
        </div>
    );
}

function WhitelistBtn() {
    const { state: { contract, accounts } } = useEth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const whitelist = async e => {
        if (e.target.tagName === 'INPUT') {
            return;
        }
        console.log(accounts)
        await contract.methods.addToWhiteList().send({ from: accounts[0] });
    };

    useEffect(() => {
        const subscribeToEvents = () => {
            const playerWhitelisted = contract.events.PlayerWhitelisted({});

            playerWhitelisted
                .on('data', event => {
                    console.log(event);
                    openModal();
                })
                .on('changed', event => {
                })
                .on('error', (error, receipt) => {
                    console.log('Le joueur est déjà whitelist')
                });

            return () => {
                playerWhitelisted.unsubscribe();
            };
        };

        if (contract) {
            // Subscribe to events if the contract instance is available
            const unsubscribe = subscribeToEvents();

            // Clean up the event listeners when the component is unmounted
            return () => {
                unsubscribe();
            };
        }
    }, [contract]);

    return (
        <div className='whitelist'>
            <button className="button-accept" onClick={whitelist}>
                J'ai 18 ans et j'accepte de me faire arnaquer
            </button>
            <WhitelistPopup show={showPopup}/>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Liste blanche"
            >
                <h2>Liste blanche</h2>
                <p>Vous avez bien été ajouté à la liste blanche !</p>
                <button onClick={closeModal}>Fermer</button>
            </Modal>
        </div>
    );
}

export default WhitelistBtn;