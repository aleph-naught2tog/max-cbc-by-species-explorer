/**
 * @param {string} id
 * @returns {HTMLElement} the element with the given id
 */
function absolutelyGetElementById(id) {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Missing element with id <#${id}>`);
  }

  return element;
}

/**
 * @param {P5Element} element
 * @param {string} containerId
 */
function appendElementToDOMContainer(element, containerId) {
  const container = absolutelyGetElementById(containerId);

  container.appendChild(element.elt);
}
