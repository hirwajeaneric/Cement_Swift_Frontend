import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
const TableContainer = (props) => {
    const { orders } = props;

    return (
        <div>
            <div>
                <input type="text" placeholder="Filter client names" id="search" />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                        <th>Order Date</th>
                        <th>Order Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.length && orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.clientName}</td>
                                <td>{order.phoneNumber}</td>
                                <td>{order.address}</td>
                                <td>{order.city}</td>
                                <td>{order.state}</td>
                                <td>{order.zipCode}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.orderStatus}</td>
                                <td>
                                    <Link to={`/account/order/${order._id}`}>View Order</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableContainer