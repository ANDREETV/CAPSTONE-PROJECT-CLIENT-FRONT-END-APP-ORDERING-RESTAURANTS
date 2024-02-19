import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components client/HomePage';
import Login from './components client/Login';
import PageOrders from './pages/PageOrders';
import PageProfileServer from './pages/PageProfileServer';
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import ErrorPage from './pages/ErrorPage';
import PageNewProducts from './pages/PageNewProducts';
import NavBarBacEnd from './components server/NavBarBacEnd';
import Register from './components client/Register';
import ProtectedOrder from './middlewares/ProtectedOrder';
import PageMneu from './pages/PageMenu';
import Admin from './components client/Admin';
import PageTable from './pages/PageTable';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/nav" element={<NavBarBacEnd />} />
        <Route element={<ProtectedOrder />}>
          <Route path="/menu" element={<PageMneu />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/aggiungi-prodotti" element={<PageNewProducts />} />
          <Route path="/prodotti" element={<PageTable />} />
          <Route path="/ordini" element={<PageOrders />} />
          <Route path="/profilo" element={<PageProfileServer />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
