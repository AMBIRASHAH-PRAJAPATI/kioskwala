import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Service from "./components/Service";
import Contact from "./components/Contact";
import Loginsinup from "./components/Loginsinup"

const app = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Service" element={<Service />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Loginsinup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default app;
