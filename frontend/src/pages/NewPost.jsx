import { useEffect, useState } from "react";
import { PostChooseModal } from "../components/modals/post/PostChooseModal";
import { FormImgUrl } from "../components/newPost/FormImgUrl";

export default function NewPost() {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentUrl, setCurrentUrl] = useState("");

  function incrementStep() {
    setCurrentStep((prev) => prev + 1)
  }

  useEffect(() => {
    if (currentStep !== 3) return

  }, [currentStep])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 pt-24">
      <div className="fixed bg-white shadow-md rounded-xl p-6 max-w-md w-full text-center">
        
        {currentStep === 1 ? (
          <>
            <FormImgUrl setNewUrl={setCurrentUrl} incrementStep={incrementStep} />

            <PostChooseModal
             setNewUrl={setCurrentUrl}
             setCurrentStep={setCurrentStep}
             currentStep={currentStep}
            />
          </> 
        ) : currentStep === 2 ? (<div>Etape 2</div>) : null}
      </div>
    </div>
  );
}
