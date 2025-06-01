import { useState } from "react";

type AddDeckModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
};

export function AddDeckModal({ isOpen, onClose, onAdd }: AddDeckModalProps) {
  const [deckName, setDeckName] = useState("");

  const handleAdd = () => {
    if (deckName.trim()) {
      onAdd(deckName.trim());
      setDeckName("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-11/12 max-w-md">
        <h2 className="text-lg font-semibold mb-4">Créer un nouveau paquet</h2>
        <input
          type="text"
          placeholder="Nom du paquet"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Annuler
          </button>
          <button
            onClick={() => {
              handleAdd();
              onClose();
            }}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
