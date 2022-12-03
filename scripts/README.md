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
<urn:uuid:0659a54f-b713-4f86-a917-5be166a14110> <http://purl.org/pav/hasVersion> <hash://sha256/d14121639b249e537f4d8248f09d7e56ced549ecc88e72ac59878dd197f4cceb> .
```

and provenance logs

```
$ preston cat hash://sha256/d14121639b249e537f4d8248f09d7e56ced549ecc88e72ac59878dd197f4cceb
<https://preston.guoda.bio> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/ns/prov#SoftwareAgent> <urn:uuid:33ebae64-ac95-4410-bd8a-4a543fd2373c> .
<https://preston.guoda.bio> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/ns/prov#Agent> <urn:uuid:33ebae64-ac95-4410-bd8a-4a543fd2373c> .
<https://preston.guoda.bio> <http://purl.org/dc/terms/description> "Preston is a software program that finds, archives and provides access to biodiversity datasets."@en <urn:uuid:33ebae64-ac95-4410-bd8a-4a543fd2373c> .
<urn:uuid:33ebae64-ac95-4410-bd8a-4a543fd2373c> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/ns/prov#Activity> <urn:uuid:33ebae64-ac95-4410-bd8a-4a543fd2373c> .
<urn:uuid:33ebae64-ac95-4410-bd8a-4a543fd2373c> <http://purl.org/dc/terms/description> "A crawl event that discovers biodiversity archives."@en <urn:uuid:33ebae64-ac95-4410-bd8a-4a543fd2373c> .
<urn:uuid:33ebae64-ac95-4410-bd8a-4a543fd2373c> <http://www.w3.org/ns/prov#startedAtTime> "2022-06-29T20:28:23.012Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> <urn:uuid:33ebae64-ac95-4410-bd8a-4a543fd2373c> .
<urn:uuid:33ebae64-ac95-4410-bd8a-4a543fd2373c> <http://www.w3.org/ns/prov#wasStartedBy> <https://preston.guoda.bio> <urn:uuid:33ebae64-ac95-4410-bd8a-4a543fd2373c> .
<https://doi.org/10.5281/zenodo.1410543> <http://www.w3.org/ns/prov#usedBy> <urn:uuid:33ebae64-ac95-4410-bd8a-4a543fd2373c> <urn:uuid:33ebae64-ac95-4410-bd8a-4a543fd2373c> .
<https://doi.org/10.5281/zenodo.1410543> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/dc/dcmitype/Software> <urn:uuid:33ebae64-ac95-4410-bd8a-4a543fd2373c> .
<https://doi.org/10.5281/zenodo.1410543> <http://purl.org/dc/terms/bibliographicCitation> "Jorrit Poelen, Icaro Alzuru, & Michael Elliott. 2021. Preston: a biodiversity dataset tracker (Version 0.3.9) [Software]. Zenodo. http://doi.org/10.5281/zenodo.1410543"@en <urn:uuid:33ebae64-ac95-4410-bd8a-4a543fd2373c> .
<urn:uuid:0659a54f-b713-4f86-a917-5be166a14110> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/ns/prov#Entity> <urn:uuid:33ebae64-ac95-4410-bd8a-4a543fd2373c> .
<urn:uuid:0659a54f-b713-4f86-a917-5be166a14110> <http://purl.org/dc/terms/description> "A biodiversity dataset graph archive."@en <urn:uuid:33ebae64-ac95-4410-bd8a-4a543fd2373c> .
<hash://sha256/0095d0c426ad1efc5eaa840070552d0be29ff0603e092d99206a55cc410e0994> <http://www.w3.org/ns/prov#wasGeneratedBy> <urn:uuid:077fcceb-5e3b-426b-9b04-7f42f81b4254> <urn:uuid:077fcceb-5e3b-426b-9b04-7f42f81b4254> .
<hash://sha256/0095d0c426ad1efc5eaa840070552d0be29ff0603e092d99206a55cc410e0994> <http://www.w3.org/ns/prov#qualifiedGeneration> <urn:uuid:077fcceb-5e3b-426b-9b04-7f42f81b4254> <urn:uuid:077fcceb-5e3b-426b-9b04-7f42f81b4254> .
<urn:uuid:077fcceb-5e3b-426b-9b04-7f42f81b4254> <http://www.w3.org/ns/prov#generatedAtTime> "2022-06-29T20:47:34.578Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> <urn:uuid:077fcceb-5e3b-426b-9b04-7f42f81b4254> .
<urn:uuid:077fcceb-5e3b-426b-9b04-7f42f81b4254> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/ns/prov#Generation> <urn:uuid:077fcceb-5e3b-426b-9b04-7f42f81b4254> .
<urn:uuid:077fcceb-5e3b-426b-9b04-7f42f81b4254> <http://www.w3.org/ns/prov#wasInformedBy> <urn:uuid:33ebae64-ac95-4410-bd8a-4a543fd2373c> <urn:uuid:077fcceb-5e3b-426b-9b04-7f42f81b4254> .
<urn:uuid:077fcceb-5e3b-426b-9b04-7f42f81b4254> <http://www.w3.org/ns/prov#used> <https://collections.nmnh.si.edu/ipt/archive.do?r=nmnh_occurrence_archive> <urn:uuid:077fcceb-5e3b-426b-9b04-7f42f81b4254> .
<https://collections.nmnh.si.edu/ipt/archive.do?r=nmnh_occurrence_archive> <http://purl.org/pav/hasVersion> <hash://sha256/0095d0c426ad1efc5eaa840070552d0be29ff0603e092d99206a55cc410e0994> <urn:uuid:077fcceb-5e3b-426b-9b04-7f42f81b4254> .
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

Now, attempt to associate USNM dwc triples with their identifiers:


```
cat ../_data/mdd.csv\
| mlr --csv cut -f holotypeVoucher\
| nomer append translate-names --properties translate.properties\
head
```

2022-06-29 Note that the usnm-ids.tsv contained duplicate/ambiguous mappings (e.g., repetition of dwc triples) causing nomer to understandably choke by indicating that the entry was already mapped. 
