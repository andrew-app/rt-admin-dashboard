import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import UserTable from "./UserTable";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid } from "@mui/material";

const App = () => {
  const queryClient = new QueryClient();
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
        <UserTable />
      </Grid>
    </Grid>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
