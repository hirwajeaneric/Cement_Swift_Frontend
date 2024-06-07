import axios from "axios";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;
const clientAddress = import.meta.env.VITE_CLIENT_ADDRESS;

/* eslint-disable react/prop-types */
const CartItem = (props) => {
    const {product, unConfirmedOrders, setUnConfirmedOrders, summary, setSummary} = props;
    const [productData, setProductData] = useState({});
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        setProductData(product);
    },[product])

    const deleteItem = (e) => {
        e.preventDefault();

        axios.delete(`${serverAddress}/api/v1/cement-swift/cart/delete?id=${productData._id}`)
        .then((response) => {
            if (response.status === 200) {
                setUnConfirmedOrders(response.data.items);
                var grandTotal = 0;
                response.data.items.forEach((item) => {
                    grandTotal += item.total;
                });
                setSummary({ ...summary, grandTotal: grandTotal });
            }
        })
        .catch(error => {
             console.log('Error :', error);
        });
    }

    const handleQuantity = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    }

    const reduceQuantity = () => {
        if (productData.quantity === 1) {
            return;
        }
        var newQuantity = productData.quantity - 1;
        setProcessing(true);
        axios.put(`${serverAddress}/api/v1/cement-swift/cart/update?id=${productData._id}`, {
            quantity: newQuantity,
            price: productData.price
        })
        .then((response) => {
            if (response.status === 200) {
                setProcessing(false);
                setUnConfirmedOrders(response.data.items);
                var grandTotal = 0;
                response.data.items.forEach((item) => {
                    grandTotal += item.total;
                });
                setSummary({ ...summary, grandTotal: grandTotal });
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    const increaseQuantity = () => {
        var newQuantity = productData.quantity + 1;
        setProcessing(true);
        axios.put(`${serverAddress}/api/v1/cement-swift/cart/update?id=${productData._id}`, {
            quantity: newQuantity,
            price: productData.price
        })
        .then((response) => {
            if (response.status === 200) {
                setProcessing(false);
                setUnConfirmedOrders(response.data.items);
                var grandTotal = 0;
                response.data.items.forEach((item) => {
                    grandTotal += item.total;
                });
                setSummary({ ...summary, grandTotal: grandTotal });
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <tr>
            <td className="py-4">
                <div className="flex items-center">
                    <img src={`${product.photo}`} className="w-12 h-12 object-contain rounded-full" alt="" />
                    <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{product.productName}</h3>
                        <p className="mt-1 text-sm text-gray-500">{product.price} Rwf</p>
                    </div>
                </div>
            </td>
            <td className="py-4">
                {processing && <img src={`${clientAddress}/loaders/4a287dd4b9222ebb17dc354257d0ef79_w200.gif`} alt="Loading..." className="w-10"/>}
                {!processing && <div className="flex rounded-md border-solid border-2 w-1/3">
                    <button type="button" className="w-1/3 p-2" onClick={() => reduceQuantity()}>-</button>
                    <input type="number" name="quantity" id="quantity" disabled className="w-1/3 text-center" value={productData.quantity || ''} onChange={handleQuantity} />
                    <button type="button" className="w-1/3 p-2" onClick={() => increaseQuantity()}>+</button>
                </div>}
            </td>
            <td className="py-4">
                <div className="flex gap-4">
                    <p>{productData.quantity * productData.price} Rwf</p>
                    <button onClick={deleteItem}>
                        <MdDeleteOutline className="text-red-500 text-2xl"/>
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default CartItem