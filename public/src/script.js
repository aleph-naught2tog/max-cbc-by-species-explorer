/** @type {CountData} */
let countData;

//You can use a name here, otherwise it'll pick a random bird
let DEFAULT_START_YEAR = 1987;
let DEFAULT_END_YEAR = 2023;

/** @type {P5Dropdown} */
let birdSelect;

/** @type {P5Dropdown} */
let yearStartSelect;

/** @type {P5Dropdown} */
let yearEndSelect;

/** @type {P5Radio} */
let chartStyleRadioGroup;

function preload() {
  loadCBCData('/data/CBC_WIMA_1947-2024.csv');
}

function setup() {
  createCanvas(windowWidth, windowHeight - 100);

  drawSelects(countData);
}

function draw() {
  background('#69F7BE');

  if (countData) {
    drawChart();
  }
}

/**
 * @param {CountData} birdData
 */
function drawSelects(birdData) {
  birdSelect = createSelect();

  for (const birdName of [...birdData.birdList].sort()) {
    birdSelect.option(birdName);
  }

  ////
  yearStartSelect = createSelect();
  yearEndSelect = createSelect();

  const years = Object.keys(birdData.birdMap[birdData.birdList[0]]);

  for (const year of years) {
    yearStartSelect.option(year);
    yearEndSelect.option(year);
  }

  yearStartSelect.selected(DEFAULT_START_YEAR.toString());
  yearEndSelect.selected(DEFAULT_END_YEAR.toString());
  ////

  chartStyleRadioGroup = createRadio('chart-style');
  chartStyleRadioGroup.option('howMany', 'Bird count');
  chartStyleRadioGroup.option('numberByPartyHours', 'By party hours');

  chartStyleRadioGroup.selected('howMany');
}

function validateSelects() {
  const yearStartAsInt = int(yearStartSelect.selected());
  const yearEndAsInt = int(yearEndSelect.selected());

  if (yearEndAsInt < yearStartAsInt) {
    throw new Error('Ending year must be before or equal to starting year.');
  }
}

//Chart code
function drawChart() {
  validateSelects();

  const currentBird = birdSelect.value();
  const startYear = int(yearStartSelect.value());
  const endYear = int(yearEndSelect.value());

  const chartKey = /** @type {CountDatumKey} */ (
    chartStyleRadioGroup.value()
  );

  console.debug({ chartKey })

  //Title text
  textSize(24);
  fill(255);
  text(countData.name, 50, 50);
  text(currentBird + ' : ' + startYear + ' - ' + endYear, 50, 80);

  //Calculate the max count so we can color that bar orange and size the rest of the bars
  /** @type {number[]} */
  let nums = [];

  for (let i = startYear; i <= endYear; i++) {
    try {
      let num = countData.birdMap[currentBird][i][chartKey];
      if (!isNaN(num)) {
        nums.push(num);
      }
    } catch (_e) {}
  }

  let maxNum = max(nums);

  //Draw the graph
  for (let i = startYear; i <= endYear; i++) {
    try {
      let num = countData.birdMap[currentBird][i][chartKey];

      let x = map(i, startYear, endYear, 50, width - 50);
      let y = height - 100;
      let h = -map(num, 0, maxNum, 0, height - 300);

      //The bar
      fill(num == maxNum ? '#FF9900' : 255);
      rect(x, y, 10, h);
      push();

      //The year label
      translate(x, y);
      fill(0);
      rotate(PI / 2);
      textSize(12);
      text(i, 10, 0);
      pop();

      if (isNaN(num)) {
        continue;
      }

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
