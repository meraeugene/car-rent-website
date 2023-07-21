import { useState, ChangeEvent, useContext } from "react";
import { Footer } from "..";
import { CarPickDropCard } from "../../components/CarPickDropCard/CarPickDropCard";
import { Card } from "../../components/Card/Card";
import "./Category.css";
import data from "../../data/data.json";
import { motion, AnimatePresence } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import { Link } from "react-router-dom";

// Define the Car interface to represent the structure of car data
interface Car {
  id: string;
  name: string;
  description: string;
  images: {
    view1: string;
    view2: string;
    view3: string;
  };
  gas: string;
  drive_mode: string;
  people: number;
  price: number;
  original_price: string | number;
}

// Define the interface for counting cars by their type or capacity
interface CarCounts {
  [key: string]: number;
}

const Category = () => {
  // State variables for filtering and showing more cars
  const [showMore, setShowMore] = useState(false);
  const [filterType, setFilterType] = useState<string[]>([]);
  const [filterCapacity, setFilterCapacity] = useState<string[]>([]);

  // Handler for handling filtering based on car type or capacity
  const handleFilter = (
    event: ChangeEvent<HTMLInputElement>,
    filterState: string[],
    setFilterState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const { value, checked } = event.target;
    if (checked) {
      setFilterState([...filterState, value]);
    } else {
      setFilterState(filterState.filter((type) => type !== value));
    }
  };

  // Filtering cars based on selected type and capacity
  const filteredCars: Car[] = data.filter((car) => {
    const matchesType =
      filterType.length === 0 || filterType.includes(car.description);
    const matchesCapacity =
      filterCapacity.length === 0 ||
      filterCapacity.includes(car.people.toString());
    return matchesType && matchesCapacity;
  });

  // Remaining cars count and slicing
  const remainingCarsCount: number = filteredCars.length - 6;
  const allCars: Car[] = showMore ? filteredCars : filteredCars.slice(0, 6);

  // Function to handle showing more cars
  const showMoreFeature = () => {
    setShowMore(true);
  };

  // Determine if the "Show more" button should be shown
  const shouldShowMoreButton = filteredCars.length >= 6;

  // Get dark mode state from context
  const darkModeContext = useContext(DarkModeContext);

  if (!darkModeContext) {
    // Handle the case where the context is undefined
    return null;
  }

  const { isActive } = darkModeContext;

  // Count cars by their type and capacity for filtering
  const carCountsByType: CarCounts = filteredCars.reduce(
    (counts: CarCounts, car) => {
      counts[car.description] = (counts[car.description] || 0) + 1;
      return counts;
    },
    {}
  );

  const carCountsByCapacity: CarCounts = filteredCars.reduce(
    (counts: CarCounts, car) => {
      counts[car.people.toString()] = (counts[car.people.toString()] || 0) + 1;
      return counts;
    },
    {}
  );

  const handleFilterAsideToggle = () => {
    const filterAside = document.querySelector(".filter__aside");
    filterAside?.classList.toggle("filter__aside-show");
  };

  return (
    <>
      <div className={`category-grid__container ${isActive ? "darkmode" : ""}`}>
        <aside className="filter__aside">
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            className="logo-aside"
          >
            <img
              src={`/images/carrentlogo.png`}
              alt="car rent logo"
              style={{ width: "40px", height: "40px" }}
              loading="lazy"
            />
          </Link>
          <form action="">
            <div className="type__container">
              <h2>Type</h2>
              {Object.entries(carCountsByType).map(([carType, count]) => (
                <div key={carType} className="check-box">
                  <input
                    type="checkbox"
                    value={carType}
                    checked={filterType.includes(carType)}
                    onChange={(e) => handleFilter(e, filterType, setFilterType)}
                  />
                  <label htmlFor={carType}>
                    {carType} <span className="offwhite-text"> ({count})</span>
                  </label>
                </div>
              ))}
            </div>

            <div className="capacity__container">
              <h2>Capacity</h2>
              {Object.entries(carCountsByCapacity).map(
                ([carCapacity, count]) => (
                  <div key={carCapacity} className="check-box">
                    <input
                      type="checkbox"
                      value={carCapacity}
                      checked={filterCapacity.includes(carCapacity)}
                      onChange={(e) =>
                        handleFilter(e, filterCapacity, setFilterCapacity)
                      }
                    />
                    <label htmlFor={`${carCapacity}person`}>
                      {carCapacity} Person{" "}
                      <span className="offwhite-text"> ({count})</span>
                    </label>
                  </div>
                )
              )}
            </div>
          </form>
          <div
            className="close__button-container"
            onClick={handleFilterAsideToggle}
          >
            <i className="ri-close-line close__button"></i>
          </div>
        </aside>

        <div className="category-main__container">
          <div className="category-pickdrop__container">
            <CarPickDropCard
              headerTitle="Pick-Up"
              location="Locations"
              date="Date"
              time="Time"
              aos="fade-right"
            />

            <CarPickDropCard
              headerTitle="Drop-Off"
              location="Locations"
              date="Date"
              time="Time"
              aos="fade-left"
            />
          </div>

          {allCars.length === 0 ? (
            <div className="no-cars-message">
              <h1>No cars available.</h1>
            </div>
          ) : (
            <motion.div layout className="cards-grid__container">
              <AnimatePresence>
                <Card array={allCars} />
              </AnimatePresence>
            </motion.div>
          )}

          <div className="button">
            {shouldShowMoreButton && !showMore && (
              <>
                <button onClick={showMoreFeature}>Show more</button>
                <div className="span">
                  <span className="offwhite-text">
                    {remainingCarsCount} more
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Category;
