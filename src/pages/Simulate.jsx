import { useState } from 'react';
import { simulateBranchResponse } from '../utils/mockApi';
import Step1MapTimeline from '../components/Step1MapTimeline';
import Step2PrimaryTimeline from '../components/Step2PrimaryTimeline';
import Step3Loading from '../components/Step3Loading';
import Step4FracturedTimeline from '../components/Step4FracturedTimeline';
import Modal from '../components/Modal';

function Simulate({ bgTheme }) {
  const [step, setStep] = useState(1);
  const [lifePoints, setLifePoints] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchIndex, setBranchIndex] = useState(null);
  const [branchDecision, setBranchDecision] = useState('');
  const [alternateTimeline, setAlternateTimeline] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [includeSocial, setIncludeSocial] = useState(true);

  const handleStep1Complete = (points, socialDynamics) => {
    setLifePoints(points);
    setIncludeSocial(socialDynamics);
    setStep(2);
  };

  const handleBranchClick = (point, index) => {
    setSelectedBranch(point);
    setBranchIndex(index);
    setShowModal(true);
  };

  const handleModalSubmit = async (decision) => {
    setBranchDecision(decision);
    setShowModal(false);
    setStep(3);

    // Simulate API call with includeSocial parameter
    const response = await simulateBranchResponse(selectedBranch, decision, includeSocial);
    setAlternateTimeline(response);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setLifePoints([]);
    setSelectedBranch(null);
    setBranchIndex(null);
    setBranchDecision('');
    setAlternateTimeline(null);
    setIncludeSocial(true);
  };

  return (
    <div className="pt-20">
      {step === 1 && <Step1MapTimeline onNext={handleStep1Complete} bgTheme={bgTheme} />}
      {step === 2 && <Step2PrimaryTimeline lifePoints={lifePoints} onBranch={handleBranchClick} bgTheme={bgTheme} />}
      {step === 3 && <Step3Loading bgTheme={bgTheme} />}
      {step === 4 && alternateTimeline && (
        <Step4FracturedTimeline
          lifePoints={lifePoints}
          branchIndex={branchIndex}
          branchDecision={branchDecision}
          alternateTimeline={alternateTimeline}
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
