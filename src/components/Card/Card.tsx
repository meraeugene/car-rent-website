// Import necessary dependencies and styles
import { useContext } from "react";
import { formatCurrency } from "../../utilities/formatCurrency";
import "./Card.css";
import { LikedCarsContext } from "../../context/LikedCarContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

// Card component
export const Card = ({ array }: CardProps) => {
  // Access the LikedCarsContext using useContext
  const likedCarsContent = useContext(LikedCarsContext);

  // If the likedCarsContent is not available, return null
  if (!likedCarsContent) {
    return null;
  }

  // Destructure the likedCars and functions addLikedCar and removeLikedCar from likedCarsContent
  const { likedCars, addLikedCar, removeLikedCar } = likedCarsContent;

  return (
    <>
      {array.map((card) => {
        // Check if the current card is liked by the user
        const isLiked = likedCars.some((car) => car.id === card.id);

        // Function to toggle like status for a card
        const toggleLike = () => {
          if (isLiked) {
            removeLikedCar(card.id); // Remove the card from likedCars if already liked
          } else {
            addLikedCar(card); // Add the card to likedCars if not already liked
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
