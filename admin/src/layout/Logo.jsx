import { Box } from '@mui/material';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

export default function Logo({ w }) {
  return (
    <Link to='/'>
      <Box width={w} display='flex' justifyContent='center' alignItems='center'>
        <img
          src={logo}
          alt='MealWise Logo'
          className='mealWise_logo'
          width='100%'
        />
      </Box>
    </Link>
  );
}
