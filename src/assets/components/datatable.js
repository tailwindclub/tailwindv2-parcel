import React from "react";
import { PieChart } from "./apexChart";
export function DataTable(props) {
  const attributeData = props.data.attributeData;
  const keys = Object.keys(attributeData);

  const keyDef = {
    attributeResultsAlpha: "Attribute",
    floorResultsAlpha: "Floor",
    rarityResults: "Rarity",
    districtResultsAlpha: "District",
  };
  // console.log("props.data.attributeData", attributeData);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2">
      {keys.map((key, index) => {
        return (
          <div key={index} className="flex justify-center flex-col">
            <div className="text-lg text-center">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </div>
            <PieChart className="" data={attributeData[key]} />
          </div>
        );
      })}
    </div>
  );
}
