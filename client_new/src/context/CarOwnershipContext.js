import React, { createContext, useContext, useState } from 'react';

const CarOwnershipContext = createContext();

export const CarOwnershipProvider = ({ children }) => {
  const [carOwnershipState, setCarOwnershipState] = useState({});

  // Function to update the car ownership state
  const updateCarOwnership = (carId, newOwnerId) => {
    setCarOwnershipState((prevState) => ({
      ...prevState,
      [carId]: newOwnerId,
    }));
  };

  return (
    <CarOwnershipContext.Provider value={{ carOwnershipState, updateCarOwnership }}>
      {children}
    </CarOwnershipContext.Provider>
  );
};

export const useCarOwnership = () => {
  return useContext(CarOwnershipContext);
};
