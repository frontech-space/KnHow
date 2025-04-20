import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./pages/top";
import About from "./pages/about";
import Release from "./pages/release";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/about" element={<About />} />
        <Route path="/release" element={<Release />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
