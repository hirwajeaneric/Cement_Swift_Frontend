import { useStripe } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const Success = () => {
    const stripe = useStripe();
    const [message, setMessage] = useState(null);
    
    useEffect(() => {
        if (!stripe) {
            return;
        }
        // Retrieve the "payment_intent_client_secret" query parameter appended to
        // your return_url by Stripe.js
        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

        // Retrieve the PaymentIntent
        stripe
            .retrievePaymentIntent(clientSecret)
            .then(({ paymentIntent }) => {
                // Inspect the Payment Intent `status` to indicate the status of the payment to your customer.
                // Some payment methods will [immediately succeed or fail][0] upon 
                // confirmation, while others will first enter a `processing` state.
                switch (paymentIntent.status) {
                    case 'success':
                        setMessage('Success! Payment recieved.')
                        break;

                    case 'processing':
                        setMessage("Payment processing. We'll update you when payment is recieved.");
                        break;

                    case 'requires_payment_method':
                        // Redirect your user back to your payment page to attempt collecting payment again.
                        setMessage('Payment failed. Please try another payment method.');
                        break;

                    default:
                        setMessage('Something went wrong.');
                        break;
                }
            });
    }, [stripe])

    return (
            <section className="w-full flex flex-col justify-center items-center">
                <div className="flex flex-col w-full mb-12 gap-2 max-w-screen-xl text-black justify-center items-center px-4 py-7 sm:px-6 lg:px-8 lg:py-20 flex-wrap">
                    <h1 className="text-4xl font-bold">Thank you for your order!</h1>
                    <p className="mt-1 text-base text-gray-700">{message}</p>
                    <div className="flex w-full gap-4 justify-center items-center flex-wrap">
                        <Link
                            to={"/account/order/34asdf843j0jasdf0asd"}
                            className="w-full md:w-1/4 block rounded bg-black px-12 py-3 text-base text-center mt-6 font-normal text-white hover:bg-slate-700 focus:outline-none focus:ring active:bg-slate-500"
                        >
                            View order
                        </Link>
                        <Link
                            to={'/account/orders'}
                            className="w-full md:w-1/4 rounded px-12 py-3 text-base text-center mt-6 font-normal text-black hover:bg-slate-100 focus:outline-none focus:ring active:bg-slate-500 border-black border-2"
                        >
                            View all orders
                        </Link>
                    </div>
                </div>
            </section>
    )
}

export default Success