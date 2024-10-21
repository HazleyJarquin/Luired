import { useShoppingCartStore } from "../../store";

export const ShoppingCart = () => {
  const { cart } = useShoppingCartStore();
  return (
    <div>
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
