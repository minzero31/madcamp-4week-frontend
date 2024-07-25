import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Main from './pages/Main';
import { PerfumeProvider } from './contexts/PerfumeContext'; // Import PerfumeProvider
import PerfumeFirstPrefer from './pages/PerfumeFirstPrefer';
import PerfumeSecondPrefer from './pages/PerfumeSecondPrefer';
import PerfumeThirdPrefer from './pages/PerfumeThirdPrefer';
import PerfumeRecommend from './pages/PerfumeRecommend';
import PerfumeRecommendCard from './pages/PerfumeRecommendCard';
import NewPage from './pages/NewPage'; // Import NewPage component
import { Dock, DockCard, Card, DockDivider } from './pages/hooks'; // Import components from hooks.js
import PerfumeGender from './pages/PerfumeGender';

function App() {
  return (
    <PerfumeProvider> {/* Wrap the entire application in PerfumeProvider */}
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/main" element={<Main />} />
            <Route path="/perfumefirstprefer" element={<PerfumeFirstPrefer />} />
            <Route path="/perfumesecondprefer" element={<PerfumeSecondPrefer />} />
            <Route path="/perfumethirdprefer" element={<PerfumeThirdPrefer />} />
            <Route path="/perfumerecommend" element={<PerfumeRecommend />} />
            <Route path="/perfumerecommendcard" element={<PerfumeRecommendCard />} />
            <Route path="/perfumegender" element={<PerfumeGender />} />
            <Route path="/" element={
              <div>
                <Dock> {/* Include Dock only on the root path */}
                  <DockCard>
                    <Card src="path/to/image.jpg" /> {/* Example usage of Card component */}
                  </DockCard>
                  <DockDivider /> {/* Include DockDivider component from hooks.js */}
                </Dock>
                <NewPage /> {/* Render NewPage component */}
              </div>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </PerfumeProvider>
  );
}

export default App;
