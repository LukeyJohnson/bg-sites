---
id: 44714
title: DS Site Badge Sharing Feature Release
date: 2025-05-26
sources: sleekplan-csv, sleekplan-email
category: DS Site
category_source: email-badge
badge_original: DS Site
email: 2025-05-26_1970c09d31e59100.html
sleekplan_type: DS Site (App)
---
## New Feature: Badge Sharing Across DS Site Channels

We’ve added powerful new functionality to enhance how badges are shared and managed across channels. This update introduces new capabilities for both **users** and **administrators**.
You can now view shared badges users have been awarded in other channels, enhancing collaboration and visibility across teams.


### 🧑‍💻 For Users
* **Share Awarded Badges to Other Channels**
	Users can now go to their profile, select an awarded badge, and share it with other channels. The list of shareable channels is pre-defined by administrators as a whitelist per badge type.
* **User-Friendly Sharing Interface**
	A dropdown allows users to choose from available whitelisted channels. After confirmation, the badge becomes visible in the selected channel.
* **In-App Badge Sharing Support**
	The sharing functionality is now available in both the web and app UIs, ensuring a consistent experience across platforms.
![3391748218374_.pic_hd copy.jpg-2101](https://storage.sleekplan.com/products/287727888/changelog/44714/inline-6fe1b407155e179fba4942001438bcf7.jpg)

### 🛠️ For Administrators
* **Manage BadgeType Whitelists**
	Admins can define which channels each badge type can be shared to. This is done via the badge type edit modal with full add/remove capabilities.
	![3401748222245_.pic copy.jpg-4379](https://storage.sleekplan.com/products/287727888/changelog/44714/inline-225a9213d20d2505c154c73bce7776c5.jpg)
* **Badge Visibility Control**
	Sharing is now restricted to the channels defined in the whitelist. Attempts to share outside the allowed list are prevented via built-in validation.
* **Extended Search for Awarded Badges**
	The Awarded Badges admin UI now includes:
	* 	Badges originally awarded in the channel
	* 	Badges shared into the channel from other sources
	* 	Clear distinction between awarded vs. shared badges in the UI
* **Advanced Filtering Options**
	Two new filters have been added to the Awarded Badges page:
	* “Shared From” – Filter by the source channel a badge was shared from.
	* “Shared To” – Filter badges that have been shared from the current channel to another specified channel.



### Why Did We Build This?

* Enable centralised control over badge sharing across channels.
* Ensure badges are only shared to appropriate destinations through admin-defined whitelists.
* Improve visibility of achievements while maintaining governance and data integrity.
