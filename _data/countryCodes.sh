#!/bin/bash
#
# 2024-01-29
#
# Show list of ISO 3166-1 country codes from wikidata.org in CSV format
#
#  example usage:
#	countryCodes.sh > countryCodes.csv
#
# For wikidata query used to generate this list, please see:
#
# https://query.wikidata.org/#%23%20list%20of%20countries%2Fterritories%2Fetc%20and%20their%20associates%20ISO%203166-1%20alpha-3%20codes%0ASELECT%20%3FcountryCode%20%3FcountryName%20%3FcountryId%20%20WHERE%20%7B%0A%0A%20%20%20%20%3FcountryId%20wdt%3AP298%20%3FcountryCode%20.%20%23%20sovereign%20state%0A%20%20%20%20%3FcountryId%20rdfs%3Alabel%20%3FcountryName%20FILTER%20%28lang%28%3FcountryName%29%20%3D%20%22en%22%29.%0A%20%20%0A%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%0A%20%20%20%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22%0A%20%20%20%20%7D%0A%7D%0A
#

curl -H 'accept: text/csv' -L 'https://query.wikidata.org/sparql?query=%23%20list%20of%20countries%2Fterritories%2Fetc%20and%20their%20associates%20ISO%203166-1%20alpha-3%20codes%0ASELECT%20%3FcountryCode%20%3FcountryName%20%3FcountryId%20%20WHERE%20%7B%0A%0A%20%20%20%20%3FcountryId%20wdt%3AP298%20%3FcountryCode%20.%20%23%20sovereign%20state%0A%20%20%20%20%3FcountryId%20rdfs%3Alabel%20%3FcountryName%20FILTER%20%28lang%28%3FcountryName%29%20%3D%20%22en%22%29.%0A%20%20%0A%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%0A%20%20%20%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22%0A%20%20%20%20%7D%0A%7D%0A'
