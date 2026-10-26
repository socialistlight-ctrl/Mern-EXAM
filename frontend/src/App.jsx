import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import NewReview from "./pages/NewReview";

export default function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <div className="shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewReview />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}   