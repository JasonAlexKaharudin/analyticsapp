import { useGetAveragePageViewQuery } from "./services/api";

function App() {
  const { data } = useGetAveragePageViewQuery();
  console.log(data);

  return (  
    <>
      <h1 className="text-3xl underline">Hi</h1>
    </>
  )
}

export default App;
