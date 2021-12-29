import React from "react";
import ReactDom from "react-dom";

import { DataTable } from "../components/datatable";
import { init } from "../data/dataSetup";

function App() {
  const [dwellingType, setDwellingType] = React.useState("Apartment S");
  const [dwellingID, setDwellingID] = React.useState(null);
  const [dwelling, setDwelling] = React.useState(null);

  const [data, setData] = React.useState(init());
  // const data = init();
  // console.log("data init", data);
  const pickerOptions = [
    {
      label: "Small Apartment",
      value: "Apartment S",
    },
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

  function displayRarityPerCategory() {
    const categoryData = data[dwellingType];
    const attributeScores = categoryData.attributeScores;
    const selectedDwelling = categoryData.apartments.find((apartment) => {
      return apartment.edition === parseInt(dwellingID);
    });
    if (selectedDwelling !== undefined) {
      setDwelling(selectedDwelling);
      const dwellingAttributes = selectedDwelling.attributes;
      const aptCatScoreArray = dwellingAttributes.map((attribute) => {
        return attributeScores[attribute.value];
      });
      const aptCatScore = aptCatScoreArray.reduce((a, b) => a + b);
      console.log(
        "categoryData",
        categoryData,
        dwellingID,
        selectedDwelling,
        aptCatScoreArray,
        aptCatScore
      );
    }
  }
  function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  return (
    <div className="container">
      {/* options and header */}
      <h1 className="text-center text-3xl p-2">Dwelling Rarities</h1>
      <div className="container grid grid-cols-1">
        <div className="container mx-auto flex flex-row justify-center flex-wrap">
          <input
            className="border-2 justify-center"
            type="number"
            onChange={(input) => {
              const id = input.target.value;
              setDwellingID(parseInt(id));
            }}
            value={dwellingID || ""}
          ></input>
          <select
            onChange={(select) => {
              const value = select.target.value;
              setDwellingType(value);
              // console.log("selected");
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
          <button className="p-2 rounded-sm" onClick={displayRarityPerCategory}>
            Search
          </button>
        </div>
        {/* attributes */}
        <div className="container shadow-lg bg-white my-8 p-4">
          {dwelling ? (
            <div className="container flex justify-center">
              <img
                className="justify-center"
                src={dwelling.image}
                alt={dwelling.name}
              ></img>
            </div>
          ) : (
            ""
          )}
          <div className="text-center grid grid-cols-2">
            {dwelling
              ? dwelling.attributes.map((attribute) => {
                  return (
                    <div>
                      {attribute.trait_type}: {attribute.value}
                    </div>
                  );
                })
              : ""}
          </div>
          {/* Rarity */}
          <div className="col-span-full text-center grid grid-cols-1">
            <span>Rarity:{round(dwelling?.rarityScore, 2) || ""}</span>
            <span>Rank:{dwelling?.rank}</span>
            {dwelling ? (
              <span>
                {dwelling?.name} Ranks {dwelling.rank} /
                {data[dwellingType].apartments.length}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Pie Chart cards */}
        <div className="container shadow-lg bg-white my-8 p-4">
          <h2 className="text-xl font-bold text-center">Apartment Small</h2>
          <DataTable data={apartmentS} />
        </div>
        <div className="container shadow-lg bg-white my-8 p-4">
          <h2 className="text-xl font-bold text-center">Apartment Medium</h2>
          <DataTable data={apartmentM} />
        </div>
        <div className="container shadow-lg bg-white my-8 p-4">
          <h2 className="text-xl font-bold text-center">Apartment Large</h2>
          <DataTable data={apartmentL} />
        </div>
        <div className="container shadow-lg bg-white my-8 p-4">
          <h2 className="text-xl font-bold text-center">Apartment Premium</h2>
          <DataTable data={apartmentP} />
        </div>
        <div className="container shadow-lg bg-white my-8 p-4">
          <h2 className="text-xl font-bold text-center">House</h2>
          <DataTable data={house} />
        </div>
      </div>
    </div>
  );
}

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

ReactDom.render(<App />, document.getElementById("app"));
