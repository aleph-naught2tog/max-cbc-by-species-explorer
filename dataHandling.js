function loadCBCData(_url) {
  loadTable(_url, onDataLoaded);
}

function onDataLoaded(_data) {
  countData = processCBCData(_data);

  //populate a weather array
  for (let i = 0; i < countData.weather.getRowCount(); i++) {
    let year = countData.weather.getRow(i).get("CountYear");
    console.debug({ countYear: year, year: 1900 + int(year) - 1 })
    let temp = countData.weather.getRow(i).get("LowTemp");
    temps[1900 + int(year)] = temp;
  }
}

function processCBCData(_data) {
  //set the properties of the count
  //L.I.: Brooklyn,NYBR,40.6160370000/-73.9448350000
  let details = _data.getRow(1);
  let count = {
    name: details.get(0),
    code: details.get(1),
    latLon: {
      lat: details.get(2).split("/")[0],
      lon: details.get(2).split("/")[0],
    },
    birdMap: {},
    birdList: [],
  };

  //Go through the data and create a series of Table objects
  let order = [
    "weather",
    "effort",
    "orgs",
    "checklist",
    "compilers",
    "participants",
  ];
  let cleanHeaders = [
    "CountYear,LowTemp,HighTemp,AMCloud,PMClouds,AMRain,PMRain,AMSnow,PMSnow",
    "CountYear,CountDate,NumParticipants,NumHours,NumSpecies",
    "CountYear,SponsoringOrg",
    "CommonName,CountYear,HowMany,NumberByPartyHours,Flags",
    "CountYear,FirstName,LastName,Email,IsPrimary",
    "CountYear,FirstName,LastName",
  ];
  let tcount = 0;
  let table;
  for (let i = 3; i < _data.getRowCount(); i++) {
    let row = _data.getRow(i);
    if (!table) {
      table = new p5.Table();
      //console.log("---");
      let colNames = cleanHeaders[tcount].split(",");
      for (let j = 0; j < colNames.length; j++) {
        //console.log("SET COLUMN:" + colNames[j]);
        table.addColumn(colNames[j]);
      }
      count[order[tcount]] = table;
    } else if (row.arr.join("").indexOf("CountYear") != -1) {
      table = null;
      tcount++;
    } else {
      let r = table.addRow();

      for (let j = 0; j < table.getColumnCount(); j++) {
        r.set(j, row.get(j));
      }

      //If we're in the checklist object, populate the birdmap
      if (tcount == 3) {
        let birdName = row.get(0).split(/\r?\n/)[0];
        let year = row.get(1).split(/\r?\n/)[0].split(" ")[0];
        if (!count.birdMap[birdName]) {
          count.birdMap[birdName] = {};
          count.birdList.push(birdName);
        }
        count.birdMap[birdName][year] = {
          howMany: parseInt(row.get(2)),
          numberByPartyHours: parseFloat(row.get(3)),
        };
        //let
      }
    }
  }

  return count;
}
