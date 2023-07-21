import { Card } from "../Card/Card";
import "./RecentCar.css";
import data from "../../data/data.json";
import { Link } from "react-router-dom";

// recents data
const recentCars = data.slice(0, 4);

const RecentCar = () => {
  return (
    <div className="recent-car__container" data-aos="fade-up">
      <div className="recent-car__header">
        <span>Recent Car</span>
        <Link to="/category">
          <h4>View All</h4>
        </Link>
      </div>
      <div className="recent-cars-content">
        <Card array={recentCars} />
      </div>
    </div>
  );
};

export default RecentCar;
