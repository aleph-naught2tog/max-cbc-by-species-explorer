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

const COLOR_PALETTE =
  // [
  //   '#fff7fb',
  //   '#ece2f0',
  //   '#d0d1e6',
  //   '#a6bddb',
  //   '#67a9cf',
  //   '#3690c0',
  //   '#02818a',
  //   '#016c59',
  //   '#014636',
  // ];
  [
    '#f7fcfd',
    '#e0ecf4',
    '#bfd3e6',
    '#9ebcda',
    '#8c96c6',
    '#8c6bb1',
    '#88419d',
    '#6e016b',
  ];
  // [
  //   '#80ffdb',
  //   '#72efdd',
  //   '#64dfdf',
  //   '#56cfe1',
  //   '#48bfe3',
  //   '#4ea8de',
  //   '#5390d9',
  //   '#5e60ce',
  //   '#6930c3',
  //   '#7400b8',
  // ];
  // [
  //   '#fbf8cc',
  //   '#fde4cf',
  //   '#ffcfd2',
  //   '#f1c0e8',
  //   '#cfbaf0',
  //   '#a3c4f3',
  //   '#90dbf4',
  //   '#8eecf5',
  //   '#98f5e1',
  //   '#b9fbc0',
  // ];
  // [
  //   '#ea698b',
  //   '#d55d92',
  //   '#c05299',
  //   '#ac46a1',
  //   '#973aa8',
  //   '#822faf',
  //   '#6d23b6',
  //   '#6411ad',
  //   '#571089',
  //   '#47126b',
  // ];
  // [
  //   '#e0b1cb',
  //   '#be95c4',
  //   '#9f86c0',
  //   '#5e548e',
  //   '#231942',
  // ];
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
  console.debug({ nums, maxNum });

  //Draw the graph
  for (let i = startYear; i <= endYear; i++) {
    try {
      let num = countData.birdMap[currentBird][i][chartKey];

      let x = map(i, startYear, endYear, 50, width - 50);
      let y = height - 100;
      let h = -map(num, 0, maxNum, 0, height - 300);

      const colorIndex = floor(
        map(num, 0, maxNum, 0, COLOR_PALETTE.length - 1)
      );

      //The bar
      fill(COLOR_PALETTE[colorIndex]);
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
