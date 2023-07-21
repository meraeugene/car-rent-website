import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

type BlurHashImageProps = {
  src: string;
  className?: string;
  hash: string;
  height?: number;
  width?: number;
};

const BlurHashImage = (props: BlurHashImageProps): JSX.Element => {
  // blurhash images
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = props.src;
  }, [props.src]);

  const height = props.height || 200;
  const width = props.width || "100%";

  return (
    <>
      <div style={{ display: imageLoaded ? "none" : "inline" }}>
        <Blurhash
          hash={props.hash}
          width={width}
          height={height}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>
      <img
        className={props.className}
        src={props.src}
        alt=""
        style={{
          display: !imageLoaded ? "none" : "inline",
          objectFit: "cover",
          height: height,
          width: width,
        }}
      />
    </>
  );
};

export default BlurHashImage;
