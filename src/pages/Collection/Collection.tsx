import { useContext } from "react";
import { LikedCarsContext } from "../../context/LikedCarContext";
import { Footer } from "..";
import "./Collection.css";
import { Card } from "../../components/Card/Card";
import { DarkModeContext } from "../../context/DarkModeContext";

export const Collection = () => {
  const likedCarsContext = useContext(LikedCarsContext);
  const darkModeContext = useContext(DarkModeContext);

  if (!likedCarsContext || !darkModeContext) {
    // Handle the case when either context value is null or undefined
    return null;
  }

  const { likedCars } = likedCarsContext;
  const { isActive } = darkModeContext;
  const isEmpty = likedCars.length === 0;

  return (
    <>
      <div className={`section__padding ${isActive ? "darkmode" : ""}`}>
        {isEmpty ? (
          <h1 className="title custom-padding">
            Like cars to add them to your personal showcase.
          </h1>
        ) : (
          <h1 className="title custom-message-margin">
            Ride the Thrill: Your Personal Car Showcase!
          </h1>
        )}

        <div className="likedPopularCars-Container">
          {isEmpty ? null : <Card array={likedCars} />}
        </div>
      </div>
      <Footer />
    </>
  );
};
