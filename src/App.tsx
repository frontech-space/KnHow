import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Top from "./pages/top";
import About from "./pages/about";
import Release from "./pages/release";
import Contact from "./pages/contact";

const App = () => {
  // GitHub Pagesの場合はbasenameを設定、それ以外は空文字
  const basename =
    process.env.REACT_APP_DEPLOY_ENV === "github-pages"
      ? process.env.PUBLIC_URL
      : "";

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
