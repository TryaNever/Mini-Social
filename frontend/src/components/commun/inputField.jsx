export const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  validationError,
  placeholder,
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-medium mb-2"
      >
        {label}
      </label>
      <input
        value={value}
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        className={`w-full border ${
          validationError ? "border-red-500" : "border-gray-300"
        } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150`}
        placeholder={placeholder}
      />
      {validationError && (
        <p className="text-red-500 text-sm mt-1">{validationError}</p>
      )}
    </div>
  );
};
