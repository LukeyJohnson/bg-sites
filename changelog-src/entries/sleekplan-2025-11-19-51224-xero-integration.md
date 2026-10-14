---
id: 51224
title: Xero Integration
date: 2025-11-19
sources: sleekplan-csv
category: DS Platform
category_source: inferred
sleekplan_type: Deep Space (Platform)
---
## Overview

The Xero Integration connects Deep Space Sync with Xero accounting software, enabling bidirectional synchronization of financial data between both systems. This integration streamlines your accounting workflow by automatically syncing contacts, invoices, payments, purchase orders, and payment schedules.

## Key Features
![02cb9a68dc55331eab95e0bf1f4d70c6.png-7429](https://storage.sleekplan.com/products/287727888/changelog/51224/inline-369d9f364747b618d5982aeee4f2c30f.jpg)
### [FEATURE] Bidirectional Data Synchronization

**Contacts Sync**
- Automatically sync contact information between Deep Space and Xero
- Match contacts by tax ID (ABN/NZBN) to prevent duplicates
- Create contacts in both systems as needed
- Maintain vendor relationships and contact mappings
- **Note:** Contacts sync is required for all other sync types to function properly

**Invoices to Client**
- Pull invoices from Xero into Deep Space automatically
- Push Deep Space invoices to Xero as draft ACCREC invoices
- Sync invoice line items with proper cost code mapping
- Maintain xero_id links to prevent duplicate creation
- Support for invoice status tracking (draft, pending, paid, rejected)

**Payments**
- Sync both incoming payments (from clients) and outgoing payments (to suppliers)
- Automatically link payments to related invoices
- Link payments to head contracts for contract-level tracking
- Link outgoing payments to purchase orders
- Support for multiple payments per invoice
- Reverse linking to ensure all payment relationships are captured

**Purchase Orders**
- Bidirectional sync of purchase orders
- Create draft purchase orders in Xero from Deep Space orders
- Map line items with cost codes to Xero chart of accounts
- Project tracking category assignment
- Exclude HEAD contract orders (not supported for Xero sync)

**Subcontractor Payment Schedules**
- Push payment schedules to Xero as bills (ACCPAY invoices)
- Support for retention amounts as separate line items
- Handle withholdings and tax adjustments
- Only sync subcontractor-related schedules

### [FEATURE] Advanced Mapping Configuration
![c294044532239e1308718d6a07938279.png-9917](https://storage.sleekplan.com/products/287727888/changelog/51224/inline-ff5b96c2878371054dea7b1388bc96ba.jpg)
**Cost Code to Chart of Accounts Mapping**
- Map Deep Space cost codes to Xero chart of accounts
- Ensures accurate financial reporting and categorization
- **[IMPORTANT]** Correct cost code mapping is essential for accurate financial data
![63ca9d238db409b564a422754612b48e.png-1367](https://storage.sleekplan.com/products/287727888/changelog/51224/inline-b19230737028b2f7ca95b9dc98401ee0.jpg)
**Project to Tracking Categories Mapping**
- Map Deep Space projects to Xero tracking categories
- Enable project-level reporting in Xero
- Automatically apply tracking to all line items
- **[IMPORTANT]** Correct project mapping ensures accurate project cost tracking

### [FEATURE] Flexible Sync Configuration
![efb0475455a637e92072c55f761a21eb.png-1017](https://storage.sleekplan.com/products/287727888/changelog/51224/inline-f8b5f75803bfdc2447cbab5a64b30951.jpg)
**Granular Sync Controls**
- Enable/disable specific sync types independently
- Contacts sync must be enabled for other syncs to work
- Real-time validation of sync dependencies

**Sync Frequency Options**
- **Daily Sync:** Automatic synchronization once per day
- **Manual Only:** Trigger syncs on-demand when needed

**Manual Sync Triggers**
- One-click manual sync for each data type
- Real-time sync status indicators
- Sync progress tracking

### [FEATURE] Activity Monitoring & Logging

**Comprehensive Activity Log**
- Track all sync operations with timestamps
- View success/failure status for each sync
- Error messages for failed syncs
- Grouped activities for cleaner display
- Last sync time indicators for each data type

**Integration Health Dashboard**
- Real-time status for each sync type
- Last sync time with relative timestamps (e.g., "2h ago")
- Success/failure badges
- Connected Xero organization information
