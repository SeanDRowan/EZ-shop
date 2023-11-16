import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';
import { BsCart4 } from "react-icons/bs";

const stripePromise = loadStripe('pk_test_51OANGUDZg62aIukaV70mM6Cr7Bb87BUSsHvc6SKgXom84Hj2wyQfoz6XvNS5JaE1wng8AehRWlci0PJ7YzArBWzN00AcFLXVAV');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
// submit order info to stripe and redirect user to checkout.
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);
// gets products placed in cart to desplay in cart component
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }
// add the price of each cart item and display the total
  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    getCheckout({
      variables: { 
        products: [...state.cart],
      },
    });
  }
// display icon if cart is not open
  if (!state.cartOpen) {
    return (
      <div className="cart-closed"  onClick={toggleCart}>
        <span role="img" aria-label="trash">
        <BsCart4/>
        </span>
      </div>
    );
  }
// if cart is open display cart +items
  return (
    <div className="cart" style={{borderRadius:24}}>
      <div  style ={{width:40, marginRight:20}}className="close" onClick={toggleCart}>
      <img src="https://www.downloadclipart.net/large/43431-close-button-clipart.png" height={40}/>
  
      </div>
      <h2>Your Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button style={{  background:'rgb(0, 153, 51)',
              padding: "5px",
              fontFamily: "Arial",
              border:'solid',
              borderColor:'rgb(0, 102, 0)',
              color:'white',
              borderRadius:15,}} onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
         
          There are no items in your cart
        </h3>
      )}
    </div>
  );
};

export default Cart;
