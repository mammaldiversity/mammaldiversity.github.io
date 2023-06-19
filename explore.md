---
layout: default
title: Explore the Database
---
<script type="text/javascript" src="js/papaparse.min.js"></script>
<script src="js/filter.js"></script>
<script>window.addEventListener('load', goPermalink)</script>
<ul class="header-ul">
<li><a href="index.html">Home</a></li>
<li><a href="assets/data/MDD.zip">Download the Database</a></li>
<li><a href="taxa.html">Explore Taxonomy</a></li>
<li><a href="tree.html">Treeview</a></li>
<li><a href="explore.html">Search Species</a></li>
<li style="float:right"><a href="about.html">About</a></li>
</ul>
<input class="input_text" type="search" id="searchTerm" placeholder="Filter">
<table class="table" id="fullTable">    
    <thead>
    <tr class="table-header-row">
        <th class="taxa-sticky-header">Species ID</th>
        <th class="taxa-sticky-header">Genus</th>
        <th class="taxa-sticky-header">Species</th>
        <th class="taxa-sticky-header">Family</th>
        <th class="taxa-sticky-header">Order</th>
    </tr>
    </thead>
    <tbody>
        {% for species in site.data.mdd %}
            <tr>
            <td><a href="#"><input type = "button" class="text-button" onclick = "fillSpeciesInfo(this)" id = "speciesID" value = "{{ species.id }}"></a></td>
            <td><i>{{ species.genus }}</i></td>
            <td><i>{{ species.specificEpithet }}</i></td>
            <td>{{ species.family | downcase | capitalize }}</td>
            <td>{{ species.order | downcase | capitalize }}</td>
            <td style="display: none">{{ species.sciName }}</td>
            <td style="display: none">{{ species.mainCommonName }}</td>
            </tr>
        {% endfor %}
    </tbody>
</table>
<script>document.querySelector('#searchTerm').addEventListener('keyup', filterFunc, false);</script>
<script>document.addEventListener('load', filterFunc, false)</script>
    


