---
layout: home
title: Mammal Diversity Database
---

[<a href="https://github.com/mammaldiversity/mammaldiversity.github.io/edit/master/index.md" target="_blank">Edit</a>]

<nav>
<a class="link" href="explore.html">Explore the MDD</a>
<a class="link" href="assets/data/mdd.csv">Download the Database</a>
</nav>

<p>
<h1>Welcome to the Mammal Diversity Database</h1>
</p>

<script type="text/javascript" src="/js/papaparse.min.js"></script>
<script>
    var data;
    const file = "/assets/data/mdd.csv";
    console.log(file);
    function loadData() {
        console.log("loading in MDD data");
        data = Papa.parse("/assets/data/mdd.csv", {
            header: true,
            complete: function(results) {
                console.log("finished", results.data);
            }});
        console.log("Data loaded and parsed");
        }
</script>
