import { useState } from 'react';
import { generateNextNode } from '../utils/mockApi';
import Step1MapTimeline from '../components/Step1MapTimeline';
import Step2PrimaryTimeline from '../components/Step2PrimaryTimeline';
import Step3Loading from '../components/Step3Loading';
import DualTimeline from '../components/DualTimeline';
import Modal from '../components/Modal';
import BackButton from '../components/BackButton';

function Simulate({ bgTheme }) {
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

  const handleStep1Complete = (points, socialDynamics) => {
    setLifePoints(points);
    setIncludeSocial(socialDynamics);
    setStep(2);
  };

  const handleBranchClick = (point, index) => {
    setSelectedBranch(point);
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
      const userMilestones = lifePoints.map(point => ({
        year: point.year,
        title: point.role,
        narrative: `${point.company ? `At ${point.company}` : 'Working'} ${point.location ? `in ${point.location}` : ''}`.trim(),
        metrics: {
          wealth: point.happiness * 8, // Estimate based on happiness
          satisfaction: point.happiness * 9,
          happiness: point.happiness * 10
        },
        isUserMilestone: true
      }));

      setBaselineTimeline(userMilestones);

      // Generate first draft node for projected timeline (RIGHT side)
      await generateDraftNode(userMilestones);
    } catch (error) {
      console.error('Error generating timelines:', error);
      setIsGenerating(false);
    }
  };

  const generateDraftNode = async (baseline = baselineTimeline) => {
    setIsGenerating(true);
    setDraftNode(null);

    try {
      const baselineNode = baseline[projectedTimeline.length]; // Get corresponding baseline node

      const node = await generateNextNode(
        branchDecision,
        projectedTimeline,
        includeSocial,
        selectedBranch.year,
        baselineNode // Pass as counter-context
      );
      setDraftNode(node);
    } catch (error) {
      console.error('Error generating node:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAccept = async () => {
    if (!draftNode) return;

    // Commit draft to projected timeline
    setProjectedTimeline(prev => [...prev, draftNode]);
    setDraftNode(null);

    // Generate next node if there are more baseline nodes
    if (projectedTimeline.length < baselineTimeline.length - 1) {
      await generateDraftNode();
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
          onAccept={handleAccept}
          onDiverge={handleDiverge}
          onManualOverride={handleManualOverride}
          onReset={handleReset}
          bgTheme={bgTheme}
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
