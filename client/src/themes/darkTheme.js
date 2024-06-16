import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'black',
          backgroundColor: 'orange',
          ':hover': {
            backgroundColor: 'darkorange',
          },
        },
      },
    },
  },
});

export default darkTheme;
