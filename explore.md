---
layout: default
title: Explore the Database
---
<script src="/js/filter.js"></script>


<nav><a href="/index.html">Home</a></nav>

<input class="input_text" type="text" id="searchTerm" placeholder="Search for a mammal">


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
            <td>{{ species.ID_number }}</td>
            <td>{{ species.Genus }}</td>
            <td>{{ species.epithet }}</td>
            <td>{{ species.Family | downcase | capitalize }}</td>
            <td>{{ species.Order | downcase | capitalize }}</td>
            </tr>
        {% endfor %}
    </tbody>
</table>
<script>document.querySelector('#searchTerm').addEventListener('keyup', filterFunc, false);</script>


