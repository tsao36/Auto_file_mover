---
name: File Routing Workbench
description: Preview-first interface for routing new local files.
colors:
  bark: "#825B3D"
  mint: "#99DCC5"
  mist: "#E0E6CD"
  gold: "#B79937"
  brick: "#B33D2D"
  ink: "#322C25"
  muted: "#62594F"
  paper: "#FFFEFA"
  line: "#DEDFD3"
  surface: "#F5F6EF"
  gold-ink: "#66510F"
  mint-ink: "#21483D"
typography:
  title:
    fontFamily: '"Segoe UI Variable", "Segoe UI", system-ui, sans-serif'
    fontSize: "26px"
    fontWeight: 680
    lineHeight: 1.2
    letterSpacing: "0"
  body:
    fontFamily: '"Segoe UI Variable", "Segoe UI", system-ui, sans-serif'
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
  label:
    fontFamily: '"Segoe UI Variable", "Segoe UI", system-ui, sans-serif'
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0"
  meta:
    fontFamily: '"Segoe UI Variable", "Segoe UI", system-ui, sans-serif'
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0"
  mono:
    fontFamily: '"Cascadia Code", Consolas, monospace'
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0"
rounded:
  badge: "4px"
  control: "6px"
  overlay: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.bark}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "0 13px"
    height: "38px"
    typography: "{typography.label}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 13px"
    height: "38px"
    typography: "{typography.label}"
  search-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 10px"
    height: "36px"
  status-ready:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.mint-ink}"
    rounded: "{rounded.badge}"
    padding: "4px 7px"
---

# Design System: File Routing Workbench

## Overview

**Creative North Star: "PROSet Wireless 發行檔"**

A compact Windows utility for scanning Downloads, checking Wi-Fi and Bluetooth version destinations, and explicitly confirming file moves. The interface keeps attention on the current batch, not on configuration or prototype navigation.

**Key Characteristics:**
- One clear scan action followed by a flat, selectable file list.
- Muted neutral surfaces, bark-brown actions, and mint success states.
- Compact, fixed-size typography for filenames and Windows paths.
- No sidebar, dashboard metrics, or competing navigation.

## Colors

The user-provided palette supplies the recognizable accents; warm text and pale neutral surfaces keep dense file data readable.

### Primary
- **Bark Brown:** primary actions and focus indicators.

### Secondary
- **Mint:** successful and ready states; paired with dark mint ink for text.

### Tertiary
- **Harvest Gold:** reserved for review states if added later.
- **Brick Red:** conflicts and errors, always paired with a written status label.

### Neutral
- **Mist Green:** optional soft application ground.
- **Soft Paper:** controls and focused content surfaces.
- **Warm Ink:** primary text.
- **Muted Ink:** secondary labels and metadata.
- **Divider:** row boundaries and quiet control outlines.
- **Surface:** content area behind work regions.

### Named Rules
**The Status-Color Rule.** Color reinforces a written state label; it never carries the meaning alone.

## Typography

**Display Font:** Segoe UI Variable (with Segoe UI and system sans-serif fallbacks)
**Body Font:** Segoe UI Variable (with Segoe UI and system sans-serif fallbacks)
**Label/Mono Font:** Segoe UI Variable for labels; Cascadia Code or Consolas for paths.

**Character:** A familiar Windows workhorse with restrained weight changes. Type sizes are fixed for predictable scanning rather than scaled with viewport width.

### Hierarchy
- **Title** (680, 26px, 1.2): the main task heading.
- **Headline** (650, 19px, 1.3): selected file names and focused content.
- **Section title** (650, 16px, normal): route groups and review sections.
- **Body** (400, 14px, 1.5): explanations and primary content.
- **Label** (600, 11px, 1.4): metadata, status, and compact controls; functional text does not fall below 11px.
- **Meta** (400, 12px, 1.45): secondary form hints and rule details.
- **Mono** (400, 11px, 1.4): file-system paths and code-like values.

### Named Rules
**The Fixed-Ramp Rule.** Keep interface type sizes stable across widths; reflow layout instead of shrinking text.

## Layout

Use one centered, single-column work area. The heading and scan action lead into a source-to-destination strip that lists each fixed product root, followed by scan status, selectable file rows, one confirmation action, and a collapsed recent-moves section. File rows show the full filename, detected product and version, and complete destination path.

On narrow screens, stack the route paths and move each destination beneath its filename. Keep controls full-width where needed; paths wrap rather than causing horizontal page overflow.

## Elevation & Depth

Depth is mostly tonal: paper surfaces, pale green grounds, and thin dividers distinguish work areas. Shadows are limited to floating controls and feedback surfaces.

### Shadow Vocabulary
- **Feedback surface** (`0 5px 16px rgb(52 43 34 / 11%)`): transient toast only.

### Named Rules
**The Flat-By-Default Rule.** File rows and page sections stay flat; use tonal surfaces and dividers before adding elevation.

## Shapes

Controls use restrained 6px corners. File rows and sections remain flat and rectangular so filenames and destinations align cleanly.

## Components

### Buttons
- **Shape:** gently rounded controls (6px).
- **Primary:** bark background, paper text, 38px height, and 13px horizontal padding.
- **Secondary:** paper background, ink text, and a quiet divider outline.
- **Hover / Focus:** slight tonal change on hover; a visible 3px bark focus outline with offset.


### Containers
- **Background:** use the page surface directly; do not frame each file as a card.
- **Border:** thin dividers separate file rows and sections.
- **Shadow:** reserved for transient toast feedback.

### Selection
- **Checkboxes:** native, labeled checkboxes select files; all matching files are selected after a successful scan.
- **Confirmation:** one primary action names the number of files to move.

### File Rows
- **Content:** checkbox, filename, product, version, and destination remain aligned in a compact row.
- **Safety:** only files with an unambiguous supported version appear in the movable list.

## Do's and Don'ts

### Do:
- **Do** show the filename, detected version, destination, and folder-creation state before any move.
- **Do** pair every colored status with readable text.
- **Do** keep scanning, reviewing, and confirming in one page.
- **Do** use the shared palette roles consistently.

### Don't:
- **Don't** imply that an unconfirmed file has moved.
- **Don't** add configuration navigation or rule-management controls to this single-route surface.
- **Don't** rely on color alone for status, or use functional text smaller than 11px.
- **Don't** add dashboard hero metrics, nested cards, or decorative gradients to the file-review surface.