import { createContext, useContext, useState, useEffect } from 'react';

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
  /** Known demo persona id only — resolve with getDemoPersonaById; do not store raw persona objects. */
  const [demoPersonaId, setDemoPersonaId] = useState(null);
  // Current run state (persisted so refresh doesn't wipe a simulation in progress)
  const [timeline, setTimeline] = useState([]); // user-entered life points
  const [milestoneHistory, setMilestoneHistory] = useState([]); // generated nodes committed so far
  const [hasHydrated, setHasHydrated] = useState(false);

  // Hydrate state from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('nexus_vault');
      if (raw) {
        const {
          savedTimelines: storedTimelines,
          heuristicProfile: storedProfile,
          demoPersonaId: storedDemoPersonaId,
          timeline: storedTimeline,
          milestoneHistory: storedMilestoneHistory
        } = JSON.parse(raw);
        if (storedTimelines) setSavedTimelines(storedTimelines);
        if (storedProfile) setHeuristicProfile(storedProfile);
        if (storedDemoPersonaId !== undefined) setDemoPersonaId(storedDemoPersonaId);
        if (Array.isArray(storedTimeline)) setTimeline(storedTimeline);
        if (Array.isArray(storedMilestoneHistory)) setMilestoneHistory(storedMilestoneHistory);
      }
    } catch (e) {
      console.warn('nexus_vault: failed to parse localStorage', e);
    } finally {
      // Prevent the "persist" effect from overwriting stored data with empty initial state on first mount.
      // Using state (not ref) ensures we don't write during the initial render cycle.
      setHasHydrated(true);
    }
  }, []);

  // Persist to localStorage whenever relevant state changes
  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem(
        'nexus_vault',
        JSON.stringify({
          savedTimelines,
          heuristicProfile,
          demoPersonaId,
          timeline,
          milestoneHistory
        })
      );
    } catch (e) {
      console.warn('nexus_vault: failed to write localStorage', e);
    }
  }, [hasHydrated, savedTimelines, heuristicProfile, demoPersonaId, timeline, milestoneHistory]);

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
    demoPersonaId,
    setDemoPersonaId,
    timeline,
    setTimeline,
    milestoneHistory,
    setMilestoneHistory,
    hasHydrated
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
