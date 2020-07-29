---
layout: default
title: ASM Mammal Diversity Database
---
<script type="text/javascript" src="/js/papaparse.min.js"></script>
<script src="/js/filter.js"></script>
<script>document.addEventListener("DOMContentLoaded", populateStats)</script>

<ul>
<li><a href="/index.html">Home</a></li>
<li><a href="assets/data/mdd.csv">Download the Database</a></li>
<li><a href="taxa.html">Explore Taxonomy</a></li>
<li><a href="explore.html">Search Species</a></li>
<li style="float:right"><a href="about.html">About</a></li>
</ul>
<br>
<div>
<p>
<h1>Welcome to ASM's Mammal Diversity Database</h1>
</p>
</div>

<div>
<p class="box-paragraph">
Welcome!<br> The Mammal Diversity Database of the <a href='http://www.mammalsociety.org/'>American Society of Mammalogists</a> (ASM) is the home base for tracking the latest taxonomic changes to species and higher taxa of mammals. Here we are curating the taxonomic implications of new research publications in real time — with the goal of promoting rigorous study of mammal biodiversity worldwide.
</p>
</div>

<div class="wrap">
<div class="search">
<input class="searchTerm" id="mammal-search" type="text" name="search"><button class="searchButton" onClick='activateSearch()' type="submit">Search</button>
</div>
</div>

<div class="main-body">
<table style="table-layout: auto; float:right; margin: 50px">
    <thead class="stat-thead">
        <tr class="stat-tr"><th style="font-size: 20px" class="stat-th">Current status of the database</th></tr>
    </thead>
    <tbody>
        <tr><td class="stat-td" id = "orders">Current number of mammalian orders: </td></tr>
        <tr><td class="stat-td" id = "families">Current number of mammalian families: </td></tr>        
        <tr><td class="stat-td" id = "genera">Current number of mammalian genera: </td></tr>
        <tr><td class="stat-td" id = "species">Current number of mammalian species: </td></tr>
        <tr><td class="stat-td" id = "newMSW3"> New species added since MSW3: </td></tr>
    </tbody>
</table>
<br>
    <script type="text/javascript">pickImage()</script>
</div>

[<a href="https://github.com/mammaldiversity/mammaldiversity.github.io/edit/master/index.md" target="_blank">Edit</a>]
[<a href="mdd.json" target="_blank">JSON</a>]

