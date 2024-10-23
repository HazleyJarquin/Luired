import { useQuery } from "react-query";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllCategories = async (): Promise<any> => {
  const response = await axios.get(
    `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/categoriasProductos`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response?.data?.documents;
};

export const useGetProductsCategory = () => {
  return useQuery(["getAllCategories"], {
    async queryFn() {
      return getAllCategories();
    },
  });
};
