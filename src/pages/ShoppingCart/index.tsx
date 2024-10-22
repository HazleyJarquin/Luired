import { Button } from "@mui/material";
import { useShoppingCartStore } from "../../store";

export const ShoppingCart = () => {
  const { cart, clearCart } = useShoppingCartStore();
  return (
    <div>
      <Button onClick={clearCart}>Clear</Button>
      {cart.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <p>{product.quantity}</p>
        </div>
      ))}
    </div>
  );
};
