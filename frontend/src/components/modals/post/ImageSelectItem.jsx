import { useState } from "react";

export const ImageSelectItem = ({ setCurrentStep, setNewUrl }) => {
  const [loading, setLoading] = useState(true);
  const [idCurrentImage, setIdCurrentImage] = useState(
    Math.floor(Math.random() * 1084)
  );

  function newImage() {
    setIdCurrentImage();
    setLoading(true);
  }

  return (
    <div
      className="flex items-center justify-center w-full aspect-square bg-gray-100 rounded overflow-hidden"
      onClick={() => {
        setNewUrl(`https://picsum.photos/id/${idImage}`);
        setCurrentStep();
      }}
    >
      {loading && (
        <div className="flex items-center justify-center w-full h-full">
          <p>chargement…</p>
        </div>
      )}

      <img
        src={`https://picsum.photos/id/${idCurrentImage}/300/300?cache=${Date.now()}`}
        alt="image miniature"
        className={`w-full h-full object-cover ${loading ? "hidden" : ""}`}
        crossOrigin="anonymous"
        onLoad={() => {
          setLoading(false);
          setNewUrl();
        }}
        onError={() => {
          newImage("https://picsum.photos/id/${idCurrentImage}/300/300");
        }}
      />
    </div>
  );
};
