import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
import Modal from "./components/Modal";

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart); //we need to access our cartItems to pass it as a dependency array to our useEffect
  const { isOpen } = useSelector((state) => state.modal); //we need to access the isOpen since our Modal renders conditionally based on this state

  const dispatch = useDispatch();

  useEffect(() => {
    // every time we have a change in the cartItems, calculateTotals will be dispatched
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
  }, []); //once load the app, we fetch the data

  if (isLoading)
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
