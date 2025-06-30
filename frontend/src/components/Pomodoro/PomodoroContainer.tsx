'use client';
import { useEffect, useRef, useState } from 'react';
import PomodoroTimer from './PomodoroTimer';
import {
  WORK_TIME,
  SHORT_BREAK,
  LONG_BREAK,
  getNextPomodoroMode,
  PomodoroMode,
} from './PomodoroService';

export default function PomodoroContainer() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [savedWorkTimeLeft, setSavedWorkTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<PomodoroMode>('work');
  const [sessions, setSessions] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            timerRef.current = null;
            handleEndOfSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [isRunning]);

  const handleEndOfSession = () => {
    setIsRunning(false);
    if (mode === 'work') setSessions((s) => s + 1);
    const { nextMode, nextDuration } = getNextPomodoroMode(mode, sessions);
    setMode(nextMode);
    setTimeLeft(nextDuration);
    if (nextMode === 'work') setSavedWorkTimeLeft(nextDuration);
  };

  const handleStartPause = () => {
    if (isRunning && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
    setMode('work');
    setTimeLeft(WORK_TIME);
    setSavedWorkTimeLeft(WORK_TIME);
    setSessions(0);
  };

  const handleManualModeChange = (newMode: PomodoroMode) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);

    if (mode === 'work') {
      setSavedWorkTimeLeft(timeLeft);
    }

    setMode(newMode);

    if (newMode === 'work') {
      setTimeLeft(savedWorkTimeLeft);
    } else if (newMode === 'short') {
      setTimeLeft(SHORT_BREAK);
    } else {
      setTimeLeft(LONG_BREAK);
    }
  };

  const handleCustomWorkDuration = (minutes: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
    setMode('work');
    const customDuration = minutes * 60;
    setTimeLeft(customDuration);
    setSavedWorkTimeLeft(customDuration);
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
