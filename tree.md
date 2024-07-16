---
layout: default
title: Treeview of Taxonomy
---

{% include tree-view.html %}

<div class="container text-center">
<p class="h2">
    Treeview of Mammalian Taxonomy Hierarchy
</p>
<p>
    Click on symbols to expand collapse the tree to explore taxa families, genera, and species. Use the info icons <span style="color:#008800;font-weight:500;">&#9432; </span> to get the species details.
</p>
<div class="tree-display-options">
    <input id="check-MDD"     type="checkbox" name="load" onchange="onChangeOrderList(event)" checked > Treeview of MDD v1.11
    <br/><input id="check-MSW3"    type="checkbox" name="load" onchange="onChangeOrderList(event)" > Treeview of MSW3
    <br/><input id="check-details" type="checkbox" name="load" onchange="onChangeOrderList(event)" > Species details pane
</div>

<div style="clear:both;"></div>
<div id="content-details" > <!-- used by fillSpeciesInfo() --> </div>
<div id="content">
   <div id="content-MDD" class="interactive"></div>
   <div id="content-MSW3" class="interactive"></div>
</div>

</div>
