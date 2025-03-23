import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutPage from '../components/AboutPage';
import Layout from './Layout';
import Login from '../components/Login';
import Register from '../components/Register';
import Logout from '../components/Logout';
import SearchPage from '../components/SearchPage';
import ReviewPage from '../components/ReviewsList/ReviewPage';

function Routers() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AboutPage />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/searchPage" element={<SearchPage />}></Route>

          <Route path="/comments/:uniName/:courseName" element={<ReviewPage />}></Route>
          <Route path="*" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routers
