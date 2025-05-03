/*

Christmas Bird Count Data Formatter

(Requires p5.js)

The data that comes from the Audubon archive for the CBC is in an... interesting format.
It's definitely meant to be looked at and not computed on.

Here we make a function that parses the data into a clean(ish) object:

(I am not responsible for the header names)

{
  name: 'L.I.: Brooklyn',
  code: 'NYBR',
  latLon: {lat: '40.6160370000', lon: '40.6160370000'},
  weather: Table object for weather,
  effort: Table object for count totals,
  orgs: Table object for sponsoring orgs,
  checklist: Table with bird data,
  compilers: Table with compiler info,
  participants: Table with participant info,
  birdMap: a dictionary of bird counts, which can be retrieved by [common name][year], returning an object {howMany:NUM, numberByPartyHours:NUM},
  birdList: an array of bird common names
}

Headers for table objects are as follows:

weather          "CountYear,LowTemp,HighTemp,AMCloud,PMClouds,AMRain,PMRain,AMSnow,PMSnow",
effort           "CountYear,CountDate,NumParticipants,NumHours,NumSpecies",
orgs             "CountYear,SponsoringOrg",
checklist        "CommonName,CountYear,HowMany,NumberByPartyHours,Flags",
compilers        "CountYear,FirstName,LastName,Email,IsPrimary",
participants     "CountYear,FirstName,LastName"


*/

let countData;

//You can use a name here, otherwise it'll pick a random bird
//   bird = "American Crow"

let bird = "Black-capped Chickadee";
let startYear = 1987;
let endYear = 2023;

let birdIndex = 0;

let temps = [];

function setup() {
  createCanvas(windowWidth, windowHeight - 100);
  loadCBCData("CBC_WIMA_1947-2024.csv");
}

function draw() {
  background("#69F7BE");

  if (countData) {
    drawChart();
  }
}

//Chart code
function drawChart() {
  //Title text
  textSize(24);
  fill(255);
  text(countData.name, 50, 50);
  text(bird + " : " + startYear + " - " + endYear, 50, 80);

  //Calculate the max count so we can color that bar orange and size the rest of the bars
  let nums = [];
  for (let i = startYear; i <= endYear; i++) {
    try {
      let num = countData.birdMap[bird][i].howMany;
      if (num != "cw") nums.push(parseInt(num));
    } catch (_e) {}
  }
  let maxNum = max(nums);

  //Draw the graph
  for (let i = startYear; i <= endYear; i++) {
    try {
      let num = countData.birdMap[bird][i].howMany;
      let x = map(i, startYear, endYear, 50, width - 50);
      let y = height - 100;
      let h = -map(num, 0, maxNum, 0, height - 300);
      //The bar
      fill(num == maxNum ? "#FF9900" : 255);
      rect(x, y, 10, h);
      push();

      //The year label
      translate(x, y);
      fill(0);
      rotate(PI / 2);
      textSize(12);
      text(i, 10, 0);
      pop();

      //The count label
      push();
      translate(x, y + h);
      fill(255);
      rotate(-PI / 4);
      textSize(12);
      text(num, 10, 0);
      pop();
    } catch (_e) {}
  }
}

//Data processing code starts here. I'd normally put this in its own .js file for tidiness
