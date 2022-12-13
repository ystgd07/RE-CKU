import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from 'pages/Main';
import Login from 'pages/Login';
import Resume from 'components/Resume/index';

const Router = () => {
   return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
         <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resume" element={<Resume />} />
         </Routes>
      </BrowserRouter>
   );
}

export default Router;
