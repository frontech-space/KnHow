import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Top from "./pages/top";
import About from "./pages/about";
import Release from "./pages/release";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Contact from "./pages/contact";

const App = () => {
  const getBasename = () => {
    if (process.env.NODE_ENV === "development") return "";

    const publicUrl = process.env.PUBLIC_URL || "";
    if (!publicUrl || publicUrl === "/") return "";

    try {
      const url = new URL(publicUrl);
      return url.pathname;
    } catch {
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
