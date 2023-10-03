import { Fragment } from 'react';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import RamenDiningOutlinedIcon from '@mui/icons-material/RamenDiningOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import EggOutlinedIcon from '@mui/icons-material/EggOutlined';

import SideDrawerBar from './SideDrawerBar';

const routes = [
  {
    name: 'Home',
    path: '/',
    icon: <HomeOutlinedIcon />,
  },
  {
    name: 'Users',
    path: '/users',
    icon: <PeopleOutlineOutlinedIcon />,
  },
  {
    name: 'Recipes',
    path: '/recipes',
    icon: <RamenDiningOutlinedIcon />,
  },
  {
    name: 'Meals',
    path: '/meals',
    icon: <MenuBookOutlinedIcon />,
  },
  {
    name: 'Meal Types',
    path: '/mealtypes',
    icon: <CategoryOutlinedIcon />,
  },
  {
    name: 'Cuisines',
    path: '/cuisines',
    icon: <RestaurantMenuOutlinedIcon />,
  },
  {
    name: 'Preferences',
    path: '/preferences',
    icon: <TuneOutlinedIcon />,
  },
  {
    name: 'Ingredients',
    path: '/ingredients',
    icon: <EggOutlinedIcon />,
  },
];

const MainLayout = ({ children }) => {
  return (
    <Fragment>
      <SideDrawerBar routes={routes} content={children} />
    </Fragment>
  );
};
export default MainLayout;
