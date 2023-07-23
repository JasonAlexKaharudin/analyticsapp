import { trackButtonClick } from "./analytics"

function App() { 
  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const btnId = event.currentTarget.id;
    trackButtonClick(btnId);
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>

      <div className="flex justify-around mt-56">
        <button 
          onClick={handleButtonClick}
          className="px-5 py-2 text-white rounded-md bg-sky-500 hover:bg-sky-700" id="button-1">
          button-1
        </button>
        <button 
          onClick={handleButtonClick}
          className="px-5 py-2 text-white rounded-md bg-violet-500 hover:bg-violet-600" id="button-2">
          button-2
        </button>
      </div>
    </>
  )
}

export default App;
