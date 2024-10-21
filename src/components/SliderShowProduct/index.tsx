import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperObject } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./slideShow.css";

import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

import { useState } from "react";
interface Props {
  productImages: string[];
  imageTitle: string;
  className?: string;
}

export const SliderShowProduct = ({
  productImages,
  imageTitle,
  className,
}: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
  return (
    <div className={className}>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{ delay: 2500 }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {productImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={imageTitle}
              style={{ objectFit: "contain", borderRadius: 16 }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {productImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={imageTitle}
              width={300}
              height={300}
              style={{ objectFit: "contain", borderRadius: 16 }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
