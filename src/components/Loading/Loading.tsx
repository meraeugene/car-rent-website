import { useContext } from "react";
import "./Loading.css";
import { DarkModeContext } from "../../context/DarkModeContext";

const Loading = () => {
  // dark mode
  const darkModeContext = useContext(DarkModeContext);

  if (!darkModeContext) {
    // Handle the case where the context is undefined
    return null;
  }

  const { isActive } = darkModeContext;

  return (
    <div className={`loading-wrapper ${isActive ? "darkmode" : ""}`}>
      <div className="wrapper">
        <div className="box-wrap">
          <div className="box one"></div>
          <div className="box two"></div>
          <div className="box three"></div>
          <div className="box four"></div>
          <div className="box five"></div>
          <div className="box six"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
