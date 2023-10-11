import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import UserTable from "./UserTable";
import Notifications from "./Notifications";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import {Logout} from './Logout';

const App = () => {
  const queryClient = new QueryClient();
  const {isAuthenticated, loginWithRedirect, user, isLoading} = useAuth0();
  useEffect(() => {
    if(!isAuthenticated && !user && !isLoading) {
      loginWithRedirect();
    }
  }, [loginWithRedirect, isAuthenticated, user, isLoading]);
  const theme = createTheme({
    typography: {
      fontFamily: 'Libre Franklin, Quicksand',
    },
    palette: {
      background: {
        default: '#1f2142',
      },
      mode: 'dark',
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
      <Grid item xs={3}>
      {isAuthenticated && user && !isLoading && (
        <>
        <Logout/>
        <Notifications/>
        <UserTable />
        </>
      )}
      </Grid>
    </Grid>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
