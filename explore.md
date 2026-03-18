---
layout: default
title: Explore the Database
---
<<<<<<< HEAD
<script type="text/javascript" src="/js/papaparse.min.js"></script>
<script src="/js/filter.js"></script>

<ul>
<li><a href="/index.html">Home</a></li>
<li><a href="assets/data/mdd.csv">Download the Database</a></li>
<li><a href="explore.html">Explore the Database</a></li>
<li style="float:right"><a href="#about">About</a></li>
</ul>
<input class="input_text" type="search" id="searchTerm" placeholder="Search for a mammal">

<table class="table" id="fullTable">    
    <thead>
    <tr>
        <th>Species ID</th>
        <th>Genus</th>
        <th>Species</th>
        <th>Family</th>
        <th>Order</th>
=======

{% include filter-scripts.html %}

<script>window.addEventListener('load', goPermalink)</script>

<div class="container text-center">
<div class="row align-items-center justify-content-center">
<div class="col-auto my-2">
<input class="form-control form-control-lg" type="search" id="searchTerm" placeholder="Filter" autocomplete="off">
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
>>>>>>> master
    </tr>
    </thead>
    <tbody>
        {% for species in site.data.mdd %}
            <tr>
<<<<<<< HEAD
            <td><input type = "button" onclick = "searchMDD(this)" id = "speciesID" value = "{{ species.id }}" /></td>
            <td>{{ species.Genus }}</td>
            <td>{{ species.specific_epithet }}</td>
            <td>{{ species.Family | downcase | capitalize }}</td>
            <td>{{ species.Order | downcase | capitalize }}</td>
=======
            <td><a href="taxon/{{ species.id }}">{{ species.id }}</a></td>
            <td><i>{{ species.genus }}</i></td>
            <td><i>{{ species.specificEpithet }}</i></td>
            <td>{{ species.family | downcase | capitalize }}</td>
            <td>{{ species.order | downcase | capitalize }}</td>
            <td style="display: none">{{ species.sciName }}</td>
            <td style="display: none">{{ species.mainCommonName }}</td>
>>>>>>> master
            </tr>
        {% endfor %}
    </tbody>
</table>
<<<<<<< HEAD
<script>document.querySelector('#searchTerm').addEventListener('keyup', filterFunc, false);</script>



=======
</div>
</div>
<script>document.querySelector('#searchTerm').addEventListener('keyup', filterFunc, false);</script>
<script>document.addEventListener('load', filterFunc, false)</script>
>>>>>>> master
