import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from 'pages/Main';
import Login from 'pages/Login';
import CreatePost from 'pages/CreatePost';

function Router() {
   return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
         <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-post" element={<CreatePost />} />
         </Routes>
      </BrowserRouter>
   );
}

export default Router;
