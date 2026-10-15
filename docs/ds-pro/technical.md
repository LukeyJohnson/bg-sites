---
title: DS Pro (Technical)
---

# DS Pro: Technical Intelligence & Digital Engineering

**Target Audience:** Digital Engineers, BIM Managers, Data Analysts.

DS Pro transforms raw geometric and parametric data from models into actionable project intelligence. It manages the *data* of the building itself, ensuring model integrity and design validation.

## Core Modules

??? note "BIM Management (DS BIM)"
    **Model Audit App**
    Automated model governance that runs checks against Revit and IFC models to ensure compliance with the BIM Execution Plan (BEP).
    
    * **Health Checks:** Validates file naming, identifies unconnected elements, monitors file sizes (e.g., <1GB), and flags imported CAD/image usage.
    * **Scoring:** Aggregates checks into a "Model Health Score" with dashboards for discipline-specific drill-downs (Architecture, Structure, MEP).
    * **Action Integration:** Allows users to tag engineers directly on specific model errors, linking the audit to the task management system.

    **Coordination & Plugins**
    * **Super Schedule:** Links model elements to schedule tasks for 4D simulation and planning.
    * **Revizto Integration:** Pulls clash and markup data into Deep Space analytics to track resolution trends.
    * **Unified Plugins:** Supports Revit, Navisworks, and IFC with SSO and Enterprise permissions.

??? note "Design Management (DS Design)"
    **Verify App (LOI Checking)**
    Validates the Level of Information (LOI) within model elements against defined schemas (e.g., Asset Information Requirements) for digital handovers.
    
    * **Parameter Validation:** Checks existence and format of required parameters (e.g., "FireRating", "WarrantyDate").
    * **Completeness Tracking:** Tracks completion % by asset class to gate model submissions based on data maturity.

    **Drawing Management**
    * **Sheets and Files:** Manages sheet indexes and file metadata to synchronize the drawing register with model views.

??? note "Analytics & AI (KAI)"
    **Enterprise Intelligence**
    * **Power BI Integration:** "Open data" architecture allows direct connection of Power BI to the Deep Space data store, enabling cross-domain dashboards (e.g., correlating Design Clashes with Variation Costs).
    * **Portfolio Dashboards:** Aggregates metrics like total variation value and safety incident rates into executive command centers.

    **KAI (Knowledge AI)**
    * An intelligent agent capable of answering natural language questions (e.g., "Show me all overdue defects on Level 3") and generating ad-hoc reports.

---

---

[:material-arrow-left: DS Pro overview](index.md)
