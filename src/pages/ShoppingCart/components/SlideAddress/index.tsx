import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import styles from "./styles.module.css";
import { AddressesCard } from "../AddressesCard";
import { IUserAddress } from "../../../../interfaces";

interface Props {
  address: IUserAddress[];
  handleChange: (newSelection: string) => void;
  userAddressToSave: string;
}

export const SlideAddress = ({
  address,
  handleChange,
  userAddressToSave,
}: Props) => {
  return (
    <Swiper
      className={styles.swiper}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      spaceBetween={10}
      slidesPerView={1}
    >
      {address?.map((address, index) => (
        <SwiperSlide key={index}>
          <AddressesCard
            address={address}
            handleChange={handleChange}
            userAddressToSave={userAddressToSave}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
