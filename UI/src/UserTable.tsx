import { Alert, CircularProgress, Paper, TableContainer, Table, TableCell, TableHead, TableBody, TableRow, Typography, makeStyles, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const fetchUsers = async () => {
    const response = await axios.get('http://localhost:8080/api/v1/users');
    return response.data;
}

interface UserDetails {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}


const UserTable = () => {
    const { status, data, error } = useQuery(['existingUsers'], fetchUsers);

    const userError = error as Error;

    if (status === 'loading') {
        return <CircularProgress size={100} color="success" />
      }
    
    if (status === 'error') {
        return <Alert severity="error">Something went wrong: {userError.message}</Alert>
    }
    
    return (
        <Box sx={{ border: 1, borderColor: "#FFD700", borderRadius: '5px' }}>
        <TableContainer>
        <Table sx={{ minWidth: 1024 }} 
        aria-label="user table">
          <TableHead >
            <TableRow>
                <TableCell align="right" sx={{borderWidth: '1px', borderColor: '#01b636'}}>
                    <Typography variant="subtitle1" color="#FFD700">First Name</Typography>
                </TableCell>
                <TableCell align="right" sx={{borderWidth: '1px', borderColor: '#01b636'}}>
                    <Typography variant="subtitle1" color="#FFD700">Last Name</Typography>
                </TableCell>
                <TableCell align="right" sx={{borderWidth: '1px', borderColor: '#01b636'}}>
                    <Typography variant="subtitle1" color="#FFD700">Status</Typography>
                </TableCell>
                <TableCell align="right" sx={{borderWidth: '1px', borderColor: '#01b636'}}>
                    <Typography variant="subtitle1" color="#FFD700">Email</Typography>
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
                data.users.map((user: UserDetails) => 
                <TableRow
                key={user.id}
                >
                <TableCell align="right" sx={{borderWidth: '1px', borderColor: '#01b636'}}>{user.firstName}</TableCell>
                <TableCell align="right" sx={{borderWidth: '1px', borderColor: '#01b636'}}>{user.lastName}</TableCell>
                <TableCell align="right" sx={{borderWidth: '1px', borderColor: '#01b636'}}>ACTIVE</TableCell>
                <TableCell align="right" sx={{borderWidth: '1px', borderColor: '#01b636'}}>{user.email}</TableCell>
              </TableRow>
            )
        }
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    );
};

export default UserTable;