export interface IUserAddress {
  name: string;
  fields: {
    IdUsuario: { stringValue: string };
    Direccion: { stringValue: string };
    Ciudad: { stringValue: string };
    Estado: { stringValue: string };
  };
}
