import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./pages/Main";
import Onboarding from "./pages/Onboarding";
import TodayPerfume from "./pages/TodayPerfume";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/todayperfume" element={<TodayPerfume/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;