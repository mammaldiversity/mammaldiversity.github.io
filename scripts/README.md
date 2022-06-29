contributors:

Jorrit Poelen | https://orcid.org/0000-0003-3138-4118 | https://jhpoelen.nl

[add your name]

# Integration and Transformation Scripts

This folder is used to capture scripts used to transform, or link existing biodiversity data resources to, MDD records.

# building DwC Triples 

Traditionally, the institution code (e.g., USNM), collection code (e.g., "Mammals"), and catalog number are combined to form a DwC triple. These triples help humans to understand the context of a biodiversity data record.

Sometimes, only the institution code (e.g., USNM) and the catalog number are used because the collectionCode is implied (e.g., "Mammals" in context of MDD). This ommission of an explicit mention of the collection code may lead to ambiguous record linking. 

In context of the following script was used to replace USNM [some number] with USNM:Mammals:[some number]:

```bash
cat _data/mdd.csv\
| sed -r 's|(USNM)(\s)([0-9]+)|\1:Mammals:\3|g'\
> mdd-new.csv
# manually verify result 
mv mdd-new.csv mdd.csv 
```

Similar tricks can be used to form explicit dwc triples from institution code / catalog number pairs.

# linking dwc triples to URIs

At time of writing (June, 2022), collection management systems like Smithsonian's EMu, provide web-based landing pages for specimen in their collections. For instance, USNM 142172 refers to USNM:Mammals:142172 which in turn is associated with http://n2t.net/ark:/65665/3f17abf51-a4c7-4e6f-b967-e173a2c558a9 .

The following bash script was used to extract dwc triples and their associated occurrenceIds from a June 2022 copy of the USNM (aka Natural History Museum at Smithsonian) captured using:

```
preston track "https://collections.nmnh.si.edu/ipt/archive.do?r=nmnh_occurrence_archive"
```

with resulting history

```
$ preston history 


```

and provenance logs

```
```

Now, the catalog was transformed into dwc triples and linked to their occurrenceID using [Preston v0.3.9](https://preston.guoda.bio) and [jq](https://stedolan.github.io/jq/):

```
$ preston history\
| tail -n1\
| preston cat\
| preston dwc-stream\
| jq --compact-output -f mdd-filter.jq\
| mlr --ijson --otsvlite cat\
> usnm-ids.tsv
```

with [mdd-filter.jq](mdd-filter.jq) being:

```
# selects from Mammal Catalog
. 
| select(.["http://rs.tdwg.org/dwc/terms/collectionCode"] == "Mammals")
| { "http://www.w3.org/ns/prov#wasDerivedFrom": .["http://www.w3.org/ns/prov#wasDerivedFrom"], "id" : ([.["http://rs.tdwg.org/dwc/terms/institutionCode"],":",.["http://rs.tdwg.org/dwc/terms/collectionCode"], ":", (.["http://rs.tdwg.org/dwc/terms/catalogNumber"] | tostring)] | add), "uri" : .["http://rs.tdwg.org/dwc/terms/occurrenceID"] }
```

This means - get me the provenancec of the last tracked biodiversity dataset (```preston history | tail -n1 | preston cat```), then extract dwc records in a json stream (```preston dwc-stream```), include only records from the ```Mammals``` collection (```jq --compact-output -f mdd-filter.jq```) and convert the result into a tab-separate values file usnm-ids.tsv . 

The first three lines of the usnm-ids.tsv file looked like:

```
$ cat usnm-ids.tsv | head -n3
http://www.w3.org/ns/prov#wasDerivedFrom	id	uri
line:zip:hash://sha256/0095d0c426ad1efc5eaa840070552d0be29ff0603e092d99206a55cc410e0994!/occurrence.txt!/L19	USNM:Mammals:222502.7276448	http://n2t.net/ark:/65665/300004274-7296-4790-b819-d2226ad068ea
line:zip:hash://sha256/0095d0c426ad1efc5eaa840070552d0be29ff0603e092d99206a55cc410e0994!/occurrence.txt!/L40	USNM:Mammals:343412.7054753	http://n2t.net/ark:/65665/300007a46-d759-478f-9b66-8ebc72445a7c
```

and establish a link between dwc triples (e.g., USNM:Mammals:222502.7276448) and an associated URI (e.g., http://n2t.net/ark:/65665/300004274-7296-4790-b819-d2226ad068ea). 


