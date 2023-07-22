import "./Reviews.css";

type ReviewsProps = {
  img: string;
  title: string;
  role: string;
  desc: string;
  date: string;
};

const Reviews = ({ img, title, role, desc, date }: ReviewsProps) => {
  return (
    <div className="reviews__container-content">
      <div className="reviews-content__body">
        <div className="reviews-content-profile">
          <img src={img} alt="profile" loading="lazy" />
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
