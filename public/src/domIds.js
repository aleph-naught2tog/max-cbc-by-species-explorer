const DOM_IDS = {
  locationName: 'location_name',
  startYear: 'start_year',
  endYear: 'end_year',
  speciesSelect: 'species_select',
  startYearSelect: 'start_year_select',
  endYearSelect: 'end_year_select',
  graphTypeWrapper: 'graph_type_wrapper'
}

function validateIdPresence() {
  for (const idString of Object.values(DOM_IDS)) {
    if (document.getElementById(idString) === null) {
      throw new Error(`Missing required HTML element with id of <#${idString}>`);
    }
  }
}
