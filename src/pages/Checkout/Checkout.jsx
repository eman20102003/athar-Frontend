import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../api/paymentApi";
import CheckoutForm from "./CheckoutForm";
import Loader from "../../components/common/Loader";
import "./Checkout.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { bookId } = useParams();
  const [clientSecret, setClientSecret] = useState(null);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    createPaymentIntent(bookId).then(({ data }) => {
      setClientSecret(data.clientSecret);
      setOrderId(data.orderId);
    });
  }, [bookId]);

  if (!clientSecret) return <Loader />;

  return (
    <div className="checkout">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm orderId={orderId} />
      </Elements>
    </div>
  );
};

export default Checkout;