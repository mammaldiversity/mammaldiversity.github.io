#!/bin/bash
#
# 2024-01-29
#
# Updates list of ISO 3166-1 country codes as 
# captured in wikidata.org
#
# For wikidata query used to generate this list, please see:
#
# https://query.wikidata.org/#%23Countries%20that%20have%20sitelinks%20to%20en.wiki%0ASELECT%20%3Fcountry%20%3FcountryName%20%3FcountryCode%20WHERE%20%7B%0A%0A%20%20%20%20%3Fcountry%20wdt%3AP297%20%3FcountryCode%20.%20%23%20sovereign%20state%0A%20%20%20%20%3Fcountry%20rdfs%3Alabel%20%3FcountryName%20FILTER%20(lang(%3FcountryName)%20%3D%20%22en%22).%0A%20%20%0A%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%0A%20%20%20%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22%0A%20%20%20%20%7D%0A%7D 
#

curl -H 'accept: text/tab-separated-values' -L 'https://query.wikidata.org/sparql?query=%23Countries%20that%20have%20sitelinks%20to%20en.wiki%0ASELECT%20%3Fcountry%20%3FcountryName%20%3FcountryCode%20WHERE%20%7B%0A%0A%20%20%20%20%3Fcountry%20wdt%3AP297%20%3FcountryCode%20.%20%23%20sovereign%20state%0A%20%20%20%20%3Fcountry%20rdfs%3Alabel%20%3FcountryName%20FILTER%20(lang(%3FcountryName)%20%3D%20%22en%22).%0A%20%20%0A%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%0A%20%20%20%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%22%0A%20%20%20%20%7D%0A%7D' > countryCodes.tsv

