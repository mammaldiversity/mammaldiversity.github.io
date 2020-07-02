---
layout: default
title: Explore the Database
---
<script type="text/javascript" src="/js/papaparse.min.js"></script>
<script src="/js/filter.js"></script>
<script>window.addEventListener('load', goPermalink)</script>

<ul>
<li><a href="/index.html">Home</a></li>
<li><a href="assets/data/mdd.csv">Download the Database</a></li>
<li><a href="explore.html">Explore the Database</a></li>
<li style="float:right"><a href="about.html">About</a></li>
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
    </tr>
    </thead>
    <tbody>
        {% for species in site.data.mdd %}
            <tr>
            <td><a href="#"><input type = "button" onclick = "searchMDD(this)" id = "speciesID" value = "{{ species.id }}" /></a></td>
            <td>{{ species.Genus }}</td>
            <td>{{ species.specific_epithet }}</td>
            <td>{{ species.Family | downcase | capitalize }}</td>
            <td>{{ species.Order | downcase | capitalize }}</td>
            <td style="display: none">{{ species.SciName }}</td>
            </tr>
        {% endfor %}
    </tbody>
</table>
<script>document.querySelector('#searchTerm').addEventListener('keyup', filterFunc, false);</script>
    


