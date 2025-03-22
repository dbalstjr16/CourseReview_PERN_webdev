import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutPage from '../components/AboutPage';
import Layout from './Layout';
import Login from '../components/Login';
import Register from '../components/Register';
import Logout from '../components/Logout';
import Reviews from '../components/Reviews';

function Routers() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AboutPage />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/reviews" element={<Reviews />}></Route>
          <Route path="*" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routers
