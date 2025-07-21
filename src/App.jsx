import DemographyPage from "pages/DemographyPage";
import OtherPage from "pages/OtherPage";
import TestResultPage from "pages/TestResultPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div style={{ width: "100%" }}>
                <DemographyPage />
              </div>
            }
          />
          <Route
            path="/test-result"
            element={
              <div style={{ width: "100%" }}>
                <TestResultPage />
              </div>
            }
          />
          <Route
            path="/other"
            element={
              <div style={{ width: "100%" }}>
                <OtherPage />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
