import { useMutation } from "react-query";
import axios from "axios";
import { IUserAddress } from "../interfaces";

type AddressRequest = Omit<IUserAddress, "name">;

const addAddress = async (requestData: AddressRequest) => {
  const response = await axios.post(
    `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/direcciones`,
    {
      fields: {
        IdUsuario: { stringValue: requestData.fields.IdUsuario.stringValue },
        Estado: { stringValue: requestData.fields.Estado.stringValue },
        Ciudad: { stringValue: requestData.fields.Ciudad.stringValue },
        Direccion: { stringValue: requestData.fields.Direccion.stringValue },
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response?.data;
};

export const useAddAddress = () => {
  return useMutation("addAddress", async (requestData: AddressRequest) => {
    return addAddress(requestData);
  });
};
