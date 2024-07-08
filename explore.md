---
layout: default
title: Explore the Database
---

{% include filter-scripts.html %}

<script>window.addEventListener('load', goPermalink)</script>

<div class="container text-center">
<div class="row align-items-center justify-content-center">
<div class="col-4">
<br>
<input class="form-control form-control-lg" type="search" id="searchTerm" placeholder="Filter">
<br>
</div>
</div>
<div class="row align-items-center justify-content-center">
<div class="col">
<div class="table-responsive-md">
<table class="table table-striped table-bordered" id="fullTable">
    <thead class="table-dark">
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
            <td><a href="taxon/{{ species.id }}">{{ species.id }}</a></td>
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
</div>
</div>
<script>document.querySelector('#searchTerm').addEventListener('keyup', filterFunc, false);</script>
<script>document.addEventListener('load', filterFunc, false)</script>
