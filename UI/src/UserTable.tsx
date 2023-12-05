import { Alert, CircularProgress, TableContainer, Table, TableCell, TableHead, TableBody, TableRow, Box, IconButton, Grid, Typography, useTheme, Paper, Stack, styled, Container, Select, MenuItem } from '@mui/material';
import TableHeaderCell from './TableHeaderCell';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { createColumnHelper, getCoreRowModel, useReactTable, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { useState } from 'react';
import { Search } from './Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import { StatusTag, StatusTypes } from './StatusTag';
import Notifications from './Notifications';
import { GetExistingUsers } from './GetExistingUsers';
import { UserDetails } from './UserTypes';

const UserCard = styled(Paper)(({ theme }) => ({
  backgroundColor: '#8b499b',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const UserTable = () => {
    const { status, data, error } = GetExistingUsers();

    const columnHelper = createColumnHelper<UserDetails>();

    const [searchText, setSearchText] = useState('');

    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
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
      columnHelper.accessor('status', {
        cell: info => <StatusTag userStatus={info.getValue().toUpperCase() as StatusTypes}/>,
        header: info => <TableHeaderCell  key={info.column.id} text='Status' />
      }),
    ];

    const table = useReactTable({
      data: data || [],
      columns,
      state: {
        globalFilter: searchText
      },
      initialState: { pagination: {pageSize: 15} },
      autoResetPageIndex: false,
      onGlobalFilterChange: setSearchText,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });

    const userError = error as Error;

    if (status === 'loading') {
        return <CircularProgress size={100} color="primary" />
      }
    
    if (status === 'error') {
        return <Alert severity="error">Something went wrong: {userError.message}</Alert>
    }

    if (isMobile) {
      return(
        <Box>
          <Stack spacing={2}>
            {
              table.getRowModel().flatRows.map(row => (
            <UserCard>
                <Grid container columns={2} gap={1}>
                  <Typography variant='h6' sx={{fontFamily: 'Quicksand', fontWeight: 'bold'}}>
                    First Name:
                  </Typography>
                  <Typography variant='h6'>
                    {row.original.firstName}
                  </Typography>
                </Grid>
                <Grid container columns={2} gap={1}>
                <Typography variant='h6' sx={{fontFamily: 'Quicksand', fontWeight: 'bold'}}>
                  Last Name:
                </Typography>
                <Typography variant='h6'>
                  {row.original.lastName}
                </Typography>
                </Grid>
                <Grid container columns={2} gap={1}>
                <Typography variant='h6' sx={{fontFamily: 'Quicksand', fontWeight: 'bold'}}>
                  Email:
                </Typography>
                  <Typography variant='h6'>
                    {row.original.email}
                  </Typography>
                </Grid>
                <Grid container columns={2} gap={1}>
                <Typography variant='h6' sx={{fontFamily: 'Quicksand', fontWeight: 'bold'}}>
                  Status:
                </Typography>
                <Typography variant='h6'>
                  {row.original.status}
                </Typography>
                </Grid>   
            </UserCard>))
            }
          </Stack>
          <Box display={'flex'} justifyContent={'flex-end'}>
          <Typography variant="subtitle1" paddingTop={'0.4rem'} paddingRight={'0.4rem'}>
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </Typography>
            <IconButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      );
    };
    
    return (
      <Grid sm={6} md={9} lg={12}>
        <Container sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Search value={searchText ?? ''} onChange={value => setSearchText(String(value))}/>
          <Notifications/>
        </Container>
        <Box sx={{ border: 1, borderColor: "#8b499b", borderRadius: '5px' }}>
        <TableContainer>
        <Table sx={{ minWidth: 1024}} 
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
      <Grid display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
      <Box display={'flex'} gap={1} paddingRight={'1rem'} paddingTop={'0.25rem'}>
      <Typography variant="subtitle1" paddingTop={'0.25rem'}>
          Show
      </Typography>
      <Select
        size='small'
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={table.getState().pagination.pageSize}
        label="PageSize"
        onChange={e => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[15, 20, 30].map(pageSize => (
          <MenuItem key={pageSize} value={pageSize}>
            {pageSize}
          </MenuItem>
        ))}
      </Select>
      </Box>
      <Typography variant="subtitle1">
          Page {data.length === 0 ? 0 : table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </Typography>
        <IconButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Grid>
      </Grid>
    );
};

export default UserTable;