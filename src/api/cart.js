import axios from "axios";

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

export const getAllRequestedProducts = async () => {
    let productRequests = [];
    const response = await axios.get(`${serverAddress}/api/v1/cement-swift/cart/getCartItems`)
    response.data.items.forEach(element => {
        if (element.orderId) {
            productRequests.push(element);
        }
    });

    return productRequests;
}