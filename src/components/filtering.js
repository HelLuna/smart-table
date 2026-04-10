export function initFiltering(elements) {
  const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach((elName) => {
      elements[elName].append(
        ...Object.values(indexes[elName]).map((name) => {
          const option = document.createElement("option");
          option.value = name;
          option.textContent = name;
          return option;
        }),
      );
    });
  };

  const applyFiltering = (query, state, action) => {
    if (action && action.name === "clear") {
      const parentElement = action.parentElement;
      const inputField = parentElement.querySelector("input");

      inputField.value = "";
      state[action.dataset.field] = "";
    }

    const filter = {};
    Object.keys(elements).forEach((key) => {
      if (elements[key]) {
        if (["INPUT", "SELECT"].includes(elements[key].tagName) && elements[key].value) {
          filter[`filter[${elements[key].name}]`] = elements[key].value;
        }
      }
    });

    return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
  };

  return { updateIndexes, applyFiltering };
}
