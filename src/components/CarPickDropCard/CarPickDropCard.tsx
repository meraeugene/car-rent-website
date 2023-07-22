import { useEffect, useState, useContext } from "react";
import "./CarPickDropCard.css";
import { DarkModeContext } from "../../context/DarkModeContext";

type CarPickDropProps = {
  headerTitle: string;
  location: string;
  date: string;
  time: string;
  aos: string;
};

export const CarPickDropCard = (props: CarPickDropProps) => {
  const [defaultDate, setDefaultDate] = useState<string>("");
  const [defaultTime, setDefaultTime] = useState<string>("");

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10); // YYYY-MM-DD
    const formattedTime = currentDate.toTimeString().slice(0, 5); // HH:mm (24-hour format)

    setDefaultDate(formattedDate);
    setDefaultTime(formattedTime);
  }, []);

  // dark mode
  const darkModeContext = useContext(DarkModeContext);

  if (!darkModeContext) {
    // Handle the case where the context is undefined
    return null;
  }

  const { isActive } = darkModeContext;

  return (
    <div className="pickdrop__container" data-aos={props.aos}>
      <div className="pickdrop__container-header">
        <div className="pickdrop__container-header-img">
          <img src="/images/Ellipse 11.svg" alt="elipse" loading="lazy" />
        </div>
        <span>{props.headerTitle}</span>
      </div>
      <div className="pickdrop__container-body-flex">
        <div className="location">
          <h3>{props.location}</h3>
          <select
            name="cities"
            id="#"
            defaultValue=""
            style={{
              // Dynamically set the background image based on dark mode status
              backgroundImage: isActive
                ? "var(--arrow-icon-dark)"
                : "var(--arrow-icon-light)",
            }}
          >
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
          <input type="date" defaultValue={defaultDate} />
        </div>

        <div className="time">
          <h3>{props.time}</h3>
          <input type="time" defaultValue={defaultTime} />
        </div>
      </div>
    </div>
  );
};
