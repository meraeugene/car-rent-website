import "./CarPickDropCard.css";

type CarPickDropProps = {
  headerTitle: string;
  location: string;
  date: string;
  time: string;
};

export const CarPickDropCard = (props: CarPickDropProps) => {
  return (
    <div className="pickdrop__container">
      <div className="pickdrop__container-header">
        <div className="pickdrop__container-header-img">
          <img src="/images/Ellipse 11.svg" alt="elipse" loading="lazy" />
        </div>
        <span>{props.headerTitle}</span>
      </div>
      <div className="pickdrop__container-body-flex">
        <div className="location">
          <h3>{props.location}</h3>
          <select name="cities" id="#" defaultValue="">
            <option disabled hidden value="">
              Select your city
            </option>
            <option value="manila">Manila</option>
            <option value="cebu">Cebu</option>
            <option value="cagayan">Cagayan de oro</option>
            <option value="davao">Davao</option>
            <option value="baguio">Baguio</option>
          </select>
        </div>

        <div className="date">
          <h3>{props.date}</h3>
          <input type="date" />
        </div>

        <div className="time">
          <h3>{props.time}</h3>
          <input type="time" />
        </div>
      </div>
    </div>
  );
};
