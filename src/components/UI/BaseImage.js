import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export const BaseImage = ({ className, src, alt, width, height }) => (
  <Zoom>
    <Image
      className={className}
      alt={alt}
      src={src}
      width={width}
      height={height}
    />
  </Zoom>
);
