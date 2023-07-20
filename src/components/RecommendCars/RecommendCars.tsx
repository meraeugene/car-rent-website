import { Card } from "../Card/Card";
import "./RecommendCars.css";
import data from "../../data/data.json";
import { Link } from "react-router-dom";

// 3 filtered recommend car
let recommendCars = data.filter((data) => data.section === "recommend");
recommendCars = recommendCars.slice(0, 4);

const RecommendCars = () => {
  return (
    <div className="recommend-car__container">
      <div className="recommend-car__header">
        <span>Recommendation Car</span>
        <Link to="/category">
          <h4>View All</h4>
        </Link>
      </div>
      <div className="recommend-car-content">
        <Card array={recommendCars} />
      </div>
    </div>
  );
};

export default RecommendCars;
