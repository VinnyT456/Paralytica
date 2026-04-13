import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Questionnaire from './pages/Questionnaire';
import Simulate from './pages/Simulate';
import Demo from './pages/Demo';

// Layout Component (wraps all pages with navigation and theme)
function Layout({ bgTheme, setBgTheme }) {
  const isLight = bgTheme === 'light';

  // Get background styles based on theme
  const getBackgroundStyles = () => {
    switch(bgTheme) {
      case 'space':
        return {
          background: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 50%, #020617 100%)',
        };
      case 'light':
        return {
          background: 'linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%)',
        };
      default:
        return {
          background: '#020617',
        };
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${isLight ? 'text-slate-900' : 'text-slate-200'}`}
      style={getBackgroundStyles()}
    >
      <Navigation bgTheme={bgTheme} setBgTheme={setBgTheme} />
      <main className="flex-1 w-full min-w-0">
        <Routes>
          <Route path="/" element={<Home bgTheme={bgTheme} />} />
          <Route path="/about" element={<About bgTheme={bgTheme} />} />
          <Route path="/questionnaire" element={<Questionnaire bgTheme={bgTheme} />} />
          <Route path="/simulate" element={<Simulate bgTheme={bgTheme} />} />
          <Route path="/demo" element={<Demo bgTheme={bgTheme} />} />
        </Routes>
      </main>
    </div>
  );
}

// Main App Component with Theming
function App() {
  const [bgTheme, setBgTheme] = useState('space');

  return (
    <AppProvider>
      <BrowserRouter>
        <Layout bgTheme={bgTheme} setBgTheme={setBgTheme} />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
