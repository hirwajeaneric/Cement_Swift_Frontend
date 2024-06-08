import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;
const clientAddress = import.meta.env.VITE_CLIENT_ADDRESS;

const Success = () => {
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState({});

    const handleConfirmation = useCallback(() => {
        // Retrieve user info from local storage
        const userInfo = JSON.parse(localStorage.getItem("user"));
        const totalPrice = JSON.parse(localStorage.getItem("total"));
        
        const order = {
            totalPrice: totalPrice,
            customerId: userInfo._id,
            customer: {
                fullName: userInfo.fullName,
                email: userInfo.email,
                phone: userInfo.phone
            },
            delivery: {
                province: userInfo.province,
                district: userInfo.district,
                city: userInfo.city,
                streetAddress: userInfo.streetAddress,
            }
        }
        // Send the request to the server
        axios
            .put(`${serverAddress}/api/v1/cement-swift/order/add`, order)
            .then((response) => {
                console.log(response.data);
                setOrder(response.data.order)
            })
            .catch((error) => {
                console.log("Error: ", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        // Set a timeout to simulate loading
        setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Check if the redirect status is 'succeeded'
        if (new URLSearchParams(window.location.search).get("redirect_status") === "succeeded" && !loading) {
            handleConfirmation();
        }
    }, [loading, handleConfirmation]);

    if (loading) {
        return (
            <img
                src={`${clientAddress}/loaders/4a287dd4b9222ebb17dc354257d0ef79_w200.gif`}
                alt="Loading..."
                className="w-10 my-10"
            />
        );
    }

    return (
        <section className="w-full flex flex-col justify-center items-center">
            <div className="flex flex-col w-full mb-12 gap-2 max-w-screen-xl text-black justify-center items-center px-4 py-7 sm:px-6 lg:px-8 lg:py-20 flex-wrap">
                <h1 className="text-4xl font-bold">Thank you for your order!</h1>
                <p className="mt-1 text-base text-gray-700">You will recieve a confirmation email shortly.</p>
                <div className="flex w-full gap-4 justify-center items-center flex-wrap">
                    {order._id && <Link
                        to={`/account/order/${order._id}`}
                        className="w-full md:w-1/4 block rounded bg-black px-12 py-3 text-base text-center mt-6 font-normal text-white hover:bg-slate-700 focus:outline-none focus:ring active:bg-slate-500"
                    >
                        View order
                    </Link>}
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