import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <div className="product-container">
      <ProductList />
      <Cart />
      </div>
    </div>
  );
};

export default Home;
