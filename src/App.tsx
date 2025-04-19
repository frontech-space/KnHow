import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./pages/top";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
