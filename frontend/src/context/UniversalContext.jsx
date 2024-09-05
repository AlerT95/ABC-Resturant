/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const UniversalContext = createContext();

const UniversalProvider = ({ children }) => {
  const [values, setValues] = useState({});

  const setValue = (key, value) => {
    setValues((prevState) => ({ ...prevState, [key]: value }));
  };

  const getValue = (key) => values[key];

  return (
    <UniversalContext.Provider value={{ setValue, getValue }}>
      {children}
    </UniversalContext.Provider>
  );
};

export { UniversalProvider, UniversalContext };