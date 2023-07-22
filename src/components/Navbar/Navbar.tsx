// Import necessary dependencies
import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { LikedCarsContext } from "../../context/LikedCarContext";
import Cars from "../../data/data.json";
import { DarkModeContext } from "../../context/DarkModeContext";
import "remixicon/fonts/remixicon.css";

const Navbar = () => {
  // Get likedCarsContent and darkModeContext from their respective contexts
  const likedCarsContent = useContext(LikedCarsContext);
  const darkModeContext = useContext(DarkModeContext);

  // If darkModeContext is not available, return null (do not render Navbar)
  if (!darkModeContext) {
    return null;
  }

  // Extract isActive from darkModeContext
  const { isActive } = darkModeContext;

  // State variables
  const [likedCarsCount, setLikedCarsCount] = useState(0);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLFormElement | null>(null);
  const filterButtonRef = useRef<HTMLDivElement>(null);
  const [openProfile, setOpenProfile] = useState(false);

  // useEffect to update likedCarsCount when likedCarsContent changes
  useEffect(() => {
    if (likedCarsContent) {
      setLikedCarsCount(likedCarsContent.likedCars.length);
    }

    // Click outside search bar to close the results
    const handleDocumentClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [likedCarsContent?.likedCars]);

  // Function to handle input change in the search bar
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    setShowResults(inputValue !== "");
  };

  // Function to handle when a car is clicked in the search results
  const handleCarClick = (carName: string) => {
    setQuery(carName);
    setShowResults(false);
  };

  // Function to handle logo click and clear search query
  const handleLogoClick = () => {
    setQuery("");
  };

  // New state variable to track the active status of the search bar
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Function to toggle show/hide the search bar on mobile and update isSearchActive
  const toggleSearch = () => {
    const searchBar = searchBarRef.current;
    const filterButton = filterButtonRef.current;

    searchBar?.classList.toggle("show-search");
    setIsSearchActive(!isSearchActive);

    filterButton?.classList.toggle("showfilterbtn");
  };

  const handleLinkClick = () => {
    setOpenProfile(false);
  };

  // Function to clear the search input and close the results
  const clearSearchInput = () => {
    const searchInput = searchBarRef.current?.querySelector(
      'input[type="search"]'
    );
    if (searchInput instanceof HTMLInputElement) {
      searchInput.value = "";
      setQuery("");
      setShowResults(false);
    }
  };

  // Function to toggle the dashboard__aside-show class on click
  const handleMenuButtonClick = () => {
    const dashboardAside = document.querySelector(".dashboard__aside");

    dashboardAside?.classList.toggle("dashboard__aside-show");

    // Check if the profile menu is open, and close it if needed
    if (openProfile) {
      setOpenProfile(false);
    }
  };

  const handleMenuButtonFilterClick = () => {
    const filterAside = document.querySelector(".filter__aside");
    filterAside?.classList.toggle("filter__aside-show");
  };

  const location = useLocation();

  // Function to check if the current location is on account.tsx
  const isAccountPage = location.pathname === "/account";
  const isCategoryPage = location.pathname === "/category";

  return (
    <nav className={`nav ${isActive ? "darkmode" : ""}`}>
      <div className="nav-wrapper-mobile">
        <div className="nav-wrapper-mobile-left">
          {isAccountPage && (
            <div
              className="menu-button__container-account"
              onClick={handleMenuButtonClick}
            >
              <i className="ri-menu-line menu__button"></i>
            </div>
          )}
          {!isAccountPage && !isCategoryPage && (
            <Link
              to="/"
              className="nav__logo-main"
              style={{ textDecoration: "none" }}
              onClick={handleLogoClick}
            >
              <img
                src="/images/carrentlogo.png"
                alt="car rent logo"
                style={{ width: "40px", height: "40px" }}
                loading="lazy"
              />
            </Link>
          )}
          {isCategoryPage && (
            <div
              className="menu-button__container-category"
              onClick={handleMenuButtonFilterClick}
            >
              <i className="ri-menu-line menu__button"></i>
            </div>
          )}
        </div>
        <div className="nav-wrapper">
          <Link
            to="/"
            className="nav__logo"
            style={{ textDecoration: "none" }}
            onClick={handleLogoClick}
          >
            <img
              src="/images/carrentlogo.png"
              alt="car rent logo"
              style={{ width: "40px", height: "100%" }}
              loading="lazy"
            />
          </Link>

          <div className="nav-right">
            <div className="nav__search" ref={searchRef}>
              <form action="" className="search" ref={searchBarRef}>
                <input
                  type="search"
                  placeholder="Search"
                  className="search__input"
                  value={query}
                  onChange={handleInputChange}
                  id="#"
                  name="#"
                />
                <div className="search__button" onClick={toggleSearch}>
                  <i className="ri-search-2-line search__icon"></i>
                  <i
                    className="ri-close-line search__close"
                    onClick={clearSearchInput}
                  ></i>
                </div>
                <Link to="/category">
                  <div className="filter__button" ref={filterButtonRef}>
                    <i className="ri-equalizer-line search__filter"></i>
                  </div>
                </Link>
              </form>
              {/* Display search results */}
              {showResults && (
                <div className="search-results">
                  {Cars.filter((car) =>
                    car.name.toLowerCase().includes(query.toLowerCase())
                  ).map((car) => (
                    <Link
                      to={`/cars/${car.id}`}
                      state={{ cardData: car } as any}
                      className="result"
                      key={car.id}
                      onClick={() => handleCarClick(car.name)}
                    >
                      <img src={car.images.view1} alt="" loading="lazy" />
                      <h2>{car.name}</h2>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="nav__menu">
              <Link to="/collection" className="icon ">
                <div className="heart-container">
                  <i
                    className="ri-heart-3-fill"
                    style={{ fontSize: "1.2rem", color: "#596780" }}
                  ></i>
                  {likedCarsCount > 0 && (
                    <div className="likedCarsCounter">{likedCarsCount}</div>
                  )}
                </div>
              </Link>
              <Link to="/notifications" className="icon">
                <div className="icon-container">
                  <i
                    className="ri-notification-4-fill"
                    style={{ fontSize: "1.2rem", color: "#596780" }}
                  ></i>
                </div>
              </Link>
              <Link to="/settings" className="icon">
                <div className="icon-container">
                  <i
                    className="ri-settings-3-fill"
                    style={{ fontSize: "1.2rem", color: "#596780" }}
                  ></i>
                </div>
              </Link>
              <Link to="/account" className="icon">
                <div className="icon-container">
                  <img
                    src={`/images/profile.jpg`}
                    alt="profile"
                    loading="lazy"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </Link>
            </div>

            <div className="profile-mobile">
              <img
                src={`/images/profile.jpg`}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="profile"
                loading="lazy"
                onClick={() => setOpenProfile((prev) => !prev)}
              />
              {openProfile && (
                <div className="dropdown">
                  <ul>
                    <Link
                      to="/collection"
                      onClick={handleLinkClick}
                      className="link"
                    >
                      Collection
                      <div className="heart-container">
                        <i
                          className="ri-heart-3-fill"
                          style={{ fontSize: "1.2rem", color: "#596780" }}
                        ></i>
                        {likedCarsCount > 0 && (
                          <div className="likedCarsCounter">
                            {likedCarsCount}
                          </div>
                        )}
                      </div>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={handleLinkClick}
                      className="link"
                    >
                      Settings
                      <div className="icon-container">
                        <i
                          className="ri-settings-3-fill"
                          style={{ fontSize: "1.2rem", color: "#596780" }}
                        ></i>
                      </div>
                    </Link>
                    <Link
                      to="/notifications"
                      onClick={handleLinkClick}
                      className="link"
                    >
                      Notification
                      <div className="icon-container">
                        <i
                          className="ri-notification-4-fill"
                          style={{ fontSize: "1.2rem", color: "#596780" }}
                        ></i>
                      </div>
                    </Link>

                    <Link
                      to="/account"
                      onClick={handleLinkClick}
                      className="link"
                    >
                      Account
                      <div className="icon-container">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M10.0427 3.15016L10.0431 3.14985C11.1273 2.27904 12.8675 2.28414 13.968 3.16073C13.9681 3.16084 13.9682 3.16094 13.9684 3.16105L20.514 8.39756C20.5146 8.39802 20.5152 8.39849 20.5157 8.39895C20.893 8.70711 21.2196 9.18942 21.4304 9.74099C21.641 10.2922 21.7196 10.8699 21.6462 11.351L20.3873 18.8845C20.3872 18.885 20.3872 18.8855 20.3871 18.8859C20.1374 20.3188 18.7432 21.5 17.3 21.5H6.69996C5.23549 21.5 3.8725 20.3476 3.62294 18.8965C3.62288 18.8961 3.62282 18.8958 3.62276 18.8955L2.36313 11.3576L2.36293 11.3565C2.28079 10.8718 2.35452 10.293 2.56465 9.74192C2.77476 9.19094 3.10548 8.70909 3.4918 8.40086L3.49267 8.40016L10.0427 3.15016ZM12 19.25C12.6861 19.25 13.25 18.6862 13.25 18V15C13.25 14.3139 12.6861 13.75 12 13.75C11.3138 13.75 10.75 14.3139 10.75 15V18C10.75 18.6862 11.3138 19.25 12 19.25Z"
                            fill="#596780"
                            stroke="#596780"
                          />
                        </svg>
                      </div>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
