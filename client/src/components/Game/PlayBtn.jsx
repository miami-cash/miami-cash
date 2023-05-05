import React, { useEffect, useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import Modal from 'react-modal';
import {useLosingDoor} from "../../contexts/LosingDoorContext";

Modal.setAppElement('#root');

function PlayBtn() {
    const { state: { contract, accounts } } = useEth();
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setLosingDoor } = useLosingDoor();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleButtonClick = async () => {
        try {
            console.log(parseFloat(inputValue));
            const result = await contract.methods.initiate(parseInt(inputValue)).call({ from: accounts[0] });
            await contract.methods.initiate(parseInt(inputValue)).send({ from: accounts[0] });
            console.log(result)
            setLosingDoor(result);
        } catch (error) {
            console.error('Une erreur est survenue lors de l\'appel à la méthode initiate:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const subscribeToEvents = () => {
            const betInitiated = contract.events.BetInitiated({});

            betInitiated
                .on('data', event => {
                    console.log(event)
                    openModal();
                });

            return () => {
                betInitiated.unsubscribe();
            };
        };

        if (contract) {
            const unsubscribe = subscribeToEvents();

            return () => {
                unsubscribe();
            };
        }
    }, [contract]);

    return (
        <div className="play">
            {}
            <div className="input-container">
                <input
                    className="input-style"
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Entrez une valeur"
                />
                <button className="button-play" onClick={handleButtonClick}>
                    Jouer
                </button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Liste blanche"
            >
                <h2>Votre participation est prise en compte</h2>
                <p>Choisissez votre carte désormais !</p>
                <button onClick={closeModal}>Fermer</button>
            </Modal>
        </div>
    );
}

export default PlayBtn;
