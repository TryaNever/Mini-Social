import { useState } from "react";

import { PostChooseModal } from "../components/modals/PostChooseModal";

export default function NewPost() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full text-center">
        <p>Cette fonctionnalité est en cours de développement, désolé !</p>
        {currentStep === 1 && (
          <PostChooseModal
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
          />
        )}
      </div>
    </div>
  );
}
