---
layout: default
title: Higher Taxonomy
---
<script type="text/javascript" src="/js/papaparse.min.js"></script>
<script src="/js/filter.js"></script>
<script>document.addEventListener("DOMContentLoaded", createOrderTable)</script>

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
