import BlurHashImage from "../BlurHashImage/blurHashImage";
import "./Reviews.css";

type ReviewsProps = {
  img: string;
  title: string;
  role: string;
  desc: string;
  date: string;
  hash: string;
};

const Reviews = ({ img, title, role, desc, date, hash }: ReviewsProps) => {
  return (
    <div className="reviews__container-content">
      <div className="reviews-content__body">
        <div className="reviews-content-profile">
          <BlurHashImage
            src={img}
            hash={hash}
            width={56}
            height={56}
            className="reviews-content-profile-img "
          />
          <div className="reviews-content-desc">
            <h2>{title}</h2>
            <h4>{role}</h4>
          </div>
        </div>

        <div className="reviews-content-stars">
          <div className="reviews-content-stars-flex">
            <i className="ri-star-fill star"></i>
            <i className="ri-star-fill star"></i>
            <i className="ri-star-fill star"></i>
            <i className="ri-star-fill star"></i>
            <i className="ri-star-line star"></i>
          </div>
          <h4>{date}</h4>
        </div>

        <div className="reviews-content-desc">
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
