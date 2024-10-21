export interface IProducts {
  name: string;
  fields: {
    NombreProducto: { stringValue: string };
    Iso3Code: { stringValue: string };
    Precio: { stringValue: string };
    Images: { arrayValue: { values: { stringValue: string }[] } };
    Descripcion: { stringValue: string };
    Categoria: { stringValue: string };
    Stock: { integerValue: string };
  };
}
