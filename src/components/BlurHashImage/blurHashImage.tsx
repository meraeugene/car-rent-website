import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

type ObjectFit = "fill" | "contain" | "cover" | "none" | "scale-down";

type BlurHashImageProps = {
  src: string;
  className?: string;
  hash: string;
  height?: number;
  width?: number;
  objectFit?: ObjectFit;
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

  const width = props.width || "100%";
  const height = props.height || 200;
  const objectFit = props.objectFit || "cover";

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
          objectFit: objectFit,
          height: height,
          width: width,
        }}
      />
    </>
  );
};

export default BlurHashImage;
