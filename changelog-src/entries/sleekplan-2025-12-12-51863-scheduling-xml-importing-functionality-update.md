---
id: 51863
title: Scheduling XML importing functionality update
date: 2025-12-12
sources: sleekplan-csv
category: DS Pro for Construction
category_source: inferred
sleekplan_type: Scheduling
---
## Overview

Optimized the Import capability in the Scheduling Tool to better support large and complex project files. The import process now supports XML files over 30MB by allowing them to be compressed and uploaded as ZIP files.
In addition, the parsing and display of WBS (Work Breakdown Structure) hierarchies has been improved, ensuring all levels are correctly read and rendered. This resolves issues where large projects previously showed incomplete WBS data.
XML files exported from GanttPRO are now fully supported and display all project content correctly after import.

## Why do we have this

Large and complex schedules are common in real-world project planning, but previously they could fail to import correctly due to file size limits and WBS parsing issues. This caused missing tasks, incomplete hierarchies, and extra manual rework.

With this improvement:

* Project teams can import large-scale schedules without splitting files or simplifying structures.
* 
* WBS hierarchies from external tools are preserved and displayed accurately.
* 
* Users exporting schedules from GanttPRO can now rely on a smooth, lossless import experience.

Overall, this reduces friction during project setup and ensures scheduling data remains complete and trustworthy.

## How to use it

* Export your project schedule as an XML file from your scheduling tool.
* 
* If the XML file exceeds 30MB, compress it into a ZIP file.
* 
* Open the Scheduling Tool and go to the Import section.
* 
* Upload the XML file directly, or upload the ZIP file containing the XML.
* 
* Once imported, review the schedule to confirm that all WBS levels and tasks are fully displayed in the timeline and structure view.
