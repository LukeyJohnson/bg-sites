---
id: 50973
title: Budget Register MVP - Completed
date: 2025-11-11
sources: sleekplan-csv
category: DS Platform
category_source: inferred
sleekplan_type: Deep Space (Platform)
---
## Overview
The Budget Register module provides a comprehensive financial tracking system for construction projects, enabling real-time monitoring of project budgets, commitments, and expenditures.

![d13b17cb76671476df1317f7fb71e23a.png-7537](https://storage.sleekplan.com/products/287727888/changelog/50973/inline-d02a487dfe6124ac2b9e3c53fc075a67.jpg)

##  Core Features Delivered

### 1. **Data Integration & Synchronization**
- **BOQ Version Integration**: Seamlessly pull budget data from Bill of Quantities (BOQ) versions in the Estimation module
- **Version Tracking**: Display current BOQ version reference in the header for full traceability
- **Smart Data Generation**: Select specific BOQ versions when creating new Budget Register data
- **Real-time Updates**: Refresh financial data while maintaining original budget baseline
![caeddd0a55842913c8393788660d6983.png-3757](https://storage.sleekplan.com/products/287727888/changelog/50973/inline-f293874383b157fa705a7b28abdc6442.jpg)
### 2. **Hierarchical Budget Structure**
- **Budget Categories**: Organize costs by major project categories 
- **Cost Codes**: Detailed cost breakdown under each category with hierarchical support
- **Expandable Tree View**: Intuitive drill-down interface for exploring budget hierarchy
- **Parent-Child Relationships**: Support for nested cost code structures
![543f66f381a216de89294cf13f71ccd7.png-5155](https://storage.sleekplan.com/products/287727888/changelog/50973/inline-271722db8abbd72e3d8f9d5476faf773.jpg)
### 3. **Financial Tracking & Calculations**
- **Original Budget**: Base budget imported from BOQ (Estimation module)
- **Variations**: Track approved budget(variations) changes and adjustments
- **Revised Budget**: Automatically calculated (Original Budget +/- Variations)
- **Committed**: Sum of all contract/po commitments
- **Actuals to Date**: Real-time tracking of actual expenditures
- **Remaining Budget**: Live calculation of available budget
![08b9447d68c72e5c25e289fce2d3e57f.png-5350](https://storage.sleekplan.com/products/287727888/changelog/50973/inline-46adb8fd6085e87ea79360fb3ffe5779.jpg)
### 4. **Contract & Variation Management**
- **Related Contracts**: View all contracts linked to each budget line
- **Contract Details**: Access contract identifiers, values, status, and trade information
- **Variation Requests**: Track variation requests associated with cost codes
- **Integrated Sidebar**: Detailed view of contracts and variations per budget item


## Coming in Next Update

### Forecast & Variance Analysis
The following columns are currently calculated but will receive enhanced functionality and business logic in the next release:

- **Forecast**
- **FTC (Forecast to Complete)**
- **Variance**
