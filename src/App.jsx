import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from '../src/views/login';
import Layout from '../src/containers/Layout';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/*' element={<Layout />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
