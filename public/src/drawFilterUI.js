/**
 * @param {CountData} birdData
 */
function renderBirdSelect(birdData) {
  if (!birdSearch) {
    birdSearch = createInput();
    birdSearch.id('species_search');

    appendElementToDOMContainer(birdSearch, 'search_input_wrapper');
  }

  const firstTime = !birdRadio;
  if (firstTime) {
    birdRadio = createRadio('bird-species');
    birdRadio.id('species_select');
    birdRadio.addClass('radio-group');
    birdRadio.addClass('bird-species-radios');

    appendElementToDOMContainer(birdRadio, 'species_select_container');
  }

  populateBirdSelect(
    birdRadio,
    birdData.birdList,
    firstTime,
    birdSearch.value()
  );
}

/**
 * @param {P5Dropdown} birdSelect
 * @param {string[]} birdList
 * @param {boolean} firstTime
 * @param {string} searchValue
 */
function populateBirdSelect(birdSelect, birdList, firstTime, searchValue) {
  console.debug({ birdList, l: birdList.length, searchValue });
  // TODO: maybe optgroups by family?
  // when unsorted it's by family
  if (firstTime) {
    for (const birdName of birdList.sort()) {
      birdSelect.option(birdName);
    }
  }

  // TODO: reset when empty
  if (searchValue) {
    const options = birdSelect.elt.querySelectorAll('label');
    console.debug({ birdSelect })
    console.debug({options}, 'exists')
    for (const opt of options) {
      console.debug({opt})
      opt.style.display = '';
      if (opt.innerText.toLowerCase().startsWith(searchValue.toLowerCase())) {
        console.debug('matches');
        opt.style.display = '';
      } else {
        opt.style.display = 'none';
      }
    }
  }

  if (!birdSelect.selected()) {
    birdSelect.selected('Mallard');
  }
}

/**
 * @param {P5Radio} graphTypeRadioGroup
 */
function populateGraphTypeRadios(graphTypeRadioGroup) {
  graphTypeRadioGroup.option('howMany', 'Bird count');
  graphTypeRadioGroup.option('numberByPartyHours', 'By party hours');

  if (!graphTypeRadioGroup.selected()) {
    graphTypeRadioGroup.selected('howMany');
  }
}

function renderYearInputs() {
  if (!yearStartNumberInput && !yearEndNumberInput) {
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
    appendElementToDOMContainer(
      yearEndNumberInput,
      'end_year_select_container'
    );
  }
}

function renderGraphTypeRadios() {
  if (!graphTypeRadioGroup) {
    graphTypeRadioGroup = createRadio('graph-type');
    graphTypeRadioGroup.class('radio-group');
    appendElementToDOMContainer(graphTypeRadioGroup, 'graph_type_container');
  }

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
 * @param {CountData} birdData
 */
function renderFilterUI(birdData) {
  renderBirdSelect(birdData);
  renderYearInputs();
  renderGraphTypeRadios();
}
