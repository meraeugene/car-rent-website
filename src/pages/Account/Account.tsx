import "./Account.css";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/DarkModeContext";
import { useContext } from "react";
import BlurHashImage from "../../components/BlurHashImage/blurHashImage";

export const Account = () => {
  // Use the DarkModeContext to access dark mode state and functions
  const darkModeContext = useContext(DarkModeContext);

  // Handle the case where the context is undefined
  if (!darkModeContext) {
    return null;
  }

  // Extract isActive and toggleDarkMode from the context
  const { isActive, toggleDarkMode } = darkModeContext;

  // Toggle the dark mode when the button is clicked
  const handleButtonClick = () => {
    toggleDarkMode();
  };

  // Toggle the dashboard aside visibility
  const handleDashboardAsideToggle = () => {
    const dashboardAside = document.querySelector(".dashboard__aside");
    dashboardAside?.classList.toggle("dashboard__aside-show");
  };

  return (
    <div className={`account__grid-container ${isActive ? "darkmode" : ""}`}>
      <aside className={`dashboard__aside ${isActive ? "darkmode" : ""}`}>
        <div className="main-menu__container">
          <span>MAIN MENU</span>

          <ul>
            <Link to="/account" className="active custom-link">
              <img
                src="images/aside icons/home.svg"
                alt="home"
                loading="lazy"
              />
              <span>Dashboard</span>
            </Link>
            <Link to="/" className="custom-link">
              <img src="images/aside icons/car.svg" alt="car" loading="lazy" />
              <span>Car Rent</span>
            </Link>
            <Link to="/insight" className="custom-link">
              <img
                src="images/aside icons/chart.svg"
                alt="chart"
                loading="lazy"
              />
              <span>Insight</span>
            </Link>
            <Link to="/reimburse" className="custom-link">
              <img
                src="images/aside icons/empty-wallet-change.svg"
                alt="empty wallet"
                loading="lazy"
              />
              <span>Reimburse</span>
            </Link>
            <Link to="/calendar" className="custom-link">
              <img
                src="images/aside icons/calendar.svg"
                alt="calendar"
                loading="lazy"
              />
              <span>Calendar</span>
            </Link>
          </ul>

          <div
            className="close__button-container"
            onClick={handleDashboardAsideToggle}
          >
            <i className="ri-close-line close__button"></i>{" "}
          </div>
        </div>

        <div className="preference__container">
          <span>PREFERENCES</span>
          <ul>
            <Link to="/settings" className=" custom-link">
              <img
                src="images/aside icons/setting.svg"
                alt="setting"
                loading="lazy"
              />
              <span>Settings</span>
            </Link>
            <Link to="/helpcenter" className="custom-link">
              <img
                src="images/aside icons/info-circle.svg"
                alt="help&center"
                loading="lazy"
              />
              <span>Help & Center</span>
            </Link>
            <li className="custom-link">
              <div className="flex-between">
                <div className="darkmode-left-col">
                  <img
                    src="images/aside icons/briefcase.svg"
                    alt="briefcase"
                    loading="lazy"
                  />
                  <span className="darkmodetxt">Dark Mode</span>
                </div>
                <div
                  className={`darkmodebtn ${isActive ? "active" : ""}`}
                  onClick={handleButtonClick}
                >
                  <div className="btn__indicator">
                    <div className="btn__icon-container">
                      {isActive ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                        >
                          <path
                            d="M1.26498 7.7418C1.48938 10.952 4.21334 13.5637 7.47338 13.7071C9.77348 13.8068 11.8305 12.7347 13.0647 11.0455C13.5758 10.3536 13.3015 9.89231 12.4476 10.0481C12.0299 10.1229 11.5998 10.1541 11.151 10.1354C8.10294 10.0107 5.60961 7.46131 5.59714 4.45061C5.59091 3.64027 5.75921 2.87357 6.06464 2.17544C6.40124 1.40251 5.99608 1.03474 5.21691 1.36511C2.74851 2.40607 1.05928 4.89317 1.26498 7.7418Z"
                            stroke="#FFFFFF"
                            strokeWidth="1.24667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <img src="/images/sun.svg" alt="sun" loading="lazy" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="logout">
          <img
            src="images/aside icons/logout.svg"
            alt="logout"
            loading="lazy"
          />
          <span>Log Out</span>
        </div>
      </aside>
      <div className="main-details__container">
        <h1 style={{ marginBottom: ".5em" }}>Details Rental</h1>
        <BlurHashImage
          src="images/details/map.png"
          className="map"
          hash="L6RyshM|-n%2axofRkt7~U%LE3of"
          height={272}
        />
        <div className="car-details__container" style={{ marginTop: "1em" }}>
          <div className="car-info__container">
            <div className="img__container">
              <BlurHashImage
                hash="LoJkl$WB-;t7~qWBxaof-;fPofof"
                src="images/details/car.png"
                height={36}
                width={116}
              />
            </div>
            <div>
              <h1>Nissan GT-R</h1>
              <p>Sport Car</p>
            </div>
          </div>
          <div className="car-number__container">
            <span>#9761</span>
          </div>
        </div>
        <div className="pickdropoff__container">
          <div className="pickup__container">
            <div className="pickup__header">
              <div className="mark1">
                <img src="images/details/Mark1.svg" alt="mark" loading="lazy" />
              </div>
              <span>Pick-Up</span>
            </div>

            <div className="pickup-info__container">
              <div className="location">
                <span>Locations</span>
                <select
                  name="cities"
                  id="#"
                  style={{
                    // Dynamically set the background image based on dark mode status
                    backgroundImage: isActive
                      ? "var(--arrow-icon-dark)"
                      : "var(--arrow-icon-light)",
                  }}
                >
                  <option value="Cagayan de Oro">Cagayan de Oro</option>
                  <option value="manila">Manila</option>
                  <option value="cebu">Cebu</option>
                  <option value="davao">Davao</option>
                  <option value="baguio">Baguio</option>
                </select>
              </div>
              <div className="date">
                <span>Date</span>
                <input type="date" />
              </div>
              <div className="time">
                <span>Time</span>
                <input type="time" />
              </div>
            </div>
          </div>

          <div className="dropoff__container">
            <div className="dropoff-header">
              <div className="mark2">
                <img src="images/details/Mark2.svg" alt="mark" loading="lazy" />
              </div>
              <span>Drop-Off</span>
            </div>

            <div className="dropoff-info__container">
              <div className="location">
                <span>Locations</span>
                <select
                  name="cities"
                  id="#"
                  style={{
                    // Dynamically set the background image based on dark mode status
                    backgroundImage: isActive
                      ? "var(--arrow-icon-dark)"
                      : "var(--arrow-icon-light)",
                  }}
                >
                  <option value="Davao">Davao</option>
                  <option value="manila">Manila</option>
                  <option value="cebu">Cebu</option>
                  <option value="cagayan">Cagayan de oro</option>
                  <option value="baguio">Baguio</option>
                </select>
              </div>
              <div className="date">
                <span>Date</span>
                <input type="date" />
              </div>
              <div className="time">
                <span>Time</span>
                <input type="time" />
              </div>
            </div>
          </div>
        </div>
        <div className="total-rental-price__container">
          <div className="info">
            <span>Total Rental Price</span>
            <p>Overall price and includes rental discount</p>
          </div>
          <div className="price">
            <h1>$80.00</h1>
          </div>
        </div>
      </div>
      <div className="top-cars__container">
        <div className="header">
          <h1>Top 5 Car Rental</h1>
          {isActive ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                stroke="#FFFFFF"
                stroke-width="1.5"
              />
              <path
                d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                stroke="#FFFFFF"
                stroke-width="1.5"
              />
              <path
                d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                stroke="#FFFFFF"
                stroke-width="1.5"
              />
            </svg>
          ) : (
            <img src="images/top/menu.svg" alt="" loading="lazy" />
          )}
        </div>
        <div className="content">
          <div className="content-left-col">
            <h3>72,030</h3>
            <h4>Rental Car</h4>
            <div className="ellipse__container">
              <img src="/images/top/Chart.svg" alt="chart" loading="lazy" />
            </div>
          </div>
          <div className="content-right-col">
            <ul>
              <li>
                <div className="left-flex">
                  <div className="mark"></div>
                  <h4>Sport Car</h4>
                </div>
                <span>17,439</span>
              </li>
              <li>
                <div className="left-flex">
                  <div
                    className="mark"
                    style={{ backgroundColor: "#175D9C" }}
                  ></div>
                  <h4>SUV</h4>
                </div>
                <span>9,478</span>
              </li>
              <li>
                <div className="left-flex">
                  <div
                    className="mark"
                    style={{ backgroundColor: "#175D9C" }}
                  ></div>
                  <h4>Coupe</h4>
                </div>
                <span>18,197</span>
              </li>
              <li>
                <div className="left-flex">
                  <div
                    className="mark"
                    style={{ backgroundColor: "#63A9E8" }}
                  ></div>
                  <h4>Hatchback</h4>
                </div>
                <span>12,510</span>
              </li>
              <li>
                <div className="left-flex">
                  <div
                    className="mark"
                    style={{ backgroundColor: "#A6CEF2" }}
                  ></div>
                  <h4>MPV</h4>
                </div>
                <span>14,406</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="recent-transaction__container">
        <div className="header">
          <h1>Recent Transaction</h1>
          <span>View All</span>
        </div>
        <div className="cars-content">
          <div className="car-info">
            <div className="left">
              <BlurHashImage
                src="images/recent/car1.png"
                hash="L4BdjM{}1HJ7-V,tIoNu0d7J|en%"
                width={90}
                height={90}
                objectFit="contain"
              />
              <div className="info__container">
                <h3>Nissan GT-R Premium</h3>
                <p>Sport Car</p>
              </div>
            </div>
            <div className="date-price__container">
              <span>20 July</span>
              <h3>$80.00</h3>
            </div>
          </div>
          <div className="car-info">
            <div className="left">
              <BlurHashImage
                src="images/recent/car2.png"
                hash="L271o~-;00IU~q%MIUIU00M__3of"
                width={90}
                height={90}
                objectFit="contain"
              />
              <div className="info__container">
                <h3>Nissan Z Sport</h3>
                <p>Sport Car</p>
              </div>
            </div>
            <div className="date-price__container">
              <span>20 July</span>
              <h3>$99.00</h3>
            </div>
          </div>
          <div className="car-info">
            <div className="left">
              <BlurHashImage
                src="images/recent/car3.png"
                hash="L24evn-=DgRO_4x^ITM{00ROtoWW"
                width={90}
                height={90}
                objectFit="contain"
              />
              <div className="info__container">
                <h3>Nissan Leaf SV</h3>
                <p>Electric Car</p>
              </div>
            </div>
            <div className="date-price__container">
              <span>20 July</span>
              <h3>$96.00</h3>
            </div>
          </div>
          <div className="car-info">
            <div className="left">
              <BlurHashImage
                src="images/recent/car4.png"
                hash="L36*gp?b009F~q%M9FIU00IU?bxu"
                width={90}
                height={90}
                objectFit="contain"
              />
              <div className="info__container">
                <h3>Nissan Ariya Engage FWD</h3>
                <p>Electric Car</p>
              </div>
            </div>
            <div className="date-price__container">
              <span>20 July</span>
              <h3>$80.00</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
