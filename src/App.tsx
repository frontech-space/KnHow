import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./pages/top";
import About from "./pages/about";
import Login from "./pages/login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
