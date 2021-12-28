import React from "react";
import ReactDom from "react-dom";

import { DataTable } from "../components/datatable";
import { init } from "../data/dataSetup";

function App() {
  const [dwellingType, setDwellingType] = React.useState("Apartment M");
  const data = init();
  console.log("data init", data);
  const pickerOptions = [
    {
      label: "Medium Apartment",
      value: "Apartment M",
    },
    {
      label: "Large Apartment",
      value: "Apartment L",
    },
    {
      label: "Premium Apartment",
      value: "Apartment P",
    },
    {
      label: "House",
      value: "House",
    },
  ];
  const apartmentS = data["Apartment S"];
  const apartmentM = data["Apartment M"];
  const apartmentL = data["Apartment L"];
  const apartmentP = data["Apartment P"];
  const house = data["House"];

  function displayRarity() {
    console.log("test");
  }

  return (
    <div className="container">
      <h1 className="text-center text-3xl p-2">Dwelling Rarities</h1>

      <div className="container grid grid-cols-1">
        <div className="container mx-auto flex flex-row justify-center flex-wrap">
          <input className="border-2 justify-center" type="number"></input>
          <select
            onChange={(select) => {
              const value = select.target.value;
              setDwellingType(value);
              console.log("selected");
            }}
          >
            {pickerOptions.map((po, index) => {
              return (
                <option key={index} value={po.value}>
                  {po.label}
                </option>
              );
            })}
          </select>
          <button className="p-2 rounded-sm" onClick={displayRarity}>
            Search
          </button>
        </div>

        <div className="col-span-full text-center">
          <span>Rarity:</span>
        </div>
      </div>

      <div className="container shadow-lg bg-white my-4 p-4">
        <h2 className="text-xl font-bold text-center">Apartment Small</h2>
        <DataTable data={apartmentS} />
      </div>
      <div className="container shadow-lg bg-white my-4 p-4">
        <h2 className="text-xl font-bold text-center">Apartment Medium</h2>
        <DataTable data={apartmentM} />
      </div>
      <div className="container shadow-lg bg-white my-4 p-4">
        <h2 className="text-xl font-bold text-center">Apartment Large</h2>
        <DataTable data={apartmentL} />
      </div>
      <h2>Apartment Premium</h2>
      <DataTable data={apartmentP} />
      <h2>House</h2>
      <DataTable data={house} />
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("app"));
