import NavBar from "./components/NavBar";
import SessionChart from "./dataVizComponents/SessionChart";
import ClicksChart from "./dataVizComponents/ClicksChart";
import PageViewTable from "./dataVizComponents/PageViewTable";
import BrowserChart from "./dataVizComponents/BrowserChart";

function App() {
  return (  
    <>
      <div id="layout" className="w-full h-full bg-[#FAFAFB] font-jakarta">
        <NavBar/>

        <main id="mainContent" className="px-5 py-6 md:py-10 md:px-12">
          <section id="row-1" className="grid grid-cols-1 grid-rows-1 gap-4 my-4 md:grid-cols-6 md:grid-rows-4">
            <div className="col-span-4 row-span-4 bg-[#FFFFFF]">
              <SessionChart/>
            </div>

            <div className="col-span-4 md:col-span-2 md:row-span-2 bg-[#FFFFFF]">
              <ClicksChart/>
            </div>

            <div className="col-span-4 md:col-span-2 md:row-span-2 bg-[#FFFFFF]">
              <PageViewTable/>
            </div>
          </section>

          <section id="row-2" className="grid grid-cols-1 grid-rows-1 gap-4 md:grid-cols-7 md:grid-rows-4">
            <div className="col-span-3 row-span-4 bg-[#FFFFFF]">
              <SessionChart/>
            </div>

            <div className="col-span-2 row-span-4 bg-[#FFFFFF]">
              <BrowserChart/>
            </div>

            <div className="col-span-2 row-span-4 bg-[#FFFFFF]">
              <ClicksChart/>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default App;
