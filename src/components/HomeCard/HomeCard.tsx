import "./HomeCard.css";

type HomeCardProps = {
  classNameContainer: string;
  classNameInfo: string;
  classNameImage: string;
  title: string;
  description: string;
  image: string;
  button: string;
};

export const HomeCard = (props: HomeCardProps) => {
  return (
    <div className={props.classNameContainer}>
      <div className={props.classNameInfo}>
        <blockquote>
          <h1>{props.title}</h1>
        </blockquote>
        <blockquote>
          <p>{props.description}</p>
        </blockquote>

        <button>{props.button}</button>
      </div>

      <div className={props.classNameImage}>
        <img src={props.image} alt="white car" loading="lazy" />
      </div>
    </div>
  );
};
