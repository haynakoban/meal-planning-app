import {
  Box,
  Button,
  Divider,
  Drawer,
  Toolbar,
  Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from './Logo';
import axios from '../lib/axiosConfig';

const LeftDrawer = ({ routes, leftDrawer, showLeftDrawer, path, active }) => {
  const handleLogout = async () => {
    await axios.get(`admin/validation`);
    window.location.reload();
  };

  return (
    <Drawer
      anchor='left'
      open={leftDrawer}
      onClose={() => showLeftDrawer(false)}
    >
      <Box
        width={240}
        height='100%'
        sx={{
          backgroundColor: '#FFFFFF',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Logo w={35} />
          <Box
            display='flex'
            alignItems='flex-start'
            flexGrow={1}
            flexDirection='column'
            justifyContent='center'
          >
            <Box>
              <Typography
                variant='body'
                fontWeight='700'
                sx={{ ml: 1, letterSpacing: 1.5, color: '#685CFE' }}
              >
                Nutri
              </Typography>
              <Typography
                variant='body'
                fontWeight='700'
                sx={{ letterSpacing: 1.5, color: '#737373' }}
              >
                Plan
              </Typography>
            </Box>
            <Typography
              variant='caption'
              fontWeight='700'
              fontFamily='Poppins'
              sx={{ ml: 1, mt: -1, letterSpacing: 1.5, color: '#685CFE' }}
            >
              ADMIN
            </Typography>
          </Box>
        </Toolbar>

        <Divider sx={{ bgcolor: '#FFFFFF50' }} />

        <Box sx={{ p: 2 }}>
          {routes.map((route) => (
            <Button
              key={route.name}
              component={Link}
              to={route.path}
              onClick={() => showLeftDrawer(false)}
              sx={{
                bgcolor: active({ pathname: path, route })
                  ? '#685CFE'
                  : 'inherit',
                color: active({ pathname: path, route })
                  ? '#FFFFFF'
                  : '#737373',
                p: 1.5,
                borderRadius: 1.5,
                transition: 'background-color 400ms linear',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                '&:hover': {
                  bgcolor: active({ pathname: path, route })
                    ? '#685CFE'
                    : '#E8E8E8',
                  color: active({ pathname: path, route })
                    ? '#FFFFFF'
                    : '#737373',
                },
              }}
              startIcon={route.icon}
            >
              <Typography
                variant='body2'
                fontWeight='600'
                sx={{
                  ml: 1,
                  letterSpacing: 1,
                  color: active({ pathname: path, route })
                    ? '#FFFFFF'
                    : '#737373',
                }}
              >
                {route.name}
              </Typography>
            </Button>
          ))}
          <Button
            onClick={handleLogout}
            sx={{
              bgcolor: 'inherit',
              color: '#737373',
              p: 1.5,
              borderRadius: 1.5,
              transition: 'background-color 400ms linear',
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              '&:hover': {
                bgcolor: '#E8E8E8',
                color: '#737373',
              },
            }}
            startIcon={<LogoutIcon />}
          >
            <Typography
              variant='body2'
              fontWeight='600'
              sx={{
                ml: 1,
                letterSpacing: 1,
                color: '#737373',
              }}
            >
              Logout
            </Typography>
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
export default LeftDrawer;
