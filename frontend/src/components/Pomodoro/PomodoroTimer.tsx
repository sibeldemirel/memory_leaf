import { useState } from 'react';
import type { PomodoroMode } from './PomodoroService';
import Link from 'next/link';

type PomodoroTimerProps = {
    timeLeft: number;
    isRunning: boolean;
    mode: PomodoroMode;
    onStartPause: () => void;
    onReset: () => void;
    onModeChange: (mode: PomodoroMode) => void;
    onCustomWorkDuration: (minutes: number) => void;
};

export default function PomodoroTimer({
    timeLeft,
    isRunning,
    mode,
    onStartPause,
    onReset,
    onModeChange,
    onCustomWorkDuration,
}: PomodoroTimerProps) {
    const format = (s: number) =>
        `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

    const [customMinutes, setCustomMinutes] = useState('');

    const handleCustomSubmit = () => {
        const parsed = parseInt(customMinutes);
        if (!isNaN(parsed) && parsed > 0) {
            onCustomWorkDuration(parsed);
            setCustomMinutes('');
        }
    };

    return (
        <div className="text-center p-6 bg-gray-50 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">
                {mode === 'work' ? 'Travail' : mode === 'short' ? 'Pause courte' : 'Pause longue'}
            </h2>
            <div className="text-6xl font-mono mb-4">{format(timeLeft)}</div>

            {mode === 'work' && !isRunning && (
                <div className="mb-4">
                    <input
                        type="number"
                        placeholder="Durée (min)"
                        value={customMinutes}
                        onChange={(e) => setCustomMinutes(e.target.value)}
                        className="w-28 px-2 py-1 border border-gray-300 rounded-l"
                    />
                    <button
                        onClick={handleCustomSubmit}
                        className="px-3 py-1 bg-amber-600 text-white rounded-r"
                    >
                        Définir
                    </button>
                </div>
            )}

            <div className="flex justify-center gap-2 mb-4">
                <button onClick={() => onModeChange('work')} className={`px-3 py-1 rounded-xl text-sm ${mode === 'work' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}>Travail</button>
                <button onClick={() => onModeChange('short')} className={`px-3 py-1 rounded-xl text-sm ${mode === 'short' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}>Pause courte</button>
                <button onClick={() => onModeChange('long')} className={`px-3 py-1 rounded-xl text-sm ${mode === 'long' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}>Pause longue</button>
            </div>

            <div className="flex justify-center gap-4">
                <button onClick={onStartPause} className="px-4 py-2 bg-amber-600 text-white rounded-xl">
                    {isRunning ? 'Pause' : 'Démarrer'}
                </button>
                <button onClick={onReset} className="px-4 py-2 bg-gray-300 rounded-xl">
                    Réinitialiser
                </button>
            </div>
            <div className="flex justify-center mt-6">
                <Link
                    href="/"
                    className="text-sm text-amber-600 underline hover:text-amber-800 transition"
                >
                    ← Retour à l'accueil
                </Link>
            </div>
        </div>
    );
}