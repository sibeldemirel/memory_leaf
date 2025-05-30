'use client';

import { DeckListBtn } from "@/components/DeckListBtn/DeckListBtn";
import { Presentation } from "@/components/Presentation/Presentation";

export default function HomePage() {
  return (
    <section className="flex flex-col gap-6 p-8">
      <h1 className="text-3xl font-bold">Bienvenue sur MemoryLeaf {'\uD83C\uDF3F'}</h1>
      <Presentation/>
      <DeckListBtn/>
    </section>
  );
}
