import { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";

export const ImageSelectItem = ({ idImage, setCurrentStep, setNewUrl }) => {
  const [loading, setLoading] = useState(true);
  const [idPicture, setIdPicture] = useState(idImage);

  useEffect(() => {
    setIdPicture(idImage);
  }, [idImage]);

  const handleClick = () => {
    setNewUrl(`https://picsum.photos/id/${idPicture}`);
    setCurrentStep();
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    let newId = Math.floor(Math.random() * 1084);
    setIdPicture(newId);
    setLoading(true);
  };

  return (
    <div
      className="flex items-center justify-center w-full bg-gray-100 rounded overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {loading && (
        <OrbitProgress variant="track-disc" color="#8200db" size="small" text="" />
      )}

      <img
        src={`https://picsum.photos/id/${idPicture}/300/300?cache=${Date.now()}`}
        alt="image miniature"
        className={`w-full h-full object-cover ${loading ? "hidden" : ""}`}
        crossOrigin="anonymous"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};
