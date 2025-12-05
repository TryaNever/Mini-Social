export const FormImgUrl = ({ setNewUrl, incrementStep }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const url = e.target.elements["url-image"].value;
        setNewUrl(url);
        incrementStep();
      }}
    >
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold mb-4 text-center w-full">
          Custom Url Image
        </legend>

        <div className="flex flex-col space-y-2">
          <label htmlFor="url-image" className="text-left text-sm font-medium">
            Ton URL :
          </label>

          <input
            type="text"
            name="url-image"
            id="url-image"
            className="w-full border border-purple-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-700"
            placeholder="https://exemple.com/mon-image.jpg"
          />
        </div>
      </fieldset>

      <input
        type="submit"
        value="Continuer"
        className="w-full py-2 mt-2 bg-purple-600 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-purple-700 transition"
      />
    </form>
  );
};
