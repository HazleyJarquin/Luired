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
  mainImageHeight: string;
  showThumbs?: boolean;
}

export const SliderShowProduct = ({
  productImages,
  imageTitle,
  mainImageHeight,
  showThumbs = true,
}: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
            width: "100%",
            height: mainImageHeight,
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
        {productImages?.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={imageTitle}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: 16,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {showThumbs && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
          style={{ width: "100%", height: "20%" }}
        >
          {productImages?.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={imageTitle}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: 16,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};
