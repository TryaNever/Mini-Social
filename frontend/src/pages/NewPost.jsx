import { useState } from "react";
import { PostChooseModal } from "../components/modals/post/PostChooseModal";

export default function NewPost() {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentUrl, setCurrentUrl] = useState("");

  function incrementStep() {
    setCurrentStep(() => {
      currentStep + 1
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full text-center">
        
        {currentStep === 1 && (
          <>
          <form onSubmit={(e) => {
          e.preventDefault()
          const url = e.target.elements['url-image'].value

          setCurrentUrl(url)
          incrementStep()
        }}>
          <fieldset>
            <legend></legend>
            <label htmlFor="url-image">Ton URL<input type="text" name="url-image" id="url-image" /></label>
          </fieldset>
          <input type="submit" value="Submit" />
        </form>
          <PostChooseModal
            setNewUrl={setCurrentUrl}
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
          />
          </> 
        )}
      </div>
    </div>
  );
}
