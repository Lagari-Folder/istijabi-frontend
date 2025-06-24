import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CharityDetail from "./pages/CharityDetail";
import Donate from "./pages/Donate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/charity/:id" element={<CharityDetail />} />
          <Route path="/donate/:id" element={<Donate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const Layout = () => {
  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
