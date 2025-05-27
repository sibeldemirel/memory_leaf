import Link from "next/link";

export function DeckListBtn() {
  return (
    <div className="mt-4">
      <Link
        href="/decks"
        className="inline-block border-2 border-grey-600 border-double font-medium px-6 py-2 rounded-xl hover:bg-gray-200 transition-colors duration-200"
      >
        Mes paquets
      </Link>
    </div>
  );
}
