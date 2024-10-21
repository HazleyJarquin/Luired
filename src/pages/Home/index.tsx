import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Product1,
  Product2,
  Product3,
  Product4,
  Product5,
} from "../../assets/SliderProducts";
import { Slider } from "../../components";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const images = [Product1, Product2, Product3, Product4, Product5];
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          background: "#f3f3f3",
          width: "100%",
          height: "100%",
          padding: "1rem",
          borderRadius: "24px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            height: { xs: "50%", md: "100%" },
            display: { xs: "flex", md: "none" },
          }}
        >
          <Slider
            images={images}
            width="100%"
            height="100%"
            imageSizes={{
              height: "300px",
              width: "100%",
            }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            height: { xs: "50%", md: "100%" },
            display: "flex",
            flexDirection: "column",
            gap: { xs: "1rem", md: "1.5rem" },
            justifyContent: "center",
            alignItems: "center",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2rem", md: "2.5rem" },
              color: "#333",
            }}
          >
            Productos Exclusivos
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "medium",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              color: "#666",
            }}
          >
            Cualquier tipo de colección
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "light",
              fontSize: { xs: "1rem", md: "1.2rem" },
              color: "#888",
            }}
          >
            Al mejor precio
          </Typography>
          <Button
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/products")}
            sx={{
              padding: { xs: "0.5rem", md: "0.75rem" },
              width: { xs: "12rem", md: "15rem" },
              fontSize: { xs: "0.9rem", md: "1rem" },
            }}
          >
            Compra ahora
          </Button>
        </Box>
        <Box sx={{ width: "50%", display: { xs: "none", md: "flex" } }}>
          <Slider
            images={images}
            width="100%"
            height="100%"
            imageSizes={{
              height: "600px",
              width: "100%",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
