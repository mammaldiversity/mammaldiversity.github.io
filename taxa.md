---
layout: default
title: Higher Taxonomy
---
<script type="text/javascript" src="js/papaparse.min.js"></script>
<script src="js/filter.js"></script>
<script>document.addEventListener("DOMContentLoaded", createOrderTable)</script>

<ul class="header-ul">
<li><a href="/index.html">Home</a></li>
<li><a href="assets/data/MDD.zip">Download the Database</a></li>
<li><a href="taxa.html">Explore Taxonomy</a></li>
<li><a href="explore.html">Search Species</a></li>
<li style="float:right"><a href="about.html">About</a></li>
</ul>

<p>
    <h2>
    Explore Current Mammalian Taxonomy
    </h2>
    Click on an order to explore taxa families, genera, and species, both living and recently extinct
</p>


<table class="table" id="orderTable">    
    <thead>
    <tr>
        <th class="taxa-sticky-header">Major Type</th>
        <th class="taxa-sticky-header">Major Subtype</th>
        <th class="taxa-sticky-header">Order</th>
        <th class="taxa-sticky-header">Families</th>
        <th class="taxa-sticky-header">Genera</th>
        <th class="taxa-sticky-header">Living species</th>
        <th class="taxa-sticky-header">Extinct species (last 500 years)</th>
    </tr>
    </thead>
</table>
