/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const columns = [
    {
        field: 'customer',
        headerName: 'Customer',
        width: 180,
    },
    {
        field: 'phone',
        headerName: 'Contact',
        width: 100,
    },
    {
        field: 'status',
        headerName: 'Order status',
        width: 100,
    },
    {
        field: 'total',
        headerName: 'Total',
        width: 100,
    },
    {
        field: 'paidOn',
        headerName: 'Payed on',
        width: 250,
        valueGetter: (value, row) => `${new Date(row.paidOn).toUTCString()}`,
    },
    {
        field: 'location',
        headerName: 'Delivery address',
        width: 250,
    },
    {
        field: 'action',
        headerName: 'Action',
        width: 100,
        renderCell: (params) => (
            <Link
                to={`/dashboard/order/${params.id}`}
                className='text-blue-700 hover:text-slate-800'
                >
                Edit
            </Link>
        )
    }
];

export default function OrdersTable(props) {
    const { data } = props;

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                slots={{ toolbar: GridToolbar }}
            />
        </Box>
    );
}