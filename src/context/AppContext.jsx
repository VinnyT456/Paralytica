import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [savedTimelines, setSavedTimelines] = useState([]);
  const [heuristicProfile, setHeuristicProfile] = useState(null);
  const [demoPersona, setDemoPersona] = useState(null);

  const saveTimeline = (timeline) => {
    const newTimeline = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...timeline
    };
    setSavedTimelines(prev => [newTimeline, ...prev]);
    return newTimeline.id;
  };

  const deleteTimeline = (id) => {
    setSavedTimelines(prev => prev.filter(timeline => timeline.id !== id));
  };

  const loadTimeline = (id) => {
    return savedTimelines.find(timeline => timeline.id === id);
  };

  const value = {
    savedTimelines,
    saveTimeline,
    deleteTimeline,
    loadTimeline,
    heuristicProfile,
    setHeuristicProfile,
    demoPersona,
    setDemoPersona
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
