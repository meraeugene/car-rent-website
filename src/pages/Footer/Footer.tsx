import { useContext } from "react";
import "./Footer.css";
import { DarkModeContext } from "../../context/DarkModeContext";

const Footer = () => {
  // dark mode
  const darkModeContext = useContext(DarkModeContext);

  if (!darkModeContext) {
    // Handle the case where the context is undefined
    return null;
  }

  const { isActive } = darkModeContext;

  return (
    <div className={`footer__container ${isActive ? "darkmode" : ""}`}>
      <div className="logo-menu__container">
        <div className="company-description">
          <div className="flex-logo">
            <img
              src="/images/carrentlogo.png"
              alt="car rent logo"
              style={{ width: "70px", height: "70px", objectFit: "cover" }}
              loading="lazy"
            />
          </div>
          <p>
            Our vision is to provide convenience and help increase your sales
            business.
          </p>
        </div>
        <div className="footer-menu">
          <div className="about">
            <h2>About</h2>
            <span>How it works</span>
            <span>Featured</span>
            <span>Partnership</span>
            <span>Business Relation</span>
          </div>
          <div className="community">
            <h2>Community</h2>
            <span>Events</span>
            <span>Blog</span>
            <span>Podcast</span>
            <span>Invite a friend</span>
          </div>
          <div className="socials">
            <h2>Socials</h2>
            <span>Discord</span>
            <span>Instagram</span>
            <span>Twitter</span>
            <span>Facebook</span>
          </div>
        </div>
      </div>
      <div className="copyright-privacy__container">
        <div className="copyright">
          <span>©2023 CAR RENT. All rights reserved</span>
        </div>
        <div className="privacy">
          <span> Privacy & Policy</span>
          <span> Terms & Condition</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
