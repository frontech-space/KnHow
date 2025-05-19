import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Top from "./pages/top";
import About from "./pages/about";
import Release from "./pages/release";
import Contact from "./pages/contact";

const App = () => {
  const basePath = process.env.REACT_APP_PUBLIC_PATH || "";

  return (
    <HelmetProvider>
      <Router basename={basePath}>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/about" element={<About />} />
          <Route path="/release" element={<Release />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
