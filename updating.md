---
icon: cloud-arrow-up
---

# Updating

## Overview

The Updater lets you move to a newer version while keeping all your existing customisations. Instead of rebuilding your styles after every update, it carries over your current values and applies the improvements from the latest release.

**Access the updater:** [etch.designwithcracka.com/mmpro-updater](https://etch.designwithcracka.com/mmpro-updater/)

***

## Step 1: Load your current version

Paste the JSON from your currently installed version into the **Current Version** field.

This gives the updater a reference of your existing settings and customisations.

***

## Step 2: Load the new version

Paste the JSON from the latest version into the **New Version** field.

The updater compares both versions and identifies:

* New properties
* Updated values
* Removed variables
* Custom values that should be preserved

***

## Step 3: Preview changes

Click **Preview Changes**.

The updater generates a summary showing:

* Classes that will be updated
* Values carried over from your current version
* New default values available in the update
* Variables that no longer exist in the new version
* New properties introduced by the update

***

## Step 4: Review individual changes

For each property you will see:

**Current Value** — the value currently used in your project.

**New Value** — the value included in the latest release.

**Carry Over** — enabled by default. Your custom value is preserved and the update will not overwrite it.

**Accept New Value** — if you prefer the new default, uncheck the carry-over option for that property.

This gives you complete control over which values are kept and which are replaced.

***

## Step 5: Apply the update

Click **Apply Update**.

The updater generates a new JSON containing:

* Updated component settings
* Your preserved customisations
* New properties from the latest release
* Any new default values you chose to accept

A summary is displayed showing exactly what was updated, carried over, added, or skipped.

***

## Step 6: Import the updated JSON

Copy the generated JSON, then in Etch:

1. Ensure no element is selected.
2. Click inside the Structure panel.
3. Press **Esc** to clear any selection.
4. Paste the updated JSON.

Depending on the size of the component, it may take a moment to import. Once imported, the temporary component can be removed — it exists only to transfer the updated settings.

***

## Step 7: Update the stylesheet

1. Open the **DWC Mega Menu** stylesheet in Etch.
2. Replace the existing CSS with the CSS from the latest version.
3. Save the stylesheet.

Both the JSON and CSS updates are required to ensure all new features and fixes are applied correctly.

***

## Understanding carry over

Carry Over is the core feature of the updater. When enabled for a property, your existing value is transferred into the updated version — preventing customisations such as colours, spacing, typography, border radii, and layout settings from being overwritten.

When disabled for a property, the updater uses the new default from the latest release instead.

***

## Notes

* Updating both the JSON and the stylesheet is recommended for the best results.
* New properties introduced in the latest version are added automatically during the update.
* Large version jumps may require minor manual adjustments after updating.
* Most custom styling will remain intact through the carry-over system.
