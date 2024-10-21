import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Correo inválido").required("Correo requerido"),
  password: Yup.string().required("Contraseña requerida"),
});
