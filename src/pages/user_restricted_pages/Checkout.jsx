import { useEffect, useState } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

const stripePromise = loadStripe("pk_test_51OXVUEJ0gOzWqZK5uVE6U8ZKxFdPsYj3txq9wPCcdBTqT2G8RqL4v6NwkNBtVl6M1wfuc4DvBRCVpoy3RJ7Z5dgb00p4oqHVKg");

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    var queryData = JSON.parse(searchParams.get('items'));
    var amount = JSON.parse(searchParams.get('amount'));

    axios.post(`${serverAddress}/api/v1/cement-swift/checkout/secret`, { items: queryData, amount })
      .then((response) => {
        setClientSecret(response.data.client_secret);
      })
      .catch((error) => {
        console.log('Error :', error.message);
      });
  }, []);

  if (!clientSecret) {
    return (
      <div className='flex flex-col items-center justify-center gap-9 my-28'>
        <img src="http://localhost:3000/loaders/4a287dd4b9222ebb17dc354257d0ef79_w200.gif" alt="Loading..." className="w-12" />
      </div>
    )
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <Outlet/>
    </Elements>
  )
}

export default Checkout