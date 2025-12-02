import { useEffect, useState } from "react";
import { ImageSelectItem } from "./ImageSelectItem";

export const PostChooseModal = ({ setNewUrl, setCurrentStep, currentStep }) => {
  const [randomNumbers, setRandomNumbers] = useState([]);

  function generateRandomNumbers() {
    const numbers = [];
    for (let i = 0; i < 16; i++) {
      numbers.push(Math.floor(Math.random() * 1084));
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
          <ImageSelectItem
            idImage={num}
            setCurrentStep={setCurrentStep}
            setNewUrl={setNewUrl}
            index={index}
          />
        ))}
      </div>

      <button
        tabIndex={0}
        onClick={generateRandomNumbers}
        className="w-full py-2 px-3 bg-blue-600 text-white mt-3 rounded-md"
      >
        Générer de nouvelles photos
      </button>
    </div>
  );
};
