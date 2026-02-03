import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState({
        name: "Citizen",
        age: "",
        gender: "",
        state: "",
        income: "",
        occupation: "",
        caste: "",
        disability: false
    });

    const updateProfile = (field, value) => {
        setUserProfile(prev => ({ ...prev, [field]: value }));
    };

    return (
        <UserContext.Provider value={{ userProfile, setUserProfile, updateProfile }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
