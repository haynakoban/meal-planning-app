import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import LeftDrawerRoutes from './LeftDrawer';
import PermanentDrawer from './PermanentDrawer';

const drawerWidth = 240;

const SideDrawerBar = ({ routes, content }) => {
  const [pageTitle, setPageTitle] = useState('Home');
  const [leftDrawer, showLeftDrawer] = useState(false);

  const location = useLocation();
  const { pathname } = location;

  const toggleLeftDrawer = (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    showLeftDrawer(!leftDrawer);
  };

  const active = ({ pathname, route }) => {
    return route.name === 'Users'
      ? pathname === '/'
      : pathname.includes(route.path);
  };

  // Handle page title parsing.
  useEffect(() => {
    let title = pageTitle;
    if (pathname.includes('users')) {
      title = 'Users';
    } else if (pathname.includes('recipes')) {
      title = 'Recipes';
    } else if (pathname.includes('meals')) {
      title = 'Meals';
    } else if (pathname.includes('mealtypes')) {
      title = 'Meals Types';
    } else if (pathname.includes('cuisines')) {
      title = 'Cuisines';
    } else if (pathname.includes('preferences')) {
      title = 'Preferences';
    } else if (pathname.includes('allergies')) {
      title = 'Allergies';
    } else if (pathname.includes('ingredients')) {
      title = 'Ingredients';
    } else {
      title = 'Users';
    }
    document.title = `${title}`;
    setPageTitle(title);
  }, [pageTitle, pathname]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        elevation={1}
        position='fixed'
        sx={{
          width: {
            xs: '100%',
            sm: '100%',
            md: '100%',
            lg: `calc(100% - ${drawerWidth}px)`,
          },
          ml: {
            xs: '0',
            sm: '0',
            md: '0',
            lg: `${drawerWidth}px`,
          },
          bgcolor: '#FFFFFF',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display='flex' alignItems='center'>
            {/* menu for links */}
            <Box
              sx={{
                display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' },
                mr: 1,
              }}
            >
              <IconButton
                sx={{
                  color: '#00000090',
                }}
                onClick={toggleLeftDrawer}
                edge='start'
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Typography
              variant='h6'
              noWrap
              component='div'
              color='#737373'
              textTransform='uppercase'
              fontWeight='600'
            >
              {pageTitle}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* permanent drawer for large screen - routes */}
      <PermanentDrawer routes={routes} active={active} path={pathname} />

      {/* temporary left drawer for medium to small screen - routes */}
      <LeftDrawerRoutes
        routes={routes}
        active={active}
        path={pathname}
        showLeftDrawer={showLeftDrawer}
        leftDrawer={leftDrawer}
      />

      {/* content */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          bgcolor: '#FFFFFF',
          py: 2,
          px: { xs: 2, sm: 2, md: 2, lg: 3 },
          color: '#737373',
        }}
      >
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
};

export default SideDrawerBar;
