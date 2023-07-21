import { Card } from "../../components/Card/Card";
import "./Cars.css";
import data from "../../data/data.json";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

export const Cars = () => {
  const popular = data.filter((data) => data.section === "popular");
  const recommend = data.filter((data) => data.section === "recommend");

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
        <div className="popular__header" data-aos="fade-up">
          <span>Popular Car</span>
          <Link to="/category">
            <span style={{ color: "#3563E9" }}>View All</span>
          </Link>
        </div>

        <div className="popular__cards" data-aos="fade-up">
          <Card array={popular} />
        </div>
      </div>

      <div className={`recommend__container ${isActive ? "darkmode" : ""}`}>
        <div className="header" data-aos="fade-up">
          Recomendation Car
        </div>
        <div className="content__cards" data-aos="fade-up">
          <Card array={recommend} />
        </div>
      </div>
    </>
  );
};
