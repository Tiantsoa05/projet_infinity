import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LanguageLearningJourney from "./components/languages/LanguageLearningJourney";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/langue" element={<LanguageLearningJourney />} />
      </Routes>
    </Router>
  );
}

export default App;
