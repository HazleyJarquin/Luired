// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

interface Props {
  images: string[];
  width?: string;
  height?: string;
  imageSizes?: {
    width: string;
    height: string;
  };
}

export const Slider = ({
  images,
  width = "100%",
  height = "400px",
  imageSizes,
}: Props) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      style={{
        width: width,
        maxWidth: "800px",
        margin: "0 auto",
        height: height,
        display: "flex",
        alignItems: "center",
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide
          key={index}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img
            src={image}
            alt={`Slide ${index}`}
            style={{
              width: imageSizes?.width,
              height: imageSizes?.height,
              objectFit: "contain",
              borderRadius: "10px",
              transition: "transform 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform =
                "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform =
                "scale(1)";
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
