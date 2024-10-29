import { useFormik } from "formik";
import { useEffect } from "react";
import { IUserAddress } from "../../../interfaces";
import { useAddAddress } from "../../../services";
import { useUserStore } from "../../../store";
import { AddressSchema } from "../../../schemas";

type AddressRequest = Omit<IUserAddress, "name">;

export const useCreateOrReadAddress = () => {
  const { user } = useUserStore();

  const {
    mutate: mutateCreateAddress,
    data: dataAddressResponse,
    isSuccess: isSuccessCreateAddress,
    isLoading: isLoadingAddAddress,
  } = useAddAddress();

  const initialValues = {
    fields: {
      IdUsuario: { stringValue: "" },
      Estado: { stringValue: "" },
      Ciudad: { stringValue: "" },
      Direccion: { stringValue: "" },
    },
  };

  const handleSubmit = (values: AddressRequest) => {
    const dataCreateAddress = {
      fields: {
        IdUsuario: { stringValue: user?.uid ?? "" },
        Estado: { stringValue: values.fields.Estado.stringValue },
        Ciudad: { stringValue: values.fields.Ciudad.stringValue },
        Direccion: { stringValue: values.fields.Direccion.stringValue },
      },
    };

    mutateCreateAddress(dataCreateAddress);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: AddressSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (dataAddressResponse) {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAddressResponse]);

  return {
    formik,
    dataAddressResponse,
    isSuccessCreateAddress,
    isLoadingAddAddress,
  };
};
