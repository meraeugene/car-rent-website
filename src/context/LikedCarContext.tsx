// Importing necessary dependencies from React
import { createContext, useState, ReactNode, useEffect } from "react"; // Import useEffect

// Defining the type for the Car object
type Car = {
  id: string; // Unique identifier for the car
  name: string; // Name of the car
  description: string; // Description of the car
  images: {
    view1: string;
    view2: string;
    view3: string;
  }; // Object containing URLs for different views of the car
  gas: string; // Type of gas the car uses
  drive_mode: string; // Drive mode of the car (e.g., manual, automatic)
  people: number; // Number of people the car can accommodate
  price: number; // Current price of the car
  original_price: number | string; // Original price of the car (can be a number or string)
};

// Defining the type for the props of the LikedCarsProvider
type LikedCarsProviderProps = {
  children: ReactNode; // The child components that will be wrapped by the LikedCarsProvider
};

// Defining the type for the context value of LikedCarsContext
type LikedCarsContextType = {
  likedCars: Car[]; // Array of Car objects representing the liked cars
  addLikedCar: (car: Car) => void; // Function to add a car to the likedCars list
  removeLikedCar: (carId: string) => void; // Function to remove car from likedCars list by car ID
  openTooltipId: string | null; // New state for openTooltipId
  setOpenTooltipId: (id: string | null) => void; // New function to set openTooltipId
};

// Creating the LikedCarsContext with an initial value of null
export const LikedCarsContext = createContext<LikedCarsContextType | null>(
  null
);

// The LikedCarsProvider component that wraps its children with the LikedCarsContext
export const LikedCarsProvider = ({ children }: LikedCarsProviderProps) => {
  // State to store the list of liked cars, initialized to an empty array by default
  const [likedCars, setLikedCars] = useState<Car[]>([]);
  const [openTooltipId, setOpenTooltipId] = useState<string | null>(null); // Initialize openTooltipId

  // Function to add a car to the list of liked cars
  const addLikedCar = (car: Car) => {
    setLikedCars((prevLikedCars) => [...prevLikedCars, car]); // Using the spread operator to add the new car to the existing list
  };

  // Function to remove a car from the list of liked cars by car ID
  const removeLikedCar = (carId: string) => {
    setLikedCars((prevLikedCars) =>
      prevLikedCars.filter((car) => car.id !== carId)
    ); // Filtering out the car with the given ID and updating the state
  };

  // Creating the likedCarsContextValue object that holds the current state and functions
  const likedCarsContextValue: LikedCarsContextType = {
    likedCars,
    addLikedCar,
    removeLikedCar,
    openTooltipId, // Include openTooltipId in the context value
    setOpenTooltipId, // Include setOpenTooltipId in the context value
  };

  useEffect(() => {
    // Clear the timeout when the component is unmounted
    return () => {
      if (openTooltipId !== null) {
        setOpenTooltipId(null);
      }
    };
  }, [openTooltipId]);

  // Wrapping the children with the LikedCarsContext and providing the likedCarsContextValue
  return (
    <LikedCarsContext.Provider value={likedCarsContextValue}>
      {children}
    </LikedCarsContext.Provider>
  );
};
