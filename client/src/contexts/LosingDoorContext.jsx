import { createContext, useContext, useState } from "react";

const LosingDoorContext = createContext();

export const useLosingDoor = () => {
    return useContext(LosingDoorContext);
};

export const LosingDoorProvider = ({ children }) => {
    const [losingDoor, setLosingDoor] = useState(null);

    return (
        <LosingDoorContext.Provider value={{ losingDoor, setLosingDoor }}>
            {children}
        </LosingDoorContext.Provider>
    );
};

export default LosingDoorContext;