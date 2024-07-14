function describeOriginalName(originalNameCombination) {
  var firstName = "";
  if (
    originalNameCombination === null ||
    originalNameCombination.trim() === ""
  ) {
    firstName = "Name is as originally described.";
  } else {
    firstName =
      "<b>Original name as described:</b> "  +
      "<i>" +
      originalNameCombination.replace("_", " ").trim() +
      "</i>";
     
  }
  return firstName;
}

if (typeof module !== 'undefined') {
  module.exports = {
     describeOriginalName: describeOriginalName
  };
}

