import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function Checkout() {

  const { info } = useSelector(state => state.OrderReducer)
  const dispatch = useDispatch();

  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}>
        <Elements>
          <CheckoutForm info={info} dispatch={dispatch} />
        </Elements>
      </StripeProvider>
  );
}
export default Checkout;

