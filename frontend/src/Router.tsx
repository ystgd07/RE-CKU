import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import ResumeLounge from "./pages/ResumeLounge";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resumelounge" element={<ResumeLounge />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
