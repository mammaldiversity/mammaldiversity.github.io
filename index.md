---
layout: default
title: Mammal Diversity Database
---

[<a href="https://github.com/mammaldiversity/mammaldiversity.github.io/edit/master/index.md" target="_blank">Edit</a>]


|id|genus|species|
|---|---|---|
{%- for species in site.data.mdd %}
| <a name="{{ species.ID_number }}"></a>[{{ species.ID_number }}](#{{species.ID_number}}) | {{ species.Genus }} | {{ species.epithet }} 
{%- endfor %}
