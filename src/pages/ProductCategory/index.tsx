import { useParams } from "react-router-dom";
import { useGetAllProducts } from "../../services";
import { IProducts } from "../../interfaces";
import { Box, Grid2 as Grid } from "@mui/material";
import { ProductCard } from "../../components";

export const ProductCategory = () => {
  const { productCategory } = useParams();

  const { data: productsData } = useGetAllProducts();

  const filteredProducts = productsData?.documents?.filter(
    (i: IProducts) =>
      i.fields.Categoria.stringValue.toLowerCase() ===
      productCategory?.toLowerCase()
  );
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Grid container spacing={2}>
        {filteredProducts?.map((i: IProducts) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i?.name}>
            <ProductCard
              images={i.fields.Images.arrayValue.values.map(
                (v: { stringValue: string }) => v.stringValue
              )}
              productName={i.fields.NombreProducto.stringValue}
              description={i.fields.Descripcion.stringValue}
              iso3Code={i.fields.Iso3Code.stringValue}
              price={Number(i.fields.Precio.stringValue)}
              category={i.fields.Categoria.stringValue}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
