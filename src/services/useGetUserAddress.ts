import { useQuery } from "react-query";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getUserAddress = async (): Promise<any> => {
  const response = await axios.get(
    `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/direcciones`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response?.data.documents;
};

export const useGetUserAddress = () => {
  return useQuery(["getUserAddress"], {
    async queryFn() {
      return getUserAddress();
    },
  });
};
