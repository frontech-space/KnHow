import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Top from "./pages/top";
import About from "./pages/about";
import Release from "./pages/release";
import Contact from "./pages/contact";

const App = () => {
  // Get basename from PUBLIC_URL environment variable
  const getBasename = () => {
    const publicUrl = process.env.PUBLIC_URL || '';
    // If PUBLIC_URL is not set or is just '/', return empty string
    if (!publicUrl || publicUrl === '/') return '';
    // Extract the last part of the URL (e.g., '/KnHow' from 'https://example.com/KnHow' or '/KnHow')
    try {
      const url = new URL(publicUrl);
      return url.pathname;
    } catch {
      // If PUBLIC_URL is not a valid URL, assume it's a pathname
      return publicUrl;
    }
  };

  const basename = getBasename();

  return (
    <HelmetProvider>
      <Router basename={basename}>
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
