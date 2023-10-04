import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Logo from '../../assets/logo.png';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../lib/theme';
import axios from '../../lib/axiosConfig';
import { useState } from 'react';

const Login = () => {
  const [err, setErr] = useState(null);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const form = {
        username: data.get('username'),
        password: data.get('password'),
      };

      const response = await axios.post(`admin/auth`, form);
      if (response?.data?.err) {
        setErr(response?.data?.err);
      }

      if (response?.data?.adminLoggedIn) {
        setErr(null);
        window.location = '/';
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={Logo}
            alt='Logo'
            style={{
              height: '100px',
              marginBottom: 10,
            }}
          />
          <Typography
            component='h1'
            variant='h5'
            style={{ fontFamily: 'Montserrat' }}
          >
            Admin Login
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            {err && (
              <Typography
                component='h6'
                variant='h6'
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: 16,
                  textAlign: 'center',
                  color: '#CF1E30',
                }}
              >
                {err}
              </Typography>
            )}

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              style={{
                fontFamily: 'Montserrat',
                fontSize: 18,
                backgroundColor: '#222',
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
