import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Top from "./pages/top";

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
