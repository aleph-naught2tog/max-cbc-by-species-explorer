/** @type {CountData} */
let countData;

//You can use a name here, otherwise it'll pick a random bird
let DEFAULT_START_YEAR = 1950;
let DEFAULT_END_YEAR = 2023;

/** @type {P5Dropdown} */
let birdRadio;

/** @type {P5InputElement} */
let yearStartNumberInput;

/** @type {P5InputElement} */
let yearEndNumberInput;

/** @type {P5InputElement} */
let birdSearch;

/** @type {P5Radio} */
let graphTypeRadioGroup;

function preload() {
  loadCBCData('/data/CBC_WIMA_1901-2024.csv');
}

function setup() {

  const canvasElement = absolutelyGetSpecificElementById(
    'p5_canvas_target',
    'canvas'
  );

  const wrapper = canvasElement.parentElement;
  if (!wrapper) {
    throw new Error('no canvas parent');
  }

  const { width: rectWidth, height: rectHeight } =
    wrapper.getBoundingClientRect();

  createCanvas(rectWidth, rectHeight, canvasElement);

}

function draw() {
  background('lemonchiffon');
  renderFilterUI(countData);

  if (countData) {
    drawChart();
  }
}

function validateSelects() {
  const yearStartAsInt = int(yearStartNumberInput.value());
  const yearEndAsInt = int(yearEndNumberInput.value());

  if (yearEndAsInt < yearStartAsInt) {
    throw new Error('Ending year must be before or equal to starting year.');
  }
}

//Chart code
function drawChart() {
  validateSelects();
  showLocationName(countData.name);

  const startYear = int(yearStartNumberInput.value());
  const endYear = int(yearEndNumberInput.value());

  const currentBird = birdRadio.value();

  const chartKey = /** @type {CountDatumKey} */ (graphTypeRadioGroup.value());

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
