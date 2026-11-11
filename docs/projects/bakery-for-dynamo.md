---
title: Bakery for Dynamo
description: Bakery for Dynamo, created by Luke Johnson. Reusable nodes, example graphs and practical automation for Revit, BIM data and IFC workflows.
hide:
  - toc
---

<div class="bg-bakery" markdown>

<div class="bg-page-intro" markdown>

<p class="bg-eyebrow">Black Grid / Dynamo &amp; Revit automation</p>

# Bakery for Dynamo

<p class="bg-bakery-author">Created by Luke Johnson</p>

<p class="bg-lead">A practical toolkit for the work between modelling and delivery. Reusable Dynamo nodes and graphs for managing Revit models, working with BIM data and connecting information across files.</p>

<div class="bg-actions">
  <a class="bg-button bg-button-primary" href="https://github.com/LukeyJohnson/BakeryForDynamo">Browse the source <span aria-hidden="true">↗</span></a>
  <a class="bg-button bg-button-secondary" href="https://dynamonodes.com/2016/01/27/bakery-node-index/">Explore the node guide <span aria-hidden="true">↗</span></a>
</div>

</div>

<div class="bg-spec-strip" aria-label="Bakery at a glance">
  <div><strong>750+</strong><span>Custom-node files in the Dynamo 2.0x archive, including helpers and derived nodes</span></div>
  <div><strong>Revit + IFC + data</strong><span>Model management, coordination and information workflows</span></div>
  <div><strong>Nodes + graphs</strong><span>Reusable building blocks, worked examples and supporting packages</span></div>
</div>

<figure class="bg-screenshot">
  <a href="../../assets/bakery/ifc-data.png" target="_blank" rel="noopener" aria-label="Open the full-size Bakery IFC reader screenshot in a new tab"><img src="../../assets/bakery/ifc-data.png" alt="Bakery's Read From IFC node connected to file and schema inputs, with outputs for line IDs, entity names and attribute values." width="1887" height="789" fetchpriority="high"></a>
  <figcaption>An original Bakery workflow: turning IFC text and a schema into data that can be inspected and filtered in Dynamo. <a href="https://dynamonodes.com/2016/09/07/read-from-ifc/">Read the original walkthrough</a> · <a href="../../assets/bakery/ifc-data.png" target="_blank" rel="noopener">Full-size screenshot ↗</a></figcaption>
</figure>

## Built from everyday BIM problems

Bakery grew out of Luke's hands-on work with Revit and BIM delivery: finding the right elements, checking model information, managing linked files and making the same change consistently across many views or sheets. The useful routines became reusable Dynamo nodes, then a shared package that others could inspect, combine and adapt.

The collection spans small conveniences and more involved automation. A node can tidy sheet names; a graph can gather information from linked models, reshape spreadsheet data or help investigate differences between IFC exports. The common idea is to make a repeatable task understandable enough to run again, rather than rebuild it for every project.

Bakery brings together Luke's custom work, including XML processing with Python's ElementTree, and adaptations of community tools. Packages such as **Clockwork**, **archi-lab** and **LunchBox** are part of that foundation. The original [project introduction](https://dynamonodes.com/2016/01/22/what-is-bakery/) explains this approach, and the repository preserves the graph and node source alongside supporting package versions.

## What Bakery helps you do

<dl class="bg-bakery-capabilities">
  <div><dt>Find and check model information</dt><dd>Collect elements by category, workset or parameter; inspect shared-parameter GUIDs; find duplicate values and report model conditions that need attention.</dd></div>
  <div><dt>Manage views and sheets</dt><dd>Work with view disciplines, filters, templates, revisions and sheet names. Turn a repeated documentation task into a graph with explicit inputs.</dd></div>
  <div><dt>Understand linked models</dt><dd>Gather external-file references, linked-element information and workset details. The example graphs also include BIM 360 path harvesting and reloading tools.</dd></div>
  <div><dt>Work across IFC and coordination data</dt><dd>Read IFC information, extract identifiers, convert between IFC and .NET GUID formats, and compare identifier sets between two files.</dd></div>
  <div><dt>Connect files, tables and parameters</dt><dd>Read and reshape Excel, CSV, XML and text data; clean strings and lists; move information into forms that a Revit workflow can use.</dd></div>
  <div><dt>Build geometry-driven routines</dt><dd>Use room boundaries, curves, points and element geometry in modelling and review tasks, including floor creation and section-box workflows.</dd></div>
</dl>

[Browse the documented node groups](https://dynamonodes.com/2016/01/27/bakery-node-index/), or explore the [Bakery articles on Dynamo Nodes](https://dynamonodes.com/category/bakery/) for individual examples.

## See the tools in use

These are original screenshots from Luke's Dynamo Nodes articles, showing the package and workflows as they were documented.

<div class="bg-bakery-examples" markdown>

<section markdown>

### Compare IFC identifiers

Give **Compare Two IFCs by GUIDs** an older and a newer IFC file. Its outputs identify GUIDs added to, or removed from, the newer file: a focused way to investigate changes in the identifier sets.

<figure class="bg-screenshot">
  <a href="../../assets/bakery/ifc-comparison.jpg" target="_blank" rel="noopener" aria-label="Open the full-size IFC comparison screenshot in a new tab"><img src="../../assets/bakery/ifc-comparison.jpg" alt="Two IFC file paths feeding Bakery's Compare Two IFCs by GUIDs node, with separate lists of added and removed identifiers." width="1980" height="1479" loading="lazy"></a>
  <figcaption><a href="https://dynamonodes.com/2016/09/12/compare-two-ifcs-by-guids/">Compare Two IFCs by GUIDs · original article</a><br><a href="../../assets/bakery/ifc-comparison.jpg" target="_blank" rel="noopener">Full-size screenshot ↗</a></figcaption>
</figure>

</section>

<section markdown>

### Standardise sheet names

**All Sheet Names to Upper Case** handles a small but repetitive documentation job in one operation. The screenshot shows the node in Bakery's library and its returned list of renamed sheets.

<figure class="bg-screenshot">
  <a href="../../assets/bakery/sheet-names.jpg" target="_blank" rel="noopener" aria-label="Open the full-size sheet naming screenshot in a new tab"><img src="../../assets/bakery/sheet-names.jpg" alt="The Bakery node library beside All Sheet Names to Upper Case, showing a list of renamed Revit sheets." width="1238" height="1359" loading="lazy"></a>
  <figcaption><a href="https://dynamonodes.com/2017/04/13/all-sheet-names-to-upper-case/">All Sheet Names to Upper Case · original article</a><br><a href="../../assets/bakery/sheet-names.jpg" target="_blank" rel="noopener">Full-size screenshot ↗</a></figcaption>
</figure>

</section>

</div>

The same practical approach appears in the [view-discipline tools](https://dynamonodes.com/2016/10/31/set-discipline-property-for-views/), which enumerate and set disciplines across views, and [view-filter tools](https://dynamonodes.com/2016/08/04/add-view-filters-to-view/), which apply filters to a view.

## What is in the repository?

The [BakeryForDynamo repository](https://github.com/LukeyJohnson/BakeryForDynamo) contains more than the package itself:

- **Versioned Bakery collections.** Separate `BakeryForDynamo1.3x` and `BakeryForDynamo2.0x` folders preserve the package layouts, custom-node definitions and additional resources.
- **Supporting package snapshots.** Companion folders preserve versions of packages that Bakery workflows may reference, making their dependencies visible alongside the nodes.
- **Example Dynamo graphs.** The `dyn` folder includes BIM 360 path-harvesting and path-reloading examples, alongside a contributed section-from-line graph credited to Nick Culley in its filename.
- **Additional resources.** The repository also includes node icons and a separate RollingPin node collection.

<div class="bg-bakery-archive" markdown>

### Working with the archive today

Bakery's public repository preserves historical Dynamo **1.3x and 2.0x** collections. Start with the versioned folder and its dependencies when inspecting or adapting a workflow for your Revit/Dynamo environment. These snapshots are a reference for the original tooling, rather than a statement of compatibility with every current release.

[Dynamo 1.3x collection](https://github.com/LukeyJohnson/BakeryForDynamo/tree/master/BakeryForDynamo1.3x){ .md-button }
[Dynamo 2.0x collection](https://github.com/LukeyJohnson/BakeryForDynamo/tree/master/BakeryForDynamo2.0x){ .md-button }

</div>

## Explore Bakery

The source is the place to inspect the implementation. Dynamo Nodes provides the explanations, node index and worked examples that put the tools in context.

<div class="bg-actions">
  <a class="bg-button bg-button-primary" href="https://github.com/LukeyJohnson/BakeryForDynamo">Bakery on GitHub <span aria-hidden="true">↗</span></a>
  <a class="bg-button bg-button-secondary" href="https://dynamonodes.com/category/bakery/">Bakery articles &amp; examples <span aria-hidden="true">↗</span></a>
</div>

<p class="bg-bakery-footer">For more of Luke's Dynamo resources and the community he administers, visit <a href="../../dynamo/">Dynamo at Black Grid</a>.</p>

</div>
