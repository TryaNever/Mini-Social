import { useState } from "react";

export const PpChooseModal = ({ isOpen, onClose, setNewUrl }) => {
  const [randomNumbers, setRandomNumbers] = useState(() =>
    Array.from({ length: 9 }, () => Math.floor(Math.random() * 70)),
  );

  function generateRandomNumbers() {
    setRandomNumbers(
      Array.from({ length: 9 }, () => Math.floor(Math.random() * 70)),
    );
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          tabIndex={0}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Choix aléatoire
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
          {randomNumbers.map((num, index) => (
            <button
              key={index}
              type="button"
              className="flex items-center justify-center w-full aspect-square bg-gray-100 rounded overflow-hidden"
              onClick={() => {
                setNewUrl(`https://i.pravatar.cc/150?img=${num}`);
                onClose();
              }}
            >
              <img
                src={`https://i.pravatar.cc/150?img=${num}`}
                alt={`avatar ${num}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
        <button
          tabIndex={0}
          onClick={generateRandomNumbers}
          className="w-full py-2 px-3 bg-blue-600 text-white mt-3 rounded-md"
        >
          Génerer de nouvelle photo de profile
        </button>
      </div>
    </div>
  );
};
