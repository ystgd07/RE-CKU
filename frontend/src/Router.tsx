import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from 'pages/Main';
import Login from 'pages/Login';
import Resume from 'components/Resume/index';
// import CreatePost from 'pages/CreatePost';
import Join from 'pages/Join';
import FindPw from 'pages/FindPw';
import MyPortfolio from 'pages/MyPortfolio';
import Profile from 'pages/Profile';
// import Post from 'pages/Post';
import Err404 from 'pages/Err404';
import Admin from 'pages/Admin';
import Resumeform from 'pages/Resume';
import Loading from 'pages/Loading';
const Router = () => {
    const isLogined = localStorage.getItem('accessToken') ? true : false;
    // <Route> => <BasicRouter>, <AdminRouter>, <AuthRouter>
    return (
        <BrowserRouter>
            <Routes>
                {isLogined ? (
                    <>
                        <Route path="/" element={<Main />} />
                        <Route path="/resume/:id" element={<Resume />} />
                        {/* <Route path="/create-post" element={<CreatePost />} /> */}
                        {/* <Route path="/post/:postId" element={<Post />} /> */}
                        <Route path="/myportfolio" element={<MyPortfolio />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/login" element={<Navigate replace to="/" />} />
                        <Route path="/find-pw" element={<Navigate replace to="/" />} />
                        <Route path="/join" element={<Navigate replace to="/" />} />
                        <Route path="/*" element={<Err404 />} />
                        <Route path="/resume" element={<Resumeform />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/loading" element={<Loading />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Main />} />
                        <Route path="/resume/:id" element={<Navigate replace to="/" />} />
                        <Route path="/create-post" element={<Navigate replace to="/" />} />
                        <Route path="/post/:postId" element={<Navigate replace to="/" />} />
                        {/* <Route path="/myportfolio" element={<Navigate replace to="/" />} /> */}
                        <Route path="/profile" element={<Navigate replace to="/" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/FindPw" element={<FindPw />} />
                        <Route path="/Join" element={<Join />} />
                        <Route path="/*" element={<Err404 />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/loading" element={<Loading />} />
                    </>
                )}
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/resume/:id" element={<Resume />} />
                <Route path="/create-post" element={<CreatePost />} />

                <Route path="/Join" element={<Join />} />
                <Route path="/FindPw" element={<FindPw />} />
                <Route path="/my-portfolio" element={<MyPortfolio />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
