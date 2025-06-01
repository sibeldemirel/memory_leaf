// Définition des constantes et logique métier
export const WORK_TIME = 25 * 60;
export const SHORT_BREAK = 5 * 60;
export const LONG_BREAK = 15 * 60;

export type PomodoroMode = 'work' | 'short' | 'long';

export function getNextPomodoroMode(
  currentMode: PomodoroMode,
  sessionCount: number
): { nextMode: PomodoroMode; nextDuration: number } {
  if (currentMode === 'work') {
    const nextCount = sessionCount + 1;
    if (nextCount % 4 === 0) return { nextMode: 'long', nextDuration: LONG_BREAK };
    return { nextMode: 'short', nextDuration: SHORT_BREAK };
  } else {
    return { nextMode: 'work', nextDuration: WORK_TIME };
  }
}
