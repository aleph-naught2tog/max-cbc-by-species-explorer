/** @type {CountData} */
let countData;

//You can use a name here, otherwise it'll pick a random bird
let BIRD = 'Black-capped Chickadee';
let START_YEAR = 1987;
let END_YEAR = 2023;

function preload() {
  loadCBCData('/data/CBC_WIMA_1947-2024.csv');
}

function setup() {
  createCanvas(windowWidth, windowHeight - 100);

  console.debug(countData);
}

function draw() {
  background('#69F7BE');

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
  text(BIRD + ' : ' + START_YEAR + ' - ' + END_YEAR, 50, 80);

  //Calculate the max count so we can color that bar orange and size the rest of the bars
  let nums = [];

  for (let i = START_YEAR; i <= END_YEAR; i++) {
    try {
      let num = countData.birdMap[BIRD][i].howMany;
      if (num != 'cw') {
        nums.push(parseInt(num));
      }
    } catch (_e) {}
  }

  let maxNum = max(nums);

  //Draw the graph
  for (let i = START_YEAR; i <= END_YEAR; i++) {
    try {
      let num = countData.birdMap[BIRD][i].howMany;
      let x = map(i, START_YEAR, END_YEAR, 50, width - 50);
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
