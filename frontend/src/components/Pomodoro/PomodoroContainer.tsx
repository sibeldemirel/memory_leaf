'use client';
import { useEffect, useState } from 'react';
import PomodoroTimer from './PomodoroTimer';
import { WORK_TIME, getNextPomodoroMode, PomodoroMode, LONG_BREAK, SHORT_BREAK } from './PomodoroService';

export default function PomodoroContainer() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<PomodoroMode>('work');
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer!);
            handleEndOfSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer!);
  }, [isRunning]);

  const handleEndOfSession = () => {
    setIsRunning(false);
    if (mode === 'work') setSessions((s) => s + 1);
    const { nextMode, nextDuration } = getNextPomodoroMode(mode, sessions);
    setMode(nextMode);
    setTimeLeft(nextDuration);
  };

  const handleStartPause = () => setIsRunning((prev) => !prev);
  const handleReset = () => {
    setIsRunning(false);
    setMode('work');
    setTimeLeft(WORK_TIME);
    setSessions(0);
  };

  const handleManualModeChange = (newMode: PomodoroMode) => {
  setIsRunning(false);
  setMode(newMode);
  if (newMode === 'work') setTimeLeft(WORK_TIME);
  else if (newMode === 'short') setTimeLeft(SHORT_BREAK);
  else setTimeLeft(LONG_BREAK);
};

const handleCustomWorkDuration = (minutes: number) => {
  setIsRunning(false);
  setMode('work');
  setTimeLeft(minutes * 60);
};

  return (
    <PomodoroTimer
      timeLeft={timeLeft}
      isRunning={isRunning}
      mode={mode}
      onStartPause={handleStartPause}
      onReset={handleReset}
      onModeChange={handleManualModeChange}
      onCustomWorkDuration={handleCustomWorkDuration}
    />
  );
}