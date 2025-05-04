function populateBirdSelect(birdSelect, birdData) {
  for (const birdName of [...birdData.birdList].sort()) {
    birdSelect.option(birdName);
  }

  birdSelect.selected('Mallard');
}
function populateYearSelects(yearStartSelect, yearEndSelect, birdData) {
  const years = Object.keys(birdData.birdMap[birdData.birdList[0]]);

  for (const year of years) {
    yearStartSelect.option(year);
    yearEndSelect.option(year);
  }

  yearStartSelect.selected(DEFAULT_START_YEAR.toString());
  yearEndSelect.selected(DEFAULT_END_YEAR.toString());
}

function populateGraphTypeRadios(graphTypeRadioGroup) {
  graphTypeRadioGroup.option('howMany', 'Bird count');
  graphTypeRadioGroup.option('numberByPartyHours', 'By party hours');

  graphTypeRadioGroup.selected('howMany');
}

/**
 * @param {CountData} birdData
 */
function drawFilterUI(birdData) {
  birdSelect = createSelect();
  appendElementToDOMContainer(birdSelect, 'species_select_container');
  populateBirdSelect(birdSelect, birdData);

  ////
  yearStartSelect = createSelect();
  appendElementToDOMContainer(yearStartSelect, 'start_year_select_container');

  yearEndSelect = createSelect();
  appendElementToDOMContainer(yearEndSelect, 'end_year_select_container');
  populateYearSelects(yearStartSelect, yearEndSelect, birdData);

  ////
  graphTypeRadioGroup = createRadio('graph-type');
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
