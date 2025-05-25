'use client';

import { DeckListContainer } from "@/components/DeckList/DeckListContainer";

export default function HomePage() {
  return (
    <section className="flex flex-col gap-6 p-8">
      <DeckListContainer />
    </section>
  );
}
