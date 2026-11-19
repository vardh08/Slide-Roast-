import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LoadingProgress } from '../components/LoadingProgress';
import { getAnalysisStatus } from '../services/api';
import confetti from 'canvas-confetti';

export const Analyzing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('processing');
  const [currentStep, setCurrentStep] = useState('Initializing evaluation pipeline...');
  const [progressPercent, setProgressPercent] = useState(15);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    let pollInterval = null;

    const checkStatus = async () => {
      try {
        const data = await getAnalysisStatus(id);
        if (!isMounted) return;

        if (data.success) {
          setStatus(data.status);
          setCurrentStep(data.currentStep || 'Evaluating slides...');
          setProgressPercent(data.progressPercent || 20);

          if (data.status === 'completed') {
            clearInterval(pollInterval);
            // Trigger confetti celebrate
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 }
            });
            setTimeout(() => {
              navigate(`/report/${id}`);
            }, 1000);
          } else if (data.status === 'failed') {
            clearInterval(pollInterval);
            setErrorMessage(data.errorMessage || 'Analysis failed. Please check the presentation file.');
          }
        }
      } catch (err) {
        if (!isMounted) return;
        // Don't kill interval on single network blip, just log
        console.warn('Polling error:', err.message);
      }
    };

    // Initial check
    checkStatus();

    // Poll every 1800ms
    pollInterval = setInterval(checkStatus, 1800);

    return () => {
      isMounted = false;
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [id, navigate]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 flex items-center justify-center min-h-[70vh]">
      <LoadingProgress
        status={status}
        currentStep={currentStep}
        progressPercent={progressPercent}
        errorMessage={errorMessage}
        onRetry={() => navigate('/upload')}
      />
    </div>
  );
};

export default Analyzing;
