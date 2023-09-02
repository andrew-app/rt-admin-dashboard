import { Alert, CircularProgress, TableContainer, Table, TableCell, TableHead, TableBody, TableRow, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TableHeaderCell from './TableHeaderCell';

import { createColumnHelper, getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table';

interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const fetchUsers: () => Promise<UserDetails[]> = async () => {
    const response = await axios.get('http://localhost:8080/api/v1/users');
    return response.data.users;
}

const UserTable = () => {
    const { status, data, error } = useQuery(['existingUsers'], fetchUsers);

    const columnHelper = createColumnHelper<UserDetails>();

    const columns = [
      columnHelper.accessor('firstName', {
        cell: info => info.getValue(),
        header: info => <TableHeaderCell  key={info.column.id} text='First Name' />
      }),
      columnHelper.accessor('lastName', {
        cell: info => info.getValue(),
        header: info => <TableHeaderCell key={info.column.id} text='Last Name' />
      }),
      columnHelper.accessor('email', {
        cell: info => info.getValue(),
        header: info => <TableHeaderCell  key={info.column.id} text='Email' />
      }),
    ];

    const table = useReactTable({
      data: data || [],
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    const userError = error as Error;

    if (status === 'loading') {
        return <CircularProgress size={100} color="success" />
      }
    
    if (status === 'error') {
        return <Alert severity="error">Something went wrong: {userError.message}</Alert>
    }
    
    return (
        <Box sx={{ border: 1, borderColor: "#8b499b", borderRadius: '5px' }}>
        <TableContainer>
        <Table sx={{ minWidth: 1024 }} 
        aria-label="user table">
          <TableHead sx={
            {
              backgroundColor: '#8b499b',
            }
          }>
            <TableRow>
                {
                  table.getHeaderGroups().map(headerGroup => (
                    headerGroup.headers.map(header => (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    ))
                  ))
                }
            </TableRow>
          </TableHead>
          <TableBody>
            {
                table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {row.getAllCells().map(cell => (
                      <TableCell align="right" sx={{borderWidth: '1px', borderColor: '#8b499b'}} key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                  ))}
                </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    );
};

export default UserTable;