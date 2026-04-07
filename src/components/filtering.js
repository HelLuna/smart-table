import { createComparison, defaultRules } from "../lib/compare.js";

const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
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

  return (data, state, action) => {
    if (action && action.name === "clear") {
      const parentElement = action.parentElement;
      const inputField = parentElement.querySelector("input");

      inputField.value = "";
      state[action.dataset.field] = "";
    }

    return data.filter((row) => compare(row, state));
  };
}
