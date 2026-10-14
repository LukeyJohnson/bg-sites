---
id: 51194
title: Import Bill of Quantities in the Estimation App
date: 2025-11-18
sources: sleekplan-csv
category: DS Platform
category_source: inferred
sleekplan_type: Deep Space (Platform)
---
We're excited to introduce a powerful new way to populate your Bill of Quantities in the Estimation app! You can now import multiple BOQ items at once using an Excel file, dramatically speeding up the setup process for your project estimates.

### What's New

**Import BOQ from Excel Template**

No more manual entry of dozens or hundreds of BOQ items one by one. With the new Import BOQ feature, you can prepare your entire bill of quantities in Excel and import it in seconds.

**How to use:**
![2f459fbb19e596469d6103b3e651ecaf.png-3496](https://storage.sleekplan.com/products/287727888/changelog/51194/inline-30a8f4d9cd8977c3733f175477fa8a35.jpg)

1. **Access the Import Feature**
   - Navigate to your BOQ version in the Estimation app
   - Look for the "Import BOQ" button next to the Export button in the BOQ Builder
![f5783d59bb716ad1efd4f4c70fbbf9bf.png-195](https://storage.sleekplan.com/products/287727888/changelog/51194/inline-5677065f92c16e5f3a755c8b720746cf.jpg)
2. **Download the Template**
   - Click the "Download BOQ Template" button in the import modal
   - You'll receive a pre-formatted Excel file with the correct column structure
![780f526aca9a1ae545603e3db9dfabfe.png-2956](https://storage.sleekplan.com/products/287727888/changelog/51194/inline-f921c506497dd95a7ebdd19c0f9141b6.jpg)
3. **Fill in Your Items**
   - Add your BOQ items to the template (starting from row 3)
   - **Required fields:**
     - BOQ Name - The item description
     - Quantity - A positive number
     - Unit Rate - Cost per unit
   - **Optional fields:**
     - Description - Additional details about the item
     - Unit - Unit of measurement (m², m³, kg, etc.)
![ac9381dd280b7e1adebf17f80f4bebaa.png-1861](https://storage.sleekplan.com/products/287727888/changelog/51194/inline-8dd8de2facf527423be6022e3d6642a4.jpg)
4. **Upload and Map**
   - Upload your completed Excel file
   - Review all parsed items in the mapping interface
   - For each item, select the appropriate **budget category** (required)
   - Optionally assign **cost codes** for more detailed tracking
   - Cost codes are automatically filtered to show only those relevant to the selected budget category

5. **Bulk Create**
   - Click "Create Items" to import all items at once
   - The system automatically organizes items into BOQs based on their budget categories
   - If a BOQ for that budget category doesn't exist, it will be created automatically

### Why This Matters

- **Save Hours of Work**: Import 50, 100, or more items in minutes instead of hours
- **Reduce Errors**: Copy data from existing spreadsheets without manual re-entry
- **Better Migration**: Easily bring BOQs from other systems or previous projects
- **Flexible Workflow**: Prepare estimates offline and upload when ready
- **Smart Organization**: Items are automatically grouped by budget category

### Additional Improvements

- Added cost code selection to Subcontractor and Supplier item creation forms
- Cost codes are filtered by budget category for easier selection
- Cost code assignment is optional - use it when you need granular cost tracking
