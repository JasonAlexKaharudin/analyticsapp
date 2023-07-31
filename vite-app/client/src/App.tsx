import SessionChart from "./chartComponents/sessionChart";

function App() {
  return (  
    <>
      <div id="layout" className="w-full h-full bg-[#FAFAFB] font-jakarta">
        <nav id="navbar" className="flex flex-wrap items-center justify-between p-4 bg-[#FFFFFF] border-b-2 rounded-sm">
          <div id="iconHeader">
            <h1 className="pl-2 text-3xl font-bold">Analytics App</h1>
          </div>

          <div className="flex justify-between">
            <h1 className="mx-2 text-2xl">home</h1>
            <h1 className="mx-2 text-2xl">predictions</h1>
          </div>
        </nav>

        <main id="mainContent" className="px-12 py-10">
          <section className="grid grid-cols-1 grid-rows-1 gap-2 md:grid-cols-6 md:grid-rows-2">
            <div className="col-span-4 row-span-2">
              <SessionChart/>
            </div>

            <div className="col-span-2 border-2 border-red-500">
              <h1 className="text-2xl">button clicks</h1>
            </div>

            <div className="col-span-2 border-2 border-red-500">
              <h1 className="text-2xl">page view duration</h1>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default App;
