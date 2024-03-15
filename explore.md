---
layout: default
title: Explore the Database
---

{% include filter-scripts.html %}

<script>window.addEventListener('load', goPermalink)</script>

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
<script>document.querySelector('#searchTerm').addEventListener('keyup', filterFunc, false);</script>
<script>document.addEventListener('load', filterFunc, false)</script>
    


