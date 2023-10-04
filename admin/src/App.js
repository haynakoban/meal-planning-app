import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import './App.css';
import { Login } from './views';
import { useEffect, useState } from 'react';
import axios from './lib/axiosConfig';
import Logo from './assets/logo.png';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`admin/auth`);
      setIsAdminLoggedIn(response?.data?.adminLoggedIn);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [isAdminLoggedIn]);

  return (
    <div className='App'>
      {loading ? (
        <div className={`loading-screen ${loading ? 'active' : ''}`}>
          <img src={Logo} alt='Logo' className='logo' />
        </div>
      ) : (
        <>
          {!isAdminLoggedIn ? (
            <Login />
          ) : (
            <Router>
              <AppRoutes />
            </Router>
          )}
        </>
      )}
    </div>
  );
};

export default App;
