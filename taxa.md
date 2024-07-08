---
layout: default
title: Higher Taxonomy
---

{% include filter-scripts.html %}
<script>document.addEventListener("DOMContentLoaded", createOrderTable)</script>
<div class="container text-center">
<p class="h2">
    Explore Current Mammalian Taxonomy
</p>
<p>
    Click on an order to explore taxa families, genera, and species, both living and recently extinct
</p>
</div>
<div class="row align-items-center justify-content-center">
<div class="col-auto">
<div class="table-responsive-lg">
<table class="table table-light table-striped table-bordered" id="orderTable">
    <thead>
    <tr>
        <th class="taxa-sticky-header">Subclass</th>
        <th class="taxa-sticky-header">Infraclass</th>
        <th class="taxa-sticky-header">Order</th>
        <th class="taxa-sticky-header">Families</th>
        <th class="taxa-sticky-header">Genera</th>
        <th class="taxa-sticky-header">Living species</th>
        <th class="taxa-sticky-header">Extinct species (last 500 years)</th>
    </tr>
    </thead>
</table>
</div>
</div>
</div>
