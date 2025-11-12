export const ErrorMessage = ({ displayError }) => {
  return (
    <div className="p-5 bg-red-200 border border-red-500 rounded-xl">
      {displayError}
    </div>
  );
};
