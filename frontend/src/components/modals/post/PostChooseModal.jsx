import { useEffect, useState } from "react";
import { ImageSelectItem } from "./ImageSelectItem";

export const PostChooseModal = ({ setNewUrl, setCurrentStep }) => {
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
    <div
  className="bg-white  w-full max-w-lg   overflow-y-auto  max-h-[40vh] mt-4"
>
  <h2 className="text-lg font-semibold mb-4 text-center">
    Exemple de choix
  </h2>

  <div
    className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 p-3"
  >
    {randomNumbers.map((num, index) => (
      <ImageSelectItem
        key={index}
        idImage={num}
        setCurrentStep={setCurrentStep}
        setNewUrl={setNewUrl}
      />
    ))}
  </div>

  <button
    tabIndex={0}
    onClick={generateRandomNumbers}
    className="w-full py-2 mt-5 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition"
  >
    Générer de nouvelles photos
  </button>
</div>

  );
};
