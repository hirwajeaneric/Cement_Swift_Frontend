import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react";
import ErrorAlert from "./ErrorAlert";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(!processing);

    if (!stripe ||!elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/success',
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Send the paymentMethod ID to your server.
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-10 mb-20">
        <h1 className="text-2xl font-bold text-center">Confirm your payment</h1>
        <PaymentElement />
        <button  
          type="submit"
          disabled={!stripe || processing}  
          className="mb-5 bg-black text-white py-3 px-4 rounded-lg hover:bg-slate-700 disabled:bg-slate-400">
            {processing ? "Processing payment..." : "Submit"}
        </button>
        {errorMessage && <ErrorAlert error={{ title: 'Something went wrong', description: errorMessage }} />}
    </form>
  )
}

export default CheckoutForm