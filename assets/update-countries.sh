#!/bin/bash
#
# Download country geoJSON files from
# GADM https://gadm.org 
# 
#  example:
# 	https://geodata.ucdavis.edu/gadm/gadm4.1/json/gadm41_AFG_0.json
#
#

cat $(dirname $0)/../_data/countryCodes.csv\
 | cut --delimiter ',' -f1\
 | tail -n+2\
 | awk '{ print "-o countries/" $1 ".json https://geodata.ucdavis.edu/gadm/gadm4.1/json/gadm41_" $1 "_0.json" }'\
 | xargs -L1 curl
