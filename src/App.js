import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import StocksPage from "./pages/StocksPage";
import QuotePage from "./pages/QuotePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/stocks" element={<StocksPage />} />
        <Route exact path="/quote" element={<QuotePage />} />
        <Route exact path="/" element={<Navigate to="/home" />} />
        <Route exact path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
