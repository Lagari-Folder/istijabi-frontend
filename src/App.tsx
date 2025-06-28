import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CharityDetail from "./pages/CharityDetail";
import Donate from "./pages/Donate";
import Footer from "./components/Footer";
import Projects from "./pages/Projects";
import Authentication from "./pages/Authentication";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/charity/:id" element={<CharityDetail />} />
          <Route path="/donate/:id" element={<Donate />} />

          <Route path="/auth" element={<Authentication />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const Layout = () => {
  return (
    <div className="flex flex-col items-center overflow-x-hidden bg-[url('./images/background-full.png')] bg-no-repeat">
      <ToastContainer position="top-center" autoClose={3000} />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
