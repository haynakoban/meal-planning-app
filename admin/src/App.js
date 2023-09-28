import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
};

export default App;
