// Importing necessary dependencies from React
import React, { createContext, useState } from "react";

// Defining the type for the DarkModeContext
type DarkModeContextType = {
  isActive: boolean; // Represents whether the dark mode is active or not
  toggleDarkMode: () => void; // Function to toggle the dark mode
};

// Defining the type for the props of the DarkModeProvider
type DarkModeProviderProps = {
  children: React.ReactNode; // The child components that will be wrapped by the DarkModeProvider
};

// Creating the DarkModeContext with an initial value of undefined
export const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

// The DarkModeProvider component that wraps its children with the DarkModeContext
export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  // State to keep track of whether dark mode is active or not, initialized to false by default
  const [isActive, setIsActive] = useState(false);

  // Function to toggle the dark mode state
  const toggleDarkMode = () => {
    setIsActive(!isActive); // Inverts the current state to activate/deactivate dark mode
  };

  // Creating the darkModeContextValue object that holds the current state and the toggle function
  const darkModeContextValue: DarkModeContextType = {
    isActive,
    toggleDarkMode,
  };

  // Wrapping the children with the DarkModeContext and providing the darkModeContextValue
  return (
    <DarkModeContext.Provider value={darkModeContextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};
