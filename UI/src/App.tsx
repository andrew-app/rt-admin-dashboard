
import UserTable from "./UserTable";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid } from "@mui/material";

const App = () => {
  
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
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        sx={{ minHeight: '100vh'}}
      >
      <Grid item xs={3}>
        <UserTable />
      </Grid>
    </Grid>
      </ThemeProvider>
  );
};

export default App;
