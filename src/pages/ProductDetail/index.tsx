import { useParams } from "react-router-dom";
import { IProducts } from "../../interfaces";
import { useGetAllProducts } from "../../services";

export const ProductDetail = () => {
  const { data: productsData } = useGetAllProducts();

  const { productName } = useParams();

  const productByNameFound = productsData?.documents?.find(
    (product: IProducts) =>
      product.fields.NombreProducto.stringValue === productName
  );
  return (
    <div>
      <h1>
        {productByNameFound?.fields?.NombreProducto?.stringValue ||
          "Producto no encontrado"}
      </h1>
    </div>
  );
};
