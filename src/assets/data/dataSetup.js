import {
  apartmentSData,
  apartmentMData,
  apartmentLData,
  apartmentPData,
  houseData,
} from "./data";

export function init() {
  // for each apartment, separate the types

  const apartmentSResults = dwellingAggregator(apartmentSData);
  const apartmentMResults = dwellingAggregator(apartmentMData);
  const apartmentLResults = dwellingAggregator(apartmentLData);
  const apartmentPResults = dwellingAggregator(apartmentPData);
  const houseResults = dwellingAggregator(houseData);
  return {
    "Apartment S": apartmentSResults,
    "Apartment M": apartmentMResults,
    "Apartment L": apartmentLResults,
    "Apartment P": apartmentPResults,
    House: houseResults,
  };
}

function dwellingAggregator(apartments) {
  //for each apartment count up the total floors
  const Attributes = apartments.map((apt) => {
    return apt.attributes.find(
      (attribute) => attribute.trait_type === "Attribute"
    );
  });
  const Floors = apartments.map((apt) => {
    return apt.attributes.find((attribute) => attribute.trait_type === "Floor");
  });
  const Rarities = apartments.map((apt) => {
    return apt.attributes.find(
      (attribute) => attribute.trait_type === "Rarity"
    );
  });
  const Districts = apartments.map((apt) => {
    return apt.attributes.find(
      (attribute) => attribute.trait_type === "District"
    );
  });
  const Dwellings = apartments.map((apt) => {
    return apt.attributes.find((attribute) => {
      if (attribute.trait_type === "Apartment S") {
        return attribute.trait_type === "Apartment S";
      } else if (attribute.trait_type === "Apartment M") {
        return attribute.trait_type === "Apartment M";
      } else if (attribute.trait_type === "Apartment L") {
        return attribute.trait_type === "Apartment L";
      } else if (attribute.trait_type === "Apartment P") {
        return attribute.trait_type === "Apartment P";
      } else if (attribute.trait_type === "House") {
        return attribute.trait_type === "House";
      }
    });
  });
  //   console.log(
  //     "Attributes",
  //     Attributes,
  //     "Floors",
  //     Floors,
  //     "Rarities",
  //     Rarities,
  //     "Districts",
  //     Districts
  //   );

  let attributeResults = {};
  Attributes.forEach((attribute) => {
    attributeResults[attribute.value] =
      (attributeResults[attribute.value] || 0) + 1;
  });

  const attributeResultsAlpha = {};
  Object.keys(attributeResults)
    .sort()
    .forEach((attribute) => {
      attributeResultsAlpha[attribute] = attributeResults[attribute];
    });
  // console.log("rearange", attributeResultsAlpha);

  let floorResults = {};
  //   console.log("Floors", Floors);
  Floors.forEach((floor) => {
    if (floor === undefined) return;
    floorResults[floor.value] = (floorResults[floor.value] || 0) + 1;
  });
  const floorResultsAlpha = {};
  Object.keys(floorResults)
    .sort((a, b) => {
      if (parseInt(a) > parseInt(b)) {
        return 1;
      } else if (parseInt(a) === parseInt(b)) {
        return 0;
      } else {
        return -1;
      }
    })
    .forEach((attribute) => {
      floorResultsAlpha[attribute] = floorResults[attribute];
    });

  //Rarities
  let rarityResults = {};
  Rarities.forEach((rarity) => {
    rarityResults[rarity.value] = (rarityResults[rarity.value] || 0) + 1;
  });
  const rarityResultsSorted = {};
  Object.keys(rarityResults)
    .sort((a, b) => {
      const sortorder = ["Common", "Rare", "Epic", "Legendary"];
      return sortorder.indexOf(a) > sortorder.indexOf(b);
    })
    .forEach((rare) => {
      rarityResultsSorted[rare] = rarityResults[rare];
    });

  //Districts
  let districtResults = {};
  Districts.forEach((district) => {
    districtResults[district.value] =
      (districtResults[district.value] || 0) + 1;
  });

  const districtResultsAlpha = {};
  Object.keys(districtResults)
    .sort()
    .forEach((attribute) => {
      districtResultsAlpha[attribute] = districtResults[attribute];
    });

  //Dwellings
  let dwellingResults = {};
  Dwellings.forEach((dwelling) => {
    dwellingResults[dwelling.value] =
      (dwellingResults[dwelling.value] || 0) + 1;
  });
  //scores

  const dataSetup = {
    attributeData: {
      attributes: attributeResultsAlpha,
      floors: floorResultsAlpha,
      rarities: rarityResultsSorted,
      districts: districtResultsAlpha,
      dwellings: dwellingResults,
    },
    apartments,
    // scores
  };
  const attributeScores = attributeRarityScore(dataSetup);

  //add in appartment attribute score per apartment
  apartments.forEach((apartment) => {
    const aptAttributes = apartment.attributes;
    const attScores = aptAttributes.map((attribute) => {
      return attributeScores[attribute.value];
    });
    console.log("apt", attScores, aptAttributes, attributeScores);
  });

  // attributeRarityScore(dataSetup);
  // console.log(
  //   "dataSetup",
  //   dataSetup,
  //   attributeScores // scores
  // );
  return {
    attributeData: {
      attributes: attributeResultsAlpha,
      floors: floorResultsAlpha,
      rarities: rarityResultsSorted,
      districts: districtResultsAlpha,
    },
    apartments,
    attributeScores,
    // scores
  };
}

function attributeRarityScore(data) {
  const total = data.apartments.length;
  const totalsCategory = {};
  Object.keys(data.attributeData).forEach((attribute) => {
    Object.keys(data.attributeData[attribute]).forEach((att) => {
      const attributeScore = 1 / (data.attributeData[attribute][att] / total);
      totalsCategory[att] = attributeScore;
    });
  });
  return totalsCategory;
  console.log("attributeScore", totalsCategory);
}
