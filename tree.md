---
layout: default
title: Tree view of Taxonomy
---
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> 
<script type="text/javascript" src="js/papaparse.min.js"></script>
<script src="js/speciesinfo.js"></script>
<script src="js/mammals.js"></script>
<script>document.addEventListener("DOMContentLoaded", createMDDOrderList())</script>
<style></style>
<link rel="stylesheet" href="mdd/css/tree.css">

<ul class="header-ul">
<li><a href="index.html">Home</a></li>
<li><a href="assets/data/MDD.zip">Download the Database</a></li>
<li><a href="taxa.html">Explore Taxonomy</a></li>
<li><a href="tree.html">Treeview</a></li>
<li><a href="explore.html">Search Species</a></li>
<li style="float:right"><a href="about.html">About</a></li>
</ul>
<p>
    <h2>
    Treeview of Mammalian Taxonomy Hierarchy
    </h2>
    Click on symbols to expand collapse the tree to explore taxa families, genera, and species. Use the info icons to get the species details.
</p>
<div class="tree-display-options">
                 <input id="check-MDD"     type="checkbox" name="load" onchange="onChangeOrderList(event)" checked >Treeview of MDD v1.11
            <br/><input id="check-MSW3"    type="checkbox" name="load" onchange="onChangeOrderList(event)"         >Treeview of MSW3
            <br/><input id="check-details" type="checkbox" name="load" onchange="onChangeOrderList(event)" checked >Species details pane
</div> 
<div style="clear:both;"></div>
<div id="content-details" > <!-- used by fillSpeciesInfo() --> </div>
<div id="content">
   <div id="content-MDD" class="interactive"></div>
   <div id="content-MSW3" class="interactive"></div>
</div>

