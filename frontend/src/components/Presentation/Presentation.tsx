const paragraphs = [
  "🌿 MemoryLeaf, c’est l’alliance entre sérénité et efficacité. Comme une feuille qui pousse à son rythme, votre mémoire s’épanouit avec régularité.",
  "Créez vos propres paquets de cartes, suivez vos révisions avec un timer Pomodoro, et progressez sans pression.",
  "Grâce à une méthode simple et adaptée, apprendre devient plus fluide, plus personnel… et surtout plus durable."
];

export function Presentation() {
  return (
    <div className="bg-grey-50 p-6 rounded-2xl shadow-md">
      {paragraphs.map((text, i) => (
        <p key={i} className="text-lg leading-relaxed text-gray-800 mb-4 last:mb-0">
          {text}
        </p>
      ))}
    </div>
  );
}
