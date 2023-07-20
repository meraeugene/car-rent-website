import { useLocation, Link } from "react-router-dom";
import "./CarDetails.css";
import { formatCurrency } from "../../utilities/formatCurrency";
import Reviews from "../../components/Reviews/Reviews";
import RecentCar from "../../components/RecentCar/RecentCar";
import RecommendCars from "../../components/RecommendCars/RecommendCars";
import { Footer } from "..";
import { useContext, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { DarkModeContext } from "../../context/DarkModeContext";

// Define the CarData type
type CarData = {
  id: string;
  section: string;
  name: string;
  images: {
    view1: string;
    view2: string;
    view3: string;
  };
  description: string;
  gas: string;
  drive_mode: string;
  people: number;
  price: number;
  original_price: string;
};

export const CarDetails = () => {
  // Get the current location and extract the cardData from the state
  const location = useLocation();
  const cardData = (location.state && location.state.cardData) as CarData;

  // Handle case when card data is not available
  if (!cardData) {
    return <div>Card data not found</div>;
  }

  // State to control showing all reviews or not
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Function to toggle showing all reviews
  const toggleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  // Get the dark mode context
  const darkModeContext = useContext(DarkModeContext);

  // Handle the case where the context is undefined
  if (!darkModeContext) {
    return null;
  }

  // Extract the isActive property from the context
  const { isActive } = darkModeContext;

  return (
    <>
      <div
        className={`car-details-main__container ${isActive ? "darkmode" : ""}`}
      >
        <div className="flex-normal">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                src={cardData.images.view1}
                alt={cardData.name}
                loading="lazy"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src={cardData.images.view2}
                alt={cardData.name}
                loading="lazy"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src={cardData.images.view3}
                alt={cardData.name}
                loading="lazy"
              />
            </SwiperSlide>
          </Swiper>

          <div className="car-context">
            <div className="car-context__header">
              <h1>{cardData.name}</h1>
              <div className="car-context__header-flex">
                <img src="/images/star.png" alt="star" loading="lazy" />
                <img src="/images/star.png" alt="star" loading="lazy" />
                <img src="/images/star.png" alt="star" loading="lazy" />
                <img src="/images/star.png" alt="star" loading="lazy" />
                <img src="/images/star-empty.png" alt="star" loading="lazy" />

                <span>440+ Reviewer</span>
              </div>
            </div>

            <div className="car-context__body">
              <p>
                {cardData.name} has become the embodiment of {cardData.name}'s
                outstanding performance, inspired by the most unforgiving
                proving ground, the "race track".
              </p>

              <div className="specifications">
                <div className="specifications-one">
                  <div className="type">
                    <h4>Type Car</h4>
                    <span>{cardData.description}</span>
                  </div>
                  <div className="steering">
                    <h4>Steering</h4>
                    <span>{cardData.drive_mode}</span>
                  </div>
                </div>
                <div className="specifications-two">
                  <div className="capacity">
                    <h4>Capacity</h4>
                    <span>{cardData.people} Person</span>
                  </div>
                  <div className="gasoline">
                    <h4>Gasoline</h4>
                    <span>{cardData.gas}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="car-context__footer">
              <div className="footer-prices">
                <h1>
                  {formatCurrency(cardData.price)}/ <span>days</span>
                </h1>
                <span>{formatCurrency(cardData.original_price)}</span>
              </div>

              <div className="footer-btn">
                <Link
                  to={`/${cardData.id}/payment`}
                  state={{ cardData: cardData }}
                >
                  <button type="button" className="rentnowBtn">
                    Rent now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="reviews__container ">
          <div className="reviews-content__header">
            <h3>Reviews</h3>
            <span>5+</span>
          </div>
          <div className="reviews-grid">
            {showAllReviews ? (
              <>
                <Reviews
                  title="Nico de los Santos"
                  img="/images/profile1.jpg"
                  role="CEO at Amazon"
                  desc="We are greatly impressed by the Car Rent application. Car Rent offers an extensive fleet of cars at affordable prices, and their user-friendly interface makes it convenient to book a rental car. The customer service provided by Car Rent is exceptional, with friendly and polite staff."
                  date="9 July 2023"
                />
                <Reviews
                  title="Jiki Cabrera"
                  img="/images/profile3.jpg"
                  role="Chief Marketing Officer at Google"
                  desc="I highly recommend the Car Rent application for hassle-free car rentals. Car Rent provides a wide range of cars with excellent facilities, all at competitive prices. The officers associated with Car Rent are not only friendly but also highly professional in their services."
                  date="12 July 2023"
                />
                <Reviews
                  title="Maybe Rick"
                  img="/images/profile2.jpg"
                  role="CTO at Microsoft"
                  desc="The Car Rent application has been instrumental in meeting our car rental needs. Car Rent offers a diverse selection of cars with comfortable amenities and reasonable prices. The officers associated with Car Rent are friendly, polite, and provide excellent service. User-friendly interface of the Car Rent application have made."
                  date="10 July 2023"
                />
                <Reviews
                  title="Job en"
                  img="/images/profile4.jpg"
                  role="VP of Operations at Tesla"
                  desc="We have had a fantastic experience using the Car Rent application. Car Rent offers a wide variety of cars with good facilities and comfortable features, all at affordable prices. The service provided by the officers associated with Car Rent is exceptionally friendly and polite."
                  date="11 July 2023"
                />
                <Reviews
                  title="Shammy"
                  img="/images/profile5.jpg"
                  role="Managing Director at Apple"
                  desc="The Car Rent application has proven to be a valuable resource for our car rental needs. Car Rent offers a comprehensive range of cars with competitive pricing and convenient facilities. The officers associated with Car Rent are friendly, polite, and provide exceptional service."
                  date="13 July 2023"
                />
                <Reviews
                  title="Andrés"
                  img="/images/profile6.jpg"
                  role="CFO at Uber"
                  desc="We are highly satisfied with the services offered by the Car Rent application. Car Rent provides a wide variety of cars with good facilities and comfortable amenities, all at affordable prices. The officers associated with Car Rent are friendly, polite, and provide excellent customer service."
                  date="8 July 2023"
                />
              </>
            ) : (
              <>
                <Reviews
                  title="Nico de los Santos"
                  img="/images/profile1.jpg"
                  role="CEO at Amazon"
                  desc="We are greatly impressed by the Car Rent application. Car Rent offers an extensive fleet of cars at affordable prices, and their user-friendly interface makes it convenient to book a rental car. The customer service provided by Car Rent is exceptional, with friendly and polite staff."
                  date="9 July 2023"
                />
                <Reviews
                  title="Jiki Cabrera"
                  img="/images/profile3.jpg"
                  role="Chief Marketing Officer at Google"
                  desc="I highly recommend the Car Rent application for hassle-free car rentals. Car Rent provides a wide range of cars with excellent facilities, all at competitive prices. The officers associated with Car Rent are not only friendly but also highly professional in their services."
                  date="12 July 2023"
                />
                <Reviews
                  title="Maybe Rick"
                  img="/images/profile2.jpg"
                  role="CTO at Microsoft"
                  desc="The Car Rent application has been instrumental in meeting our car rental needs. Car Rent offers a diverse selection of cars with comfortable amenities and reasonable prices. The officers associated with Car Rent are friendly, polite, and provide excellent service. User-friendly interface of the Car Rent application have made."
                  date="10 July 2023"
                />
              </>
            )}
          </div>
          <div
            className="reviews-content__footer flex"
            onClick={toggleShowAllReviews}
          >
            <h3 style={{ textAlign: "center", cursor: "pointer" }}>
              {showAllReviews ? "Show Less" : "Show All"}
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8.00026 11.1996C7.53359 11.1996 7.06692 11.0196 6.71359 10.6663L2.36692 6.31964C2.17359 6.1263 2.17359 5.80631 2.36692 5.61297C2.56026 5.41964 2.88026 5.41964 3.07359 5.61297L7.42026 9.95964C7.74026 10.2796 8.26026 10.2796 8.58026 9.95964L12.9269 5.61297C13.1203 5.41964 13.4403 5.41964 13.6336 5.61297C13.8269 5.80631 13.8269 6.1263 13.6336 6.31964L9.28692 10.6663C8.93359 11.0196 8.46692 11.1996 8.00026 11.1996Z"
                fill="#90A3BF"
                stroke="#90A3BF"
                strokeWidth="0.5"
              />
            </svg>
          </div>
          <div />
        </div>

        <RecentCar />

        <RecommendCars />
      </div>
      <Footer />
    </>
  );
};
