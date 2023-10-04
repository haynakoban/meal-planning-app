import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import './404.css';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className='four'>4</div>
        <img src={Logo} alt='Logo' className='logoos' />
        <div className='four'>4</div>
      </div>
      <div className='oops'>OOPS! PAGE NOT BE FOUND</div>
      <p className='textttt'>
        Sorry but the page you are looking for does not exist, have been
        removed. name changed or is temporarily unavailable
      </p>
      <Button
        variant='contained'
        style={{ backgroundColor: '#222' }}
        onClick={() => navigate('/')}
      >
        Back to homepage
      </Button>
    </Container>
  );
};
export default PageNotFound;
