import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

export const Logout = () => {
  const { logout } = useAuth0();

  return (
    <Button color="inherit" onClick={() => logout()}>
      Logout
    </Button>
  );
};
