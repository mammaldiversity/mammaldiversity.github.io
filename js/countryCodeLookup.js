---
---

var countryCodeLookup = { "{{ site.data.countryCodes.first.countryName }}":  {{ site.data.countryCodes.first | jsonify }} 
{%- for countryCode in site.data.countryCodes offset: 1 -%}
 , "{{ countryCode.countryName }}": {{ countryCode | jsonify }} 
{%- endfor -%}
};

function codeForCountry(countryName) {
  var name = countryName === undefined || countryName.trim();
  var code = countryCodeLookup[name] === undefined ? undefined : countryCodeLookup[name].countryCode;
  return code === undefined ? "" : (" (" + code + ")");
};

