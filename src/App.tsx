import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Top from "./pages/top";
import About from "./pages/about";
import Release from "./pages/release";

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/about" element={<About />} />
          <Route path="/release" element={<Release />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
