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
 * @template {keyof HTMLElementTagNameMap} TagName
 * @param {string} id
 * @param {TagName} tagName the element with the given id
 */
function absolutelyGetSpecificElementById(id, tagName) {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Missing element with id <#${id}>`);
  }

  if (element.tagName.toLowerCase() === tagName.toLowerCase()) {
    const typedEl = /** @type {HTMLElementTagNameMap[TagName]} */ (element);
    return typedEl;
  } else {
    throw new Error('unexpected element type');
  }
}

/**
 * @param {P5Element} element
 * @param {string} containerId
 */
function appendElementToDOMContainer(element, containerId) {
  const container = absolutelyGetElementById(containerId);

  container.appendChild(element.elt);
}
