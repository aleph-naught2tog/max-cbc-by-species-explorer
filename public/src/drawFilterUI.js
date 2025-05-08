/**
 * @param {P5Dropdown} birdSelect
 * @param {CountData} birdData
 */
function populateBirdSelect(birdSelect, birdData) {
  // TODO: maybe optgroups by family?
  // when unsorted it's by family
  for (const birdName of [...birdData.birdList].sort()) {
    birdSelect.option(birdName);
  }

  birdSelect.selected('Mallard');
}

/**
 * @param {P5Radio} graphTypeRadioGroup
 */
function populateGraphTypeRadios(graphTypeRadioGroup) {
  graphTypeRadioGroup.option('howMany', 'Bird count');
  graphTypeRadioGroup.option('numberByPartyHours', 'By party hours');

  graphTypeRadioGroup.selected('howMany');
}

/**
 * @param {CountData} birdData
 */
function createBirdSelect(birdData) {
  birdRadio = createRadio('bird-species');
  birdRadio.id('species_select');
  birdRadio.addClass('radio-group');
  birdRadio.addClass('bird-species-radios');

  appendElementToDOMContainer(birdRadio, 'species_select_container');
  populateBirdSelect(birdRadio, birdData);
}

function createYearsSelects() {
  yearStartNumberInput = createInput(`${DEFAULT_START_YEAR}`, 'number');
  yearStartNumberInput.id('start_year_select');
  const yearStartNumberInputLabel = createElement('label', 'Start year:');
  yearStartNumberInputLabel.attribute('for', 'start_year_select');

  appendElementToDOMContainer(
    yearStartNumberInputLabel,
    'start_year_select_container'
  );
  appendElementToDOMContainer(
    yearStartNumberInput,
    'start_year_select_container'
  );

  yearEndNumberInput = createInput(`${DEFAULT_END_YEAR}`, 'number');
  yearEndNumberInput.id('year_end_select');
  const yearEndNumberInputLabel = createElement('label', 'End year:');
  yearEndNumberInputLabel.attribute('for', 'year_end_select');

  for (const input of [yearStartNumberInput, yearEndNumberInput]) {
    input.attribute('min', '1900');
    input.attribute('max', '2024');
    input.attribute('required', 'true');
  }

  appendElementToDOMContainer(
    yearEndNumberInputLabel,
    'end_year_select_container'
  );
  appendElementToDOMContainer(yearEndNumberInput, 'end_year_select_container');
}

function createGraphTypeRadios() {
  graphTypeRadioGroup = createRadio('graph-type');
  graphTypeRadioGroup.class('radio-group');
  appendElementToDOMContainer(graphTypeRadioGroup, 'graph_type_container');
  populateGraphTypeRadios(graphTypeRadioGroup);
}

/**
 * @param {string} locationName
 */
function showLocationName(locationName) {
  const id = 'location_name';
  const element = absolutelyGetElementById(id);

  element.innerText = locationName;
}

/**
 * @param {number} startYear
 * @param {number} endYear
 */
function showYearSpan(startYear, endYear) {
  const startId = 'start_year';
  const endId = 'end_year';

  const startYearElement = absolutelyGetElementById(startId);
  const endYearElement = absolutelyGetElementById(endId);

  startYearElement.innerText = startYear.toString();
  endYearElement.innerText = endYear.toString();
}

/**
 * @param {CountData} birdData
 */
function drawFilterUI(birdData) {
  createBirdSelect(birdData);
  createYearsSelects();
  createGraphTypeRadios();
}
