#!/bin/bash
#
# Creates a taxon stub page for all taxon ids in _data/mdd.csv
# for implementation of taxon landing pages and their permalinks.
# 
#  e.g., https://www.mammaldiversity.org/taxon/100004
#
# related to https://github.com/mammaldiversity/mammaldiversity.github.io/issues/24
#

set -xe

echo generating taxon page stubs...

cat ../_data/mdd.csv\
 | cut -d ',' -f2\
 | tail -n+2\
 | awk '{ print "echo -e \"---\nlayout: taxon\nid: " $1 "\n---\" > " $1 ".md" }'\
 | bash -s

echo generating taxon page stubs... done.
