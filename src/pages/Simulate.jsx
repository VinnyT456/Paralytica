import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { generateNextNode } from '../utils/mockApi';
import Step1MapTimeline from '../components/Step1MapTimeline';
import Step2PrimaryTimeline from '../components/Step2PrimaryTimeline';
import Step3Loading from '../components/Step3Loading';
import DualTimeline from '../components/DualTimeline';
import Modal from '../components/Modal';
import BackButton from '../components/BackButton';

function Simulate({ bgTheme }) {
  const location = useLocation();
  const { heuristicProfile, demoPersona } = useAppContext();
  const [step, setStep] = useState(1);
  const [lifePoints, setLifePoints] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchDecision, setBranchDecision] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [includeSocial, setIncludeSocial] = useState(true);

  // Dual Timeline State
  const [baselineTimeline, setBaselineTimeline] = useState([]);
  const [projectedTimeline, setProjectedTimeline] = useState([]);
  const [draftNode, setDraftNode] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // API Cooldown State (prevent multiple simultaneous requests)
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const API_COOLDOWN_MS = 2000; // 2 second cooldown between requests
  const requestInFlight = useRef(false); // Track if a request is currently in progress

  // Check if we're loading a demo persona and pre-populate timeline
  useEffect(() => {
    const personaData = location.state?.demoPersona || demoPersona;

    if (personaData && personaData.careerMilestones && personaData.careerMilestones.length > 0) {
      // Pre-load the timeline with demo persona's career milestones
      const preloadedPoints = personaData.careerMilestones.map(milestone => ({
        year: milestone.year,
        role: milestone.role,
        company: milestone.company,
        location: milestone.location,
        happiness: milestone.happiness
      }));

      setLifePoints(preloadedPoints);
      setIncludeSocial(true); // Default to including social dynamics for demos
      setStep(2); // Skip Step 1 (Map Timeline) and go directly to Step 2 (Primary Timeline)
    }
  }, [location.state, demoPersona]);

  const handleStep1Complete = (points, socialDynamics) => {
    setLifePoints(points);
    setIncludeSocial(socialDynamics);
    setStep(2);
  };

  const handleBranchClick = (point, index) => {
    setSelectedBranch({ ...point, branchIndex: index });
    setShowModal(true);
  };

  const handleModalSubmit = async (decision) => {
    setBranchDecision(decision);
    setShowModal(false);
    setStep(3);

    // Generate baseline timeline (LEFT side - Baseline Reality)
    setIsGenerating(true);
    try {
      // Use ONLY user's actual milestones for baseline
      // IMPORTANT: Ensure year is always a Number to prevent string concatenation
      const userMilestones = lifePoints.map(point => ({
        year: Number(point.year),
        title: point.role,
        narrative: `${point.company ? `At ${point.company}` : 'Working'} ${point.location ? `in ${point.location}` : ''}`.trim(),
        metrics: {
          wealth: point.happiness * 8, // Estimate based on happiness
          satisfaction: point.happiness * 9,
          happiness: point.happiness * 10
        },
        isUserMilestone: true
      }));

      // Filter baseline to only include milestones within 10 years of branch point
      const branchYear = Number(selectedBranch.year);
      const branchIdx = selectedBranch.branchIndex;

      // Include all milestones up to and including branch point, plus future milestones within 10 years
      const filteredBaseline = userMilestones.filter((milestone, index) => {
        // Include all milestones up to and including the branch point (shared history)
        if (index <= branchIdx) return true;
        // For future milestones, only include if within 10 years of branch
        return Number(milestone.year) - branchYear <= 10;
      });

      setBaselineTimeline(filteredBaseline);

      // Generate first draft node for projected timeline (RIGHT side)
      // Pass decision directly since state update is async
      await generateDraftNode(filteredBaseline, decision);
    } catch (error) {
      console.error('Error generating timelines:', error);
      setIsGenerating(false);
    }
  };

  const generateDraftNode = async (baseline = baselineTimeline, decision = branchDecision) => {
    // Prevent duplicate requests - check if already generating
    if (isGenerating || requestInFlight.current) {
      console.log('⏸️ Request blocked: Already generating');
      return;
    }

    // Enforce cooldown period
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < API_COOLDOWN_MS) {
      const remainingCooldown = API_COOLDOWN_MS - timeSinceLastRequest;
      console.log(`⏸️ Request blocked: Cooldown active (${Math.ceil(remainingCooldown / 1000)}s remaining)`);
      return;
    }

    requestInFlight.current = true;
    setIsGenerating(true);
    setDraftNode(null);
    setLastRequestTime(now);

    try {
      // Get corresponding baseline node (may be undefined if projected extends beyond baseline)
      const baselineNode = baseline[projectedTimeline.length] || null;

      // Get demo persona data (from context or location state)
      const personaData = location.state?.demoPersona || demoPersona;

      console.log('🚀 Generating draft node...');
      const node = await generateNextNode(
        decision, // Use the passed decision parameter
        projectedTimeline,
        includeSocial,
        selectedBranch.year,
        baselineNode, // Pass as counter-context (null if beyond baseline)
        heuristicProfile, // Pass user profile for AI predictions
        personaData // Pass demo persona for hardcoded outcomes
      );
      setDraftNode(node);
      console.log('✅ Draft node generated successfully');
    } catch (error) {
      console.error('❌ Error generating node:', error);
    } finally {
      setIsGenerating(false);
      requestInFlight.current = false;
    }
  };

  const handleAccept = async (nextDecision) => {
    if (!draftNode) return;

    // Prevent duplicate requests
    if (isGenerating || requestInFlight.current) {
      console.log('⏸️ Accept blocked: Already generating');
      return;
    }

    // Commit draft to projected timeline
    const updatedProjectedTimeline = [...projectedTimeline, draftNode];
    setProjectedTimeline(updatedProjectedTimeline);
    setDraftNode(null);

    // Check if we've reached 10 years from branch point
    // IMPORTANT: Use Number() to ensure proper arithmetic
    const yearsSinceBranch = Number(draftNode.year) - Number(selectedBranch.year);
    const hasReached10Years = yearsSinceBranch >= 10;

    // Generate next node using the custom decision from input field
    // Stop ONLY if we've reached 10 years from branch point
    if (!hasReached10Years) {
      // Enforce cooldown period
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime;
      if (timeSinceLastRequest < API_COOLDOWN_MS) {
        const remainingCooldown = API_COOLDOWN_MS - timeSinceLastRequest;
        console.log(`⏸️ Request blocked: Cooldown active (${Math.ceil(remainingCooldown / 1000)}s remaining)`);
        return;
      }

      // Use the nextDecision passed from the input field
      const decision = nextDecision || branchDecision;

      requestInFlight.current = true;
      setIsGenerating(true);
      setLastRequestTime(now);

      try {
        // Get corresponding baseline node (may be undefined if projected extends beyond baseline)
        const baselineNode = baselineTimeline[updatedProjectedTimeline.length] || null;

        // Get demo persona data (from context or location state)
        const personaData = location.state?.demoPersona || demoPersona;

        console.log('🚀 Generating next node after accept...');
        const node = await generateNextNode(
          decision,
          updatedProjectedTimeline,
          includeSocial,
          selectedBranch.year,
          baselineNode,
          heuristicProfile,
          personaData // Pass demo persona for hardcoded outcomes
        );
        setDraftNode(node);
        console.log('✅ Next node generated successfully');
      } catch (error) {
        console.error('❌ Error generating next node:', error);
      } finally {
        setIsGenerating(false);
        requestInFlight.current = false;
      }
    }
  };

  const handleDiverge = async () => {
    // Regenerate the current draft node with same baseline context
    await generateDraftNode();
  };

  const handleManualOverride = async (manualText) => {
    if (!draftNode) return;

    // Create manual node with draft metrics but custom narrative
    const manualNode = {
      ...draftNode,
      narrative: manualText,
      title: `Year ${draftNode.year} (Manual)`
    };

    // Commit manual node to projected timeline
    setProjectedTimeline(prev => [...prev, manualNode]);
    setDraftNode(null);

    // Generate next node based on the manual input
    if (projectedTimeline.length < baselineTimeline.length - 1) {
      await generateDraftNode();
    }
  };

  const handleReset = () => {
    setStep(1);
    setLifePoints([]);
    setSelectedBranch(null);
    setBranchDecision('');
    setBaselineTimeline([]);
    setProjectedTimeline([]);
    setDraftNode(null);
    setIsGenerating(false);
    setIncludeSocial(true);
  };

  return (
    <div className="pt-20">
      {step === 1 && <BackButton to="/questionnaire" bgTheme={bgTheme} />}
      {step === 1 && <Step1MapTimeline onNext={handleStep1Complete} bgTheme={bgTheme} />}
      {step === 2 && <Step2PrimaryTimeline lifePoints={lifePoints} onBranch={handleBranchClick} bgTheme={bgTheme} />}
      {step === 3 && isGenerating && baselineTimeline.length === 0 && <Step3Loading bgTheme={bgTheme} />}
      {step === 3 && baselineTimeline.length > 0 && (
        <DualTimeline
          branchDecision={branchDecision}
          baselineTimeline={baselineTimeline}
          projectedTimeline={projectedTimeline}
          draftNode={draftNode}
          isGenerating={isGenerating}
          branchIndex={selectedBranch?.branchIndex || 0}
          onAccept={handleAccept}
          onDiverge={handleDiverge}
          onManualOverride={handleManualOverride}
          onReset={handleReset}
          bgTheme={bgTheme}
          isDemoPersona={!!(location.state?.demoPersona || demoPersona)}
        />
      )}

      {showModal && selectedBranch && (
        <Modal
          branchPoint={selectedBranch}
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
          bgTheme={bgTheme}
        />
      )}
    </div>
  );
}

export default Simulate;
