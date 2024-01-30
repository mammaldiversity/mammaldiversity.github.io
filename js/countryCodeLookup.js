---
---

var countryCodeLookup = { "{{ site.data.countryCodes.first.countryName }}":  {{ site.data.countryCodes.first | jsonify }} 
{%- for countryCode in site.data.countryCodes offset: 1 -%}
 , "{{ countryCode.countryName }}": {{ countryCode | jsonify }} 
{%- endfor -%}
};

function addCodeForCountryName(countryName) {
  var name = countryName === undefined || countryName.trim();
  var code = countryCodeLookup[name] === undefined ? undefined : countryCodeLookup[name].countryCode;
  return code === undefined ? { name: countryName } : { name: countryName, code: code };
};

function formatCountryAndCode(country) {
  return country.code === undefined ? country.name : (country.name + " (" + country.code + ")");
}

