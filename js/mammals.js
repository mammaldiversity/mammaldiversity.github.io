var MDDfile  = "assets/data/mdd.csv"; // from github
//MDDfile      = "assets/data/MDD_v1.31_6513species.csv"; // version 1.31 (utf encoded)
//MDDfile      = "assets/data/MDD_v1.31_6513species-utf.csv"; // problem with char coding
var MSW3file = "assets/data/msw3-all.csv";   // original downloaded file
MSW3file     = "assets/data/msw3-sorted.csv";   // sorted on DisplayOrder (fixes subgenera; added parvorders)
MSW3file     = "assets/data/msw3-sorted-utf.csv";   // sorted on DisplayOrder (fixes subgenera)

var MSW3 = {};  // can we use this as a global and avoid the Papa.parse() calls
var MDD  = {};
//MSW3.classification = {  classes: {}, infraclasses: {}, parvclasses: {}, orders: {}, families: {}, genera: {}, species: {}, subspecies: {}  };
MSW3.classification = {  classList: {}, orderList: {}, suborderList: {}, infraorderList: {}, parvorderList: {}, superfamilyList: {}, familyList: {}, subfamilyList: {}, tribeList: {}, genusList: {}, subgenusList: {}, speciesList: {}, subspeciesList: {}  };
MDD.classification = {  classList: {}, majorTypeList: {}, majorSubtypeList: {}, orderList: {}, suborderList: {}, infraorderList: {}, parvorderList: {}, superfamilyList: {}, familyList: {}, subfamilyList: {}, tribeList: {}, genusList: {}, specificEpithetList: {} };
//MSW3.ranks = [ "ORDER", "SUBORDER", "INFRAORDER", "SUPERFAMILY", "FAMILY", "SUBFAMILY", "TRIBE", "GENUS", "SUBGENUS", "SPECIES", "SUBSPECIES" ]; //rank hierarchy for getParentRankMSW3()
 //(MSW3) columns: ID	Order	Suborder	Infraorder	Superfamily	Family	Subfamily	Tribe	Genus	Subgenus	Species	Subspecies	TaxonLevel	Extinct?	OriginalName	ValidName	Author	Date	ActualDate	CitationName	CitationVolume	CitationIssue	CitationPages	CitationType	TypeSpecies	CommonName	TypeLocality	Distribution	Status	Synonyms	Comments	File	SortOrder	DisplayOrder

function createMSW3OrderList(event) {
     
   Papa.parse(MSW3file, {
      header: true,
      delimiter: ",",
      download: true,
         error: function(err, file, inputElem, reason) { console.log("Error in papa.parse"); },
         complete: function(results) {
         
         //console.log(results); // error: line 13582: Object { type: "FieldMismatch", code: "TooFewFields", message: "Too few fields: expected 34 fields but parsed 1", row: 13582, type: "FieldMismatch", …}
                               // fixed (in Chrome?) by deleting newline at end of file (cached in Firefox still?)
         //alert (results.data[0].ID + ": " + results.data[0].TaxonLevel + " " + results.data[0].Order);   // row 2, first data line
         // alert (results.data[13581].Genus + ": " + results.data[13581].Genus + " " + results.data[13581].Species);  // data on last row (row 13583, Ziphius cavirostris) {unsorted file)
         //alert (results.data[13583].Genus + ": " + results.data[13583].Genus + " " + results.data[13583].Species);  // data on last row (row 13585, Ziphius cavirostris) [sorted file]
         
         var numberRows = results.data.length;
         if (results.data[results.data.length-1].ID == "" ) {// incomplete row at end of file due to extra line feed (first column ID)
           numberRows = results.data.length -1;
         }
         MSW3.data = results.data; // use global for results
         console.log(MSW3);
         
         var taxonID = "MSW3_MAMMALIA";
         
         var output = '<ul><li id="'+taxonID+'"><a href="https://www.departments.bucknell.edu/biology/resources/msw3/browse.asp"><b>Mammalia</b></a> (MSW3)</li>'
         $('#content-MSW3').html(output);
         
         MSW3.classification.classList[taxonID] = [ "", 0, numberRows ] ;  // the whole span of loaded data   
         getChildrenMSW3(taxonID,"order","class","MSW3"); // (taxonID,rank,datatype,db) // datatype is for compatibility with other taxon trees; here used for parent rank
      }
   });
} 

//(MDD) columns: sciName	id	phylosort	mainCommonName	otherCommonNames	majorType	majorSubtype	order	suborder	infraorder	parvorder	superfamily	family	subfamily	tribe	genus	specificEpithet	authoritySpeciesAuthor	authoritySpeciesYear	authorityParentheses	originalNameCombination	authoritySpeciesCitation	authoritySpeciesLink	holotypeVoucher	typeLocality	nominalNames	taxonomyNotes	taxonomyNotesCitation	biogeographicRealm	countryDistribution	iucnStatus	extinct	domestic	flagged	CMW_sciName	diffSinceCMW	MSW3_matchtype	MSW3_sciName	diffSinceMSW3

function createMDDOrderList(event) {
    
   Papa.parse(MDDfile, {
      header: true,
      delimiter: ",",
      download: true,
      error: function(err, file, inputElem, reason) { console.log("Error in papa.parse"); },
      complete: function(results) {
            
         //console.log(results);

         //alert(results.data.length); // = 6513 (last row is 6514) TODO explain difference with MSW3 file (which has an extra blank row)
         //alert (results.data[6512].genus + " " + results.data[6512].specificEpithet);  // data on last row (row 6514)
         //alert (results.data[5829].genus + " " + results.data[5829].specificEpithet);  // data on first row of Carnivora (row 6830, Ailurus_fulgens)
         //alert (results.data[6137].genus + " " + results.data[6137].specificEpithet);  // data on last row of Carnovora (row 6138, Viverricula_indica)

         var numberRows = results.data.length;
         if (results.data[results.data.length-1].sciName == "" ) {// incomplete row at end of file due to extra line feed (first column sciName)
           numberRows = results.data.length -1;
           //alert (numberRows + "|" + results.data.length);
         }
         MDD.data = results.data; //place in global
         console.log(MDD);
         var taxonID = "MDD_MAMMALIA";
         
         var output = '<ul><li id="'+taxonID+'"><a href="https://www.mammaldiversity.org/taxa.html"><b>Mammalia</b></a> (MDD)</li>'; // REMEMBER remove  the url
         $('#content-MDD').html(output);
         
         MDD.classification.classList[taxonID] = [ "", 0, numberRows ] ;  // the whole span of loaded data   
         console.log(MDD.classification);
         getChildrenMDD(taxonID,"order","class","MDD"); // (taxonID,rank,datatype,db) // datatype is for compatibility with other taxon trees; here used for parent rank

         
      }
   });

} 
function onChangeOrderList(event,db){
  
  console.log(event);
   //if (event.target.getAttribute("id") == "checkMDD")
  console.log(event.target.getAttribute("id"));
  console.log(event.target.checked);
  //if (event.target.checked) {
  if ( event.target.getAttribute("id") == "check-MDD" ){
     if (event.target.checked) createMDDOrderList(); else  $('#content-MDD').html("");
  } 
  if ( event.target.getAttribute("id") == "check-MSW3" ){
     if (event.target.checked) createMSW3OrderList(); else  $('#content-MSW3').html("");
  } 
  if ( event.target.getAttribute("id") == "check-details" ){
     if (event.target.checked) $('#content-details').css("display","block"); else  $('#content-details').css("display","none"); 
  } 
}
function resetOrderLists()
{
   $('#content-MDD').html("");
   $('#content-MSW3').html("");
   $('#content-details').html("");
}


function getParentRankMSW3(taxonID,rank)  //not needed
{
      switch (rank) {
            //case "infraclass": parent = MSW3classification.classes;       break;
            //case "parvclass":  parent = MSW3classification.infraclasses;  break;
            case "order":      parent = "classes";        break;
            case "family":     parent = "orders";         break;
            case "genus":      parent = "families";       break;
            case "species":    parent = MSW3.classification.genera;           break;
            case "subspecies": parent = MSW3.classification.species;         break;
      }
      return parent;
}
  
function getChildrenMSW3(taxonID,rank,parentRank,db)  
{
   var scientificName = "";
   var output = "";
   var  rowCount = 0
   var extras = "";            // for extra information to be displayed after the taxon name (e.g. common name)
   var extinct = "";      // flag for extinction
   var regionClasses = "";
   var parent;
   var children;
   var childRank;
   var currentTaxon;
   var childCount = 0;
   
   console.log(taxonID);
   
      parent = MSW3.classification[parentRank+'List'];
      children = MSW3.classification[rank+'List'];
      
      //rowCount=parent[taxonID][1];
      $('#'+taxonID).append('<ul></ul>');  // add empty ul elements to taxon span (we assume there is content at this stage
      
      //TOTO count and region initialisations to go here
      
      var orders = [];
         //var orderTable = document.getElementById("orderTable")     ;
      var i=0;
      for (i=parent[taxonID][1]; i<parent[taxonID][2] ;i++) {              //iterate through the rows
      
         // rowCount += 1; 
          
         var rowRank = MSW3.data[i].TaxonLevel.toLowerCase() ;                 // get rank of row and convert to lowercase // TODO throwing error for undefined MSW3.data[i].TaxonLevel (still runs
         
         //species count stuff here
         
         if (rowRank == rank) {                                                 //if current row has the required rank (i.e. we have the next taxon of that rank)
         
            if (currentTaxon)  {                                                // finish dealing with previous order. Could just use if i != parent[id][1]
               children[currentTaxon][2] = i; //rowCount-1;
               currentTaxon = false;
            }
            else {
               if  (rank == "subspecies") {
                     //var synonyms =  parseSynonymsMSW3(MSW3.data, parent[taxonID][1], i); // call here and use for each subspecies
                     var parentTaxonStartRow = parent[taxonID][1];
                     var synonyms =  parseSynonymsMSW3(MSW3.data, parentTaxonStartRow, i); // call here and use for each subspecies
                     console.log(synonyms);
                     // 
               }
               
            }
            
            childCount +=1
            //counter[rank] += 1; // needs declaring
            // speciess counter and filter content by continent here
            
            //alert(firstToUpper(rank));

            scientificName = MSW3.data[i][firstToUpper(rank)]  ;                            // get scientific name
            currentTaxon =  "MSW3_" + scientificName + "_" + rank;                          // set current taxon id (Add rank to disambiguate genus and nominate subgenera
            switch (rank) {
               case "subspecies": scientificName = MSW3.data[i]["Species"] + " " + scientificName;
               case "species": scientificName = MSW3.data[i]["Genus"] + " " + scientificName;  //make species combination
               //TODO: add subgenus to the name (requires special italics handling)
            }
            switch (rank) {
               case "genus": case "subgenus": case "species": case "subspecies": scientificName = '<i>' +scientificName +'</i>';  //add italics for genus, species, subspecies
            }
            //alert('"'+scientificName+'"');
           switch (rank) {                                                 
                case "class": break
                default:
                  scientificName = '<a href="https://www.departments.bucknell.edu/biology/resources/msw3/browse.asp?id=' + MSW3.data[i]["ID"] +'" >' + scientificName + '</a>'; 
            }
            
            children[currentTaxon] = [ "", i, 0 ] ;
            
            // handle extras: authority, common name, synonyms, 
            extinct = "";
            extras = "";   // TODO? getExtrasMSW3 (parentTaxonID, rank, parentRank
            
            if  (rank == "species" || rank == "subspecies" )  { // only use for species and subspecies; at least one genus with extant species is marked extinct
               if ( MSW3.data[i]['Extinct?'] == "TRUE" ) extinct = '†';
            }
            if ( MSW3.data[i].CommonName ) extras += ' (' + MSW3.data[i].CommonName + ')'; 
            
            // handle synonyms
            if  (rank == "species") {
               if ( findGetParameter("synonyms") &&  MSW3.data[i].Synonyms != "" ) {
                  if (MSW3.data[i+1].TaxonLevel != "SUBSPECIES" || findGetParameter("synonyms-all")  ) {
                     extras += ' [synonyms: ' + MSW3.data[i].Synonyms + ']';
                  } 
                  else extras += ' [synonyms: see subspecies]';
               }
            }
            if  (rank == "subspecies") {
               if ( findGetParameter("synonyms") && synonyms[ i - parent[taxonID][1] -1] != "") 
                  extras += ' [synonyms: ' + synonyms[ i - parent[taxonID][1] -1] + ']';
            }
            
            switch (rank) {           
               case "subspecies": output = '<li class="' + rank + '"><span class="no-children">' + extinct + scientificName + extras + '</span></li>';  
                                  break;
               case "species":    if ( !MSW3.data[i+1] || MSW3.data[i+1].TaxonLevel != "SUBSPECIES" ) {                       // if no subspecies greyed out inactive bullet
                                    output = '<li class="' + rank + regionClasses + '"><span class="no_spp species" id="' + currentTaxon + '">'
                                           + '<span style="color:#dddddd;">&#8862; </span>' +  extinct +scientificName +extras + '</span></li>';  
                                    break;
                                 } // else use default 
               default:                
                                    output = '<li class="' + rank + regionClasses + '"><span class="new-li ' + rank +'" id="' + currentTaxon + '">' + extinct + scientificName + extras + '</span></li>';  
            }
            //output='<li>'+orders[i]+'</li>';
            $('#'+taxonID+' ul').append(output);             // append latest <li> to <ul> block

            if (MSW3.data[i+1] && MSW3.data[i+1].TaxonLevel)                                     // catch end of file (no need to set value of childRank then
               childRank = MSW3.data[i+1].TaxonLevel.toLowerCase(); 
            //if (childRank=="subgenus") childRank="species";     //ignore subgenera. For some reason subgenera are listed together after the genus and before species content (e.g. Mus). Needs sorting.
            
            addInteractivity(currentTaxon, childRank, rank, db);              // add interactive load/collapse/expand functions for the order


         } // end rowRank=rank
       
       
      } //end main loop through taxon
      if (currentTaxon)  { 
                  children[currentTaxon][2] = i; //rowCount;
                 
      }
      //addLinks(children,rank);  // add links to <a class="linkIOC">       // add link directly as we have the ID
      
      console.log(children[currentTaxon]);
      console.log(children);
    
}
// -----------GET SPECIES AND SUBSPECIES SYNONYMS --------------------------function for MSW3

            // issues: 
            //  1) most subspecies entries have <b><i> ... </i></b>
            //        249 have <i> <b> ... </b></i> which leaves the italics set fro subsequent entries
            //  2) empty <b> </b> causes subspecies mismatch  e.g. Tachyglossus aculeatus 
            //     empty <b><i> </i></b> in Cervus elaphus
            //  3) unformated subspecies at end of Canus lupus
            //     TODO, parse on subspecies names current_subspecies(...)next_subspecies
            //           then could split on ";", strip formating and italicise first word

function parseSynonymsMSW3(data, speciesRow, subspeciesRow2)
{
   //
   //alert(typeof(key)); // key is string (surprisingly)
   var currentSubspecies = "";
   var nextSubspecies = "";
   var currentSubspecies = "";
   var currentAuthority = "";
   var result;
   var regex;
   
   var synonyms =[];
   var synonymsText = data[speciesRow]['Synonyms'].replace(/<\/?[ib]>/g, "");  // get synonyms from species row and remove formatting (bold/italics) tags
  
   var subspeciesIndex=0;
   var subspeciesRow =  speciesRow+1; //parseInt(key); // its an integer here unlike local database
  // var i=0;
  // var next = j+1; //String(j+1)
   while (data[subspeciesRow] && data[subspeciesRow]['TaxonLevel'] == "SUBSPECIES") {
      
      currentSubspecies = data[subspeciesRow]['Subspecies'];                                                                     // this is the current subspecies name 
      currentAuthority = data[subspeciesRow]['Author'].replace(/<\/?[ib]>/g, "");                                                                          // need authority in case homonyms(?) with different authors
      currentDate = data[subspeciesRow]['Date'];

      subspeciesRow += 1;
      if (data[subspeciesRow] && data[subspeciesRow]['TaxonLevel'] == "SUBSPECIES") {
         nextSubspecies = data[subspeciesRow]['Subspecies'];                                                                      // this is the next subspecies name.
      }  
      else {
          nextSubspecies = '$' ;                                                                                          // to capture until end of string rather than next subspecies
      }   
      
      if (subspeciesIndex==0) {                                                                                                        // if the nominate subspecies       
         regex = new RegExp( '(^.*?)' + nextSubspecies, "");                                                             // regex to capture text up to first subspecies
      } else {
         
         regex = new RegExp( '(' + currentSubspecies + '[\s<>ib\/\( ]*'+ currentAuthority + '.*?)' + nextSubspecies, "");  // regex to capture text between subspecies in synonym list 
      } 
      
      result = synonymsText.match(regex);
 
      if (result == null || !result[1] ) {
         synonyms[subspeciesIndex]  = "";
      }
      else {
         var parsedResult = result[1]; 
         if (subspeciesIndex==0) parsedResult = currentSubspecies + ' ' + currentAuthority + ', ' + currentDate + '; ' + parsedResult; //prepend nominate subspecies name with authority
         synonyms[subspeciesIndex] = italiciseName(parsedResult, 1); // italicise the subspecies names (first word before authority) [start = 1 to skip the subspecies name before the synonyms)
       }
      subspeciesIndex += 1;
   } 
   
   synonyms['text'] = ""; //data[key]['Synonyms']; //  unproccessed entry; needed for monotypic
   synonyms['count'] = subspeciesIndex; // actually is number of subspecies

   return synonyms;
}
function italiciseName(parsedResult, start, sep)    // italicise the subspecies names (first word before authority)
{   
   var outputNames = "";
   var formattedName = "";
   
   var namesArray = parsedResult.split(sep)                  // split names list on ";)
 
   var j=0;          
   for (j=start; j<namesArray.length; j++) {              // note j=0 shows the subspecies name in the synonym list, i=1 skips the subspecies and just shows synonyms
      if (namesArray[j] != "" || namesArray[j] != " ") {
         
         formattedName = namesArray[j].trim().replace(/([a-z]*)\s(.*)/, "<i>$1</i> $2" );  //italicise the subspecies names (first word before authority)
         outputNames +=  formattedName;
         if (j<namesArray.length-1) outputNames += "; ";
      }
   }
  
   outputNames = outputNames.replace(/; $/g, "").replace(/; $/g, ""); // trim trailling ;s
   return outputNames;
 }

// =================================================== MDD functions =========================================
//getChildrenMDD(taxonID,"order","class","MDD") {}
function getChildrenMDD(taxonID,rank,parentRank,db)  
{
   var scientificName = "";
   var output = "";
   var  rowCount = 0
   var extras = "";            // for extra information to be displayed after the taxon name (e.g. common name)
   var extinct = "";      // flag for extinction
   var regionClasses = "";
   var parent;
   var children;
   var childRank;
   var currentTaxon;
   var childCount = 0;
   
   console.log(taxonID);
   
      parent = MDD.classification[parentRank+'List'];
      children = MDD.classification[rank+'List'];
      
       console.log(parent);
        console.log(children);
      
      rowCount=parent[taxonID][1]; // note the offset
      $('#'+taxonID).append('<ul></ul>');  // add empty ul elements to taxon span (we assume there is content at this stage
      
      //TOTO count and region initialisations to go here
      
      //var orders = [];
         //var orderTable = document.getElementById("orderTable")     ;
      
      var i = 0;
      // for (i=0; i<6513 ;i++) { 
      for (i=parent[taxonID][1]; i<parent[taxonID][2] ;i++) {              //iterate through the rows
      
          rowCount += 1;
          
         //var rowRank = MDD.data[i].TaxonLevel.toLowerCase() ;                 // get rank of row and convert to lowercase
         var newTaxon = "MDD_" + MDD.data[i][rank];
         //console.log('row='+rowCount+'; newTaxon='+newTaxon+'; currentTaxon='+currentTaxon);
        // if (i<7) alert ("i="+i+": "+MDD.data[i].genus + " " + MDD.data[i].specificEpithet);  // data on last row of Carnovora (row 6138, Viverricula_indica)


         //species count stuff here
         
         if (newTaxon != currentTaxon) {                                  //if current row has the new value for the required rank (i.e. we have the next taxon of that rank)
         
            if (currentTaxon)  {                                                // finish dealing with previous order. Could just use if i != parent[id][1]
               children[currentTaxon][2] = i; //-1;
               currentTaxon = false;
            }
            childCount +=1
            //counter[rank] += 1; // needs declaring
            // speciess counter and filter content by continent here
            
            currentTaxon=newTaxon;
            children[currentTaxon] = [ "", i, 0 ] ;
            
             // handle extras: authority, common name, synonyms, 
            extinct = "";
            extras = "";   // TODO? getExtrasMSW3 (parentTaxonID, rank, parentRank
            
            if  (rank == "specificEpithet" )  {  // 
               if ( MDD.data[i]['extinct'] == 1 ) extinct = '†';  // check for extinct species
               
               //TODO? extras function
               if ( MDD.data[i].mainCommonName ) {
                  extras += ' (' + MDD.data[i].mainCommonName + ')'; 
                  //if ( MDD.data[i].otherCommonNames ) extras += '; ' + MDD.data[i].otherCommonNames; 
                  if ( MDD.data[i].otherCommonNames ) extras = extras.replace( /\)$/ , '; ' + MDD.data[i].otherCommonNames.replace(/\|/g, ', ') + ')' ); 
               }
               // TODO? nominalNames	taxonomyNotes	taxonomyNotesCitation	biogeographicRealm	countryDistribution	iucnStatus	extinct	domestic
             
               if (findGetParameter('compare') ) { // CMW_sciName	diffSinceCMW	MSW3_matchtype	MSW3_sciName	diffSinceMSW3
                  if (MDD.data[i].CMW_sciName != MDD.data[i].sciName) extras += ' [CMW name: ' + MDD.data[i].CMW_sciName.replace("_"," ") + ']'; 

                  
               }
            }
            
            // now deal with scientific name and  list entry
            scientificName = MDD.data[i][rank]  ;                            // get scientific name
            
            //currentTaxon =  "MDD_" + scientificName; // need handling for species //.replace(/ /g,"_");                          //  replace spaces for species and subspecies (currentTaxon is the ID)
            switch (rank) {
               //case "subspecies": scientificName = MDD.data[i]["species"] + " " + scientificName;
               case "specificEpithet": scientificName = MDD.data[i]["genus"] + " " + scientificName;  //make species combination
                               break;
               case "order": break;
               default:  scientificName = firstToUpper(scientificName);
            }
            switch (rank) {
               case "genus": case "specificEpithet":  scientificName = '<i>' +scientificName +'</i>';  //add italics for genus, species, subspecies
            }
            //alert('"'+scientificName+'"');
           switch (rank) {                                                 
                case "specificEpithet":  
                                 scientificName = '<a href="https://www.mammaldiversity.org/explore.html#species-id=' + MDD.data[i]["id"] +'" >' + scientificName + '</a>'; 
                                 break;
                case "order": 
                case "family": 
                case "genus":
                                 scientificName = '<a href="https://jts1882.github.io/mdd/taxa.html#'+rank+'=' + MDD.data[i][rank] +'" >' + scientificName + '</a>'; 
                                         break;
                default:
                                 // scientificName = '<a href="https://www.mammaldiversity.org/taxa.html" >' + scientificName + '</a>'; 
            }
            
            //children[currentTaxon] = [ "", rowCount, 0 ] ;
;
            switch (rank) {           
               case "specificEpithet":                    // no subspecies in MDD; use greyed out inactive bullet
                                      output = '<li class="' + rank + regionClasses + '"><span class="no_spp species" id="' + currentTaxon + '">'
                                            // + '<span style="color:#dddddd;">&#8862; </span>' + extinct + scientificName +extras + '</span></li>';  // greyed out - in square
                                             + '<span style="color:#00aa00;">&#9432; </span>' + extinct + scientificName +extras + '</span></li>';  // info icon
                                     break;
               default:                
                                    output = '<li class="' + rank + regionClasses + '"><span class="new-li ' + rank +'" id="' + currentTaxon + '">' + extinct + scientificName + extras + '</span></li>';  
            }
            //output='<li>'+orders[i]+'</li>';
            $('#'+taxonID+' ul').append(output);             // append latest <li> to <ul> block


            //childRank = "family"; //MSW3.data[i+1].TaxonLevel.toLowerCase() ; 
            switch(rank) {
               case "order": childRank = "family"; break;
               case "family": childRank = "genus"; break;
               case "genus": childRank = "specificEpithet"; break;
               case "species": childRank = "subspecies"; break;
               
            }
            childRank = getChildRankMDD(i, currentTaxon, rank);
            addInteractivity(currentTaxon, childRank, rank, db);              // add interactive load/collapse/expand functions for the order
 

         } // end newTaxon != currentTAxon
       
       
      } //end main loop through taxon
      if (currentTaxon)  { 
                  children[currentTaxon][2] = rowCount;
      }
      //addLinks(children,rank);  // add links to <a class="linkIOC">       // add link directly as we have the ID
      addPopupDetails();
      
      console.log(children[currentTaxon]);
      console.log(children);
    
}
function getChildRankMDD(i, currentTaxon,rank) {
   
   //var ranks = [  "class", "majorType", "majorSubtype", "order", "suborder", "infraorder", "parvorder", "superfamily", "family", "subfamily", "tribe", "genus", "specificEpithet" ];
   var ranks = { class:0, majorType:1, majorSubtype:2, order:30, suborder:31, infraorder:32, parvorder:33, superfamily:40, family:41, subfamily:42, tribe:43, genus:50, specificEpithet:51 }; 
   var childRank = "";
   //console.log(ranks);
   var currentRankIndex = ranks[rank];
   //console.log(currentRankIndex );
   for( var key in ranks ) {
      
      if ( MDD.data[i][key] != "NA" && ranks[key] > currentRankIndex ) {
         // console.log(key); 
         return key;
      }
   }
   return false;

}

function addPopupDetails() {
   
   //<script>document.addEventListener('load', filterFunc, false)</script>
      $('.no_spp').click(function (e) {
         //alert("clicking " + $(this).attr('id'));
         var row = MDD.classification.specificEpithetList[ $(this).attr('id')][1];
         //alert (row + " " +  $(this).attr('id') + " " + MDD.data[row]['id'] );
         var speciesID = MDD.data[row]['id'] ;
         
         var element = document.createElement("input");
         element.value = MDD.data[row]['id'];
          
          
          //code from header of fillSpeciesInfo(element);
          var resultsDisplay = document.createElement("div");
          resultsDisplay.setAttribute("id", "speciesInfo");
         resultsDisplay.className = "box-paragraph";
          var mddTable = document.getElementById("fullTable");
          var speciesData = {};
          if (document.getElementById("speciesInfo")) {
              var id = document.getElementById("speciesInfo");
              id.parentNode.removeChild(id);
          }
          speciesData = MDD.data[row];
          console.log(speciesData);
          var permalink = 'https://www.mammaldiversity.org/explore.html#' + "species-id=" + speciesID;
          
          //showSpeciesDetails(resultsDisplay, speciesData, permalink, mddTable); // function filling content of fillSpeciesInfo()
          resultsDisplay = showSpeciesDetails(resultsDisplay, speciesData, permalink, mddTable); // move content for reuse
          

          //$('#content-MSW3').css("background-color","yellow");
          //$('body').css("padding", "100px 100px");
          $('#content-details').append(resultsDisplay);
          //$('#speciesInfo').removeClass("box-paragraph")
          $('#speciesInfo').css("width","95%");
          $('#speciesInfo').css("margin", "25px");      
          //$('#content-details').css("background-color","#ffffaa");
          var offset =  $(window).scrollTop() ;//$(window).height()/2;
          console.log("Top: " + $(this).offset().top + " scrollTop: " + $(window).scrollTop() ); 
          //+ $(this).offset().left   + " screen-height: " + $(window).height() + " screen-width: " + $(window).width() );
          if (offset < 75) offset = 75;
          $('#content-details').css("top",offset); // $(this).getBoundingClientRect().top );
      });

}
function alternativeFillSpeciesInfo(elem) {
    //var data = "assets/data/mdd.csv";
    var speciesID = elem.value;
    var resultsDisplay = document.createElement("p");
    resultsDisplay.className = "box-paragraph";
    resultsDisplay.setAttribute("id", "speciesInfo");
    var mddTable = document.getElementById("fullTable");
    var speciesData = {};
    if (document.getElementById("speciesInfo")) {
        var id = document.getElementById("speciesInfo");
        id.parentNode.removeChild(id);
    }
    speciesData = results.data[i];
    var permalink = document.URL + "species-id=" + speciesID;
 }


function firstToUpper(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();  // first to upper, rest to lower
  //return s.charAt(0).toUpperCase() + s.slice(1);              // just change first letter
}

function addLinks(children,rank) {
      $('.linkIOC').each(function() {                                 
         
         var taxon = $(this).attr('href').replace("#","");
         var url = "IOC_List.php";
         url += '#' + rank + '='  + taxon + '&from=' + children[taxon][1] + '&to=' + children[taxon][2];
               
         $(this).attr('href', url)
                .removeClass("linkIOC"); // remove class now link added
      });
}

function loadChildren(taxon,rank,datatype,db) {
   switch(db) {
      case "MSW3":    
               getChildrenMSW3(taxon,rank,datatype,db); 
               break;   
      case "MDD":   
               getChildrenMDD(taxon,rank,datatype,db); 
               break;
      case "IOC":    
               getChildrenIOC(taxon,rank,datatype,db); 
               break;   
      case "BOW":   
               getChildrenBOW(taxon,rank,datatype,db); 
               break;
   }
}

function addInteractivity(taxon,rank,datatype,db) {
         $('.new-li').removeClass("new-li").addClass("new-buttons")
                     //.append(function() {
                     .prepend(function() {
                        //alert("hello from prepend");
                                 var id = $(this).attr('id');
                                 var spans = ' <span id="'+ id +'-load" class="'+rank+'_parent")>&#8862; </span>'
                                            + '<span id="'+ id +'-collapse" style="display:none;">&#8863; </span>'
                                            + '<span id="'+ id +'-expand"   style="display:none;">&#8862; </span>'; 
                                 return spans;
                     });
         $('.new-buttons').removeClass("new-buttons").addClass('new_functions')
                     .each(function() {
                                 var id = $(this).attr('id');
                                 $('#'+id+'-load').click(function (e) {
                                             e.preventDefault();
                                             //alert("hello from load function");
                                             //console.log(taxon + ' ' + rank);
                                             loadChildren(taxon,rank,datatype,db);
                                             //getChildData(id,rank,datatype,db);  // need the actual child? 
                                             $(this).hide();
                                             $('#'+id+'-collapse').show();
                                 });
                                 $('#'+id+'-expand').click(function (e) {
                                             e.preventDefault();
                                             //alert("hello from expand function");
                                             $(this).hide();
                                             $('#'+id+' > ul').show();
                                             
                                             $('#'+id+'-collapse').show();
                                 });
                                 $('#'+id+'-collapse').click(function (e) {
                                             e.preventDefault();
                                             //alert("hello from collapse function");
                                             $(this).hide();
                                             $('#'+id+' > ul').hide();
                                             $('#'+id+'-expand').show();
                                 });
                     });
      
}
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}
