---
layout: default
title: ASM Mammal Diversity Database
---
<script type="text/javascript" src="/js/papaparse.min.js"></script>
<script src="/js/filter.js"></script>
<script>document.addEventListener("DOMContentLoaded", populateStats)</script>

<ul class="header-ul">
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
Welcome!
    <br> The Mammal Diversity Database of the <a href='http://www.mammalsociety.org/'>American Society of Mammalogists</a> (ASM) is your home base for tracking the latest taxonomic changes to living and recently extinct (i.e., since ~1500 CE) species and higher taxa of mammals. 
    <br><br>Here we are curating the taxonomic implications of new research publications in real time — with the goal of promoting rigorous study of mammal biodiversity worldwide.
</p>
</div>

<div class="wrap">
<div class="search">
<input class="searchTerm" onkeydown="key_down(event)" id="mammal-search" type="text" name="search"><button class="searchButton" onClick='activateSearch()' type="submit">Search</button>
</div>
</div>

<div class="main-body">
<table class="stat-table">
    <thead class="stat-thead">
        <tr class="stat-tr">
        <th style="font-size: 15px">Taxa</th>
        <th style="font-size: 15px">MSW3 2005</th>
        <th style="font-size: 15px">MDD 2018</th>
        <th style="font-size: 15px">Current</th>  
        </tr>
    </thead>
    <tbody>
        <tr><td style="text-align: left">Species</td></tr>
        <tr>
            <td style="text-align: right; font-style: italic;">Total</td>
            <td>5,416</td>
            <td>6,495</td>
            <td id="species"></td>
        </tr>
        <tr>
            <td style="text-align: right; font-style: italic;">Extinct</td>
            <td>75</td>
            <td>96</td>
            <td id="extinct"></td>
        </tr>
        <tr>
            <td style="text-align: right; font-style: italic;">Living</td>
            <td>5,341</td>
            <td>6,399</td>
            <td id="living"></td>
        </tr>
        <tr>
            <td style="text-align: right; font-style: italic;">Domestic</td>
            <td>0</td>
            <td>16</td>
            <td id="domestic"></td>
        </tr>
        <tr>
            <td style="text-align: right; font-style: italic;">Living wild</td>
            <td>5,338</td>
            <td>6,382</td>
            <td id="livingWild"></td>
        </tr>
        <tr>
            <td style="text-align: left">Genera</td>
            <td>1,230</td>
            <td>1,314</td>
            <td id="genera"></td>
        </tr>
        <tr>
            <td style="text-align: left">Families</td>
            <td>153</td>
            <td>167</td>
            <td id="families"></td>
        </tr>        
        <tr>
            <td style="text-align: left">Orders</td>
            <td>29</td>
            <td>27</td>
            <td id="orders"></td>
        </tr>
    </tbody>
</table>
<br>
    <script type="text/javascript">pickImage()</script>
</div>

[<a href="https://github.com/mammaldiversity/mammaldiversity.github.io/edit/master/index.md" target="_blank">Edit</a>]
[<a href="mdd.json" target="_blank">JSON</a>]

<script>
    function key_down(e) {
        if (e.keyCode === 13) {
            activateSearch();
        }
    }