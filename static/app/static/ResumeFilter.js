/**
 * Applies the user defined filters to resumes.
 * @param {Array} The list of filters.
 * @param {Array} The list of applicants.
 * @return {Array} The array of filtered applicants.
 */
export function applyResumeFilter(filters, applicants) {
  let filterNames = Object.keys(filters);

  if (filters.length === 0) {
    return applicants;
  }

  return applicants.filter(applicant => (
    Object.values(filters)
    .every((filter, filterIndex) => {
      let filterName = filterNames[filterIndex];
      let optionNames = Object.keys(filter.options);

      // Only use enabled filters
      if (!filter.enabled || Object.keys(filter.options).length === 0) {
        return true;
      }

      return Object.values(filter.options)
      .some((option, optionIndex) => {
        // Ignore the filter if it's disabled
        if (!option) {
          return false;
        }

        return applicant[filterName].toLowerCase() ===
          optionNames[optionIndex].toLowerCase();
      });
    })
  ));
}
