export const ErrorMessage = ({ displayError, valid = false }) => {
  return (
    <div
      className={`p-5  border ${
        valid ? "border-green-500 bg-green-200" : "border-red-500 bg-red-200"
      }  rounded-xl`}
    >
      {displayError}
    </div>
  );
};
