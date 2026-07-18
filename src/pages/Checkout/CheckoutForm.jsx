import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const { error } = await stripe.confirmPayment({ elements, redirect: "if_required" });

    setLoading(false);

    if (error) navigate("/checkout/failed");
    else navigate(`/checkout/success/${orderId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <PaymentElement />
      <button type="submit" className="checkout-form__submit" disabled={!stripe || loading}>
        {loading ? "جاري المعالجة..." : "إتمام الدفع"}
      </button>
    </form>
  );
};

export default CheckoutForm;