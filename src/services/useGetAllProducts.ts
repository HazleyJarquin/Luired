import { useQuery } from "react-query";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllProducts = async (): Promise<any> => {
  const response = await axios.get(
    `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/productos`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response?.data;
};

export const useGetAllProducts = () => {
  return useQuery(["getAllProducts"], {
    async queryFn() {
      return getAllProducts();
    },
  });
};
