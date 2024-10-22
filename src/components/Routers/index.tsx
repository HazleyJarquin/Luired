import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MainLayout } from "../MainLayout";
import {
  Home,
  Products,
  UserProfile,
  WishList,
  ShoppingCart,
  ProductDetail,
  ProductCategory,
} from "../../pages";
import { AuthCheck } from "../AuthCheck";

export const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<div>not found</div>} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productName" element={<ProductDetail />} />
          <Route
            path="/products/category/:productCategory"
            element={<ProductCategory />}
          />
          <Route
            path="/user-profile/:userName"
            element={<AuthCheck WrappedComponent={UserProfile} />}
          />
          <Route
            path="/shopping-cart"
            element={<AuthCheck WrappedComponent={ShoppingCart} />}
          />
          <Route path="/wishlist" element={<WishList />} />
        </Route>
      </Routes>
    </Router>
  );
};
