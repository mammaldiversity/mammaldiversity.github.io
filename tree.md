---
layout: default
title: Treeview of Taxonomy
---
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> 
<script type="text/javascript" src="js/papaparse.min.js"></script>
<script src="js/speciesinfo.js"></script>
<script src="js/mammals.js"></script>
<script>document.addEventListener("DOMContentLoaded", createMDDOrderList())</script>
<style></style>
<link rel="stylesheet" href="mdd/css/tree.css">

<p>
    <h2>
    Treeview of Mammalian Taxonomy Hierarchy
    </h2>
    Click on symbols to expand collapse the tree to explore taxa families, genera, and species. Use the info icons <span style="color:#008800;font-weight:500;">&#9432; </span> to get the species details.
</p>
<div class="tree-display-options">
                 <input id="check-MDD"     type="checkbox" name="load" onchange="onChangeOrderList(event)" checked >Treeview of MDD v1.11
            <br/><input id="check-MSW3"    type="checkbox" name="load" onchange="onChangeOrderList(event)" checked >Treeview of MSW3
            <br/><input id="check-details" type="checkbox" name="load" onchange="onChangeOrderList(event)" checked >Species details pane
</div> 
<div style="clear:both;"></div>
<div id="content-details" > <!-- used by fillSpeciesInfo() --> </div>
<div id="content">
   <div id="content-MDD" class="interactive"></div>
   <div id="content-MSW3" class="interactive"></div>
</div>

