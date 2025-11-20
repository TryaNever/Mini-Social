import { useEffect, useState } from "react";

export const PostChooseModal = ({ setNewUrl, setCurrentStep, currentStep }) => {
  const [randomNumbers, setRandomNumbers] = useState([]);

  function randomNumber() {
    return Math.floor(Math.random() * 1084);
  }

  function generateRandomNumbers() {
    const numbers = [];
    for (let i = 0; i < 16; i++) {
      numbers.push(randomNumber());
    }
    setRandomNumbers(numbers);
  }

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  return (
    <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-full">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Choix aléatoire
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {randomNumbers.map((num, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-full aspect-square bg-gray-100 rounded overflow-hidden"
            onClick={() => {
              setNewUrl(`https://picsum.photos/id/${num}`);
              setCurrentStep();
            }}
          >
            <img
              src={`https://picsum.photos/id/${num}/100/900.webp`}
              alt="Photo de profil générée aléatoirement"
              className="w-full h-full object-cover"
            />
          </div>
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
  );
};
