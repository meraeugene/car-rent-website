import { useContext } from "react";
import { Cars, Footer } from "..";
import { CarPickDropCard } from "../../components/CarPickDropCard/CarPickDropCard";
import { HomeCard } from "../../components/HomeCard/HomeCard";
import "./Home.css";
import { DarkModeContext } from "../../context/DarkModeContext";
import "animate.css";

const Home = () => {
  // dark mode
  const darkModeContext = useContext(DarkModeContext);

  if (!darkModeContext) {
    // Handle the case where the context is undefined
    return null;
  }

  const { isActive } = darkModeContext;
  return (
    <>
      <div className={`container ${isActive ? "darkmode" : ""}`}>
        <div className="flex__container">
          <HomeCard
            title="The Best Platform for Car Rental"
            description="  Ease of doing a car rental safely and reliably. Of course at a low
            price."
            image="/images/best.png"
            button="Rental Car"
            classNameContainer="best animate__animated animate__fadeInLeft"
            classNameInfo="best-info"
            classNameImage="best-img"
          />
          <HomeCard
            title="Easy Way to Rent a Car at a Low Price"
            description=" Providing cheap car rental services, as well as safe and
              comfortable facilities."
            image="/images/easy.png"
            button="Rental Car"
            classNameContainer="easy animate__animated animate__fadeInRight"
            classNameInfo="easy-info"
            classNameImage="easy-img"
          />
        </div>

        <div className="pickup-dropoff__container">
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
      </div>

      <Cars />

      <Footer />
    </>
  );
};

export default Home;
