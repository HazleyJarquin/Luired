export interface IUserAddress {
  name: string;
  fields: {
    IdUsuario: { stringValue: string };
    Celular: { stringValue: string };
    Direcciones: { arrayValue: { values: { stringValue: string }[] } };
    Ciudad: { stringValue: string };
    Estado: { stringValue: string };
  };
}
