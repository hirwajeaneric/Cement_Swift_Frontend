/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
    {
        field: 'fullName',
        headerName: 'Name',
        width: 180,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
    },
    {
        field: 'phone',
        headerName: 'Phone',
        width: 100,
    },
    {
        field: 'city',
        headerName: 'City',
        width: 150,
    },
    {
        field: 'province',
        headerName: 'Province',
        width: 150,
    },
    {
        field: 'district',
        headerName: 'District',
        width: 150,
    },
    {
        field: 'streetAddress',
        headerName: 'Street Address',
        width: 150,
    },
];

export default function UsersTable(props) {
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