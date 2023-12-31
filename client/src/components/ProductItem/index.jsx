import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import Card from 'react-bootstrap/Card';

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    
    <Card style={{ width: '15pc',
     borderRadius:10, 
     background :'white',
     padding:5,
     margin:10,
     boxShadow: '4px 4px 4px',
     color:'green',
      }}>
   
      <Link to={`/products/${_id}`}>
      <Card.Img style={{  borderRadius:24,}} variant="top" src={`/images/${image}`} />
      </Link>
      
      <div>
        <span>{name}</span>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button style={{background:'rgb(153, 255, 102)',border:'solid',borderColor:'green',color:'green',marginBottom:0}} onClick={addToCart}>Add to cart</button>
      
    </Card>
  );
}

export default ProductItem;
