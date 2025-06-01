'use client';

import PomodoroContainer from "@/components/Pomodoro/PomodoroContainer";

export default function HomePage() {
  return (
    <section className="flex flex-col gap-6 p-8">
      <PomodoroContainer />
    </section>
  );
}
