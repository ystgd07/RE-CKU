import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join';
import FindPw from './pages/FindPw';

function Router() {
   return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
         <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Join" element={<Join />} />
            <Route path="/FindPw" element={<FindPw />} />
         </Routes>
      </BrowserRouter>
   );
}

export default Router;
