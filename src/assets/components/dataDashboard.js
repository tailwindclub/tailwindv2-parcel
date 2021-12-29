import React from "react";

import { DataTable } from "../components/datatable";
import { init } from "../data/dataSetup";

export function DataDashboard(props) {
  const data = init();
  const apartmentS = data["Apartment S"];
  const apartmentM = data["Apartment M"];
  const apartmentL = data["Apartment L"];
  const apartmentP = data["Apartment P"];
  const house = data["House"];
  return (
    <div>
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
  );
}
