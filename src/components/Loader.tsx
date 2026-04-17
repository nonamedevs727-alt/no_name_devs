import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

const loadingSteps = [
  "Terraforming activated",
  "Data calculation",
  "Atmosphere deployment",
  "Geosystem creation",
  "Vegetal matter generation",
  "Ecosystem modeling",
  "Rivers and lake deployed",
  "Known trails emerging",
  "Viewpoints activated",
  "Metadata processing",
  "Initiating the dive into the NOname dev universe",
  "Whisper of data awakened",
  "Breath of the atmosphere invoked",
  "Bones of the earth shaped",
  "Essence of vegetation germinating",
  "Weave of the eco-realms forming",
  "Water veins and lake mirrors revealed",
  "Ancestral trails reemerging",
  "Sacred viewpoints illuminated",
  "Memory of the elements harmonizing"
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const stepIndex = Math.floor((progress / 100) * loadingSteps.length);
    setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1));
  }, [progress]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1C1512] text-[#FEFEFD]"
      exit={{ opacity: 0, filter: "blur(12px)", scale: 1.03 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(163,90,58,0.12),transparent_70%)]" />
      </div>

      <div className="relative w-full max-w-sm px-8 flex flex-col items-center gap-0">
        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          className="mb-12 flex flex-col items-center gap-4"
        >
          <img src="/logo.png" alt="Logo" className="w-20 h-20 object-contain mb-2" />
          <div className="flex flex-col items-center gap-1">
            <span
              className="text-[clamp(3rem,10vw,5rem)] font-bold uppercase leading-none tracking-[-0.04em] text-[#FEFEFD]"
              style={{ fontFamily: '"Social Gothic", "League Gothic", sans-serif' }}
            >
              NOname dev
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#B69269]/70">
              Studio · Est. 2024
            </span>
          </div>
        </motion.div>

        {/* Step label */}
        <div className="h-10 flex items-center justify-center overflow-hidden w-full relative mb-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="font-mono text-[10px] text-center uppercase tracking-[0.28em] text-[#B69269]/80 absolute"
            >
              {loadingSteps[currentStep]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[1px] bg-[#B69269]/20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#B69269]"
            style={{ width: `${progress}%` }}
            layout
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Percentage */}
        <div className="mt-4 w-full flex justify-between items-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FEFEFD]/20">Loading</span>
          <span className="font-mono text-[11px] tabular-nums text-[#B69269]/60">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
