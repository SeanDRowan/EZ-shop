import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div>
      <div style = {{marginLeft:5, }}>
    <CategoryMenu  />
    </div>
    <div className="container">
   
     
      <ProductList />
      <Cart />
      
    </div>
    </div>
  );
};

export default Home;
