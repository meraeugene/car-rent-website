// Import necessary dependencies and styles
import { useContext } from "react";
import { formatCurrency } from "../../utilities/formatCurrency";
import "./Card.css";
import { LikedCarsContext } from "../../context/LikedCarContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

// Define the type for the props received by the Card component
type CardProps = {
  array: {
    id: string;
    name: string;
    description: string;
    images: {
      view1: string;
      view2: string;
      view3: string;
    };
    gas: string;
    drive_mode: string;
    people: number;
    price: number;
    original_price: number | string;
  }[];
};

export const Card = ({ array }: CardProps) => {
  const likedCarsContent = useContext(LikedCarsContext);

  if (!likedCarsContent) {
    return null;
  }

  const {
    likedCars,
    addLikedCar,
    removeLikedCar,
    openTooltipId,
    setOpenTooltipId,
  } = likedCarsContent;

  const handleTooltipClose = () => {
    setOpenTooltipId(null);
  };

  return (
    <>
      {array.map((card) => {
        const isLiked = likedCars.some((car) => car.id === card.id);

        const toggleLike = () => {
          if (isLiked) {
            removeLikedCar(card.id);
            setOpenTooltipId(card.id); // Set the tooltip to "Remove from collection" after removing the car
            setTimeout(() => {
              setOpenTooltipId(null);
            }, 500);
          } else {
            addLikedCar(card);
            setOpenTooltipId(card.id); // Set the tooltip to "Added to collection" after adding the car
            setTimeout(() => {
              setOpenTooltipId(null);
            }, 500);
          }
        };

        return (
          <motion.div
            layout
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className="card__container"
            key={card.id}
          >
            <div className="card__header">
              <div className="card__header-flex">
                <h3>{card.name}</h3>
                <Tooltip
                  TransitionComponent={Zoom}
                  placement="bottom"
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={handleTooltipClose} // Call handleTooltipClose when the tooltip is manually closed
                  open={openTooltipId === card.id}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={
                    isLiked ? "Added to collection" : "Remove from collection"
                  }
                >
                  <button
                    type="button"
                    style={{
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                    onClick={toggleLike}
                  >
                    {isLiked ? (
                      <img src="/images/Like Red.svg" alt="" loading="lazy" />
                    ) : (
                      <img src="/images/Like.svg" alt="" loading="lazy" />
                    )}
                  </button>
                </Tooltip>
              </div>
              <span className="offwhite-text">{card.description}</span>
            </div>
            <Link to={`/cars/${card.id}`} state={{ cardData: card }}>
              <div className="card__body">
                <div className="card__content-img">
                  <img src={card.images.view1} alt="car" loading="lazy" />
                </div>
                <div className="card__content-modes">
                  <div className="gas">
                    <img
                      src="/images/gas-station.svg"
                      alt="gas logo"
                      loading="lazy"
                    />
                    <span>{card.gas}</span>
                  </div>
                  <div className="mode">
                    <img
                      src="/images/Car.svg"
                      alt="drive logo"
                      loading="lazy"
                    />
                    <span>{card.drive_mode}</span>
                  </div>
                  <div className="people">
                    <img
                      src="/images/profile-2user.svg"
                      alt="people logo"
                      loading="lazy"
                    />
                    <span>{card.people} People</span>
                  </div>
                </div>
              </div>
            </Link>

            <div className="card__footer">
              <div className="col">
                <h3>
                  {formatCurrency(card.price)}/<span>day</span>
                </h3>
                <span>{formatCurrency(card.original_price)}</span>
              </div>

              <Link to={`/${card.id}/payment`} state={{ cardData: card }}>
                <button className="rentnowBtn">Rent Now</button>
              </Link>
            </div>
          </motion.div>
        );
      })}
    </>
  );
};
