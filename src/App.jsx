import { BrowserRouter, Route, Routes } from "react-router-dom";
import DemographyPage from "pages/DemographyPage";
import OtherPage from "pages/OtherPage";
import TestResult from "pages/TestResult";

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
                <TestResult />
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
