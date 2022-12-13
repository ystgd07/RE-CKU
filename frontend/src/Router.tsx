import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';

function Router() {
   return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
         <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
         </Routes>
      </BrowserRouter>
   );
}

export default Router;
