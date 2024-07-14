function describeOriginalName(originalNameCombination) {
  var firstName = "";
  if (
    originalNameCombination === null ||
    originalNameCombination === ""
  ) {
    firstName = "Name is as originally described.";
  } else {
    firstName =
      "<b>Original name as described:</b> "  +
      "<i>" +
      originalNameCombination.split(/[_ ]/).slice(0,2).join(" ") +
      "</i>";
     
  }
  return firstName;
}

if (typeof module !== 'undefined') {
  module.exports = {
     describeOriginalName: describeOriginalName
  };
}

