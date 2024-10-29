import * as Yup from "yup";

export const AddressSchema = Yup.object().shape({
  fields: Yup.object().shape({
    Estado: Yup.object().shape({
      stringValue: Yup.string().required("El estado es requerido"),
    }),
    Ciudad: Yup.object().shape({
      stringValue: Yup.string().required("La ciudad es requerida"),
    }),
    Direccion: Yup.object().shape({
      stringValue: Yup.string().required("La dirección es requerida"),
    }),
  }),
});
