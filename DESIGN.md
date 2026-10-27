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

**Creative North Star: "本機檔案工作台（暫定）"**

This name is a working description inferred from the product brief, not an approved product or brand name. The interface is a Windows-oriented workbench for reviewing files, rule matches, and destinations. It favors clear task state and recoverable actions over dashboard decoration.

The system has been extracted from a comparative UI prototype. Color roles and shared controls are reusable; the destination-grouped, inspector, and one-file review layouts are alternatives, not a selected production layout.

**Key Characteristics:**
- Task-first hierarchy with a persistent navigation rail on wide screens.
- Muted green surfaces balanced by bark-brown actions and distinct status colors.
- Compact, fixed-size workhorse typography with legible labels.
- Flat file rows and route groups; elevation is reserved for overlays and controls.

## Colors

The user-provided palette supplies the recognizable accents; warm text and pale neutral surfaces keep dense file data readable.

### Primary
- **Bark Brown:** navigation, primary actions, and the active filter.

### Secondary
- **Mint:** ready-to-preview states; paired with dark mint ink for text.

### Tertiary
- **Harvest Gold:** rule review and attention states; use dark gold ink for readable labels.
- **Brick Red:** conflicts and errors, always paired with a written status label.

### Neutral
- **Mist Green:** application ground and selected navigation surface.
- **Soft Paper:** raised content surfaces and controls.
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

The wide-screen workbench pairs a 224px navigation rail with a flexible content area. A task header, source and scan summary, filters, then the active review structure establish a consistent reading order. Route groups use two columns when space permits; the inspector and one-file views use split or stacked layouts. The three structures are prototype choices, not a production mandate.

Responsive transitions are implemented at 1050px, 780px, and 540px. Narrow layouts collapse navigation into a horizontal strip and place the main work area in its own scroll region, leaving a reserved bottom zone for the prototype switcher. Summary values, filters, filenames, and actions reflow without horizontal page overflow.

## Elevation & Depth

Depth is mostly tonal: paper surfaces, pale green grounds, and thin dividers distinguish work areas. Shadows are limited to floating controls and feedback surfaces.

### Shadow Vocabulary
- **Floating control** (`0 5px 9px rgb(52 43 34 / 18%)`): prototype switcher, confirmation dialog, and transient toast.
- **Selection action** (`0 5px 16px rgb(52 43 34 / 11%)`): the batch action bar only.

### Named Rules
**The Flat-By-Default Rule.** File rows and page sections stay flat; use tonal surfaces and dividers before adding elevation.

## Shapes

Controls use restrained 6px corners, status badges use 4px corners, and the floating prototype switcher and dialog use 8px corners. Row and section geometry stays rectangular so filenames and destinations align cleanly.

## Components

### Buttons
- **Shape:** gently rounded controls (6px).
- **Primary:** bark background, paper text, 38px height, and 13px horizontal padding.
- **Secondary:** paper background, ink text, and a quiet divider outline.
- **Hover / Focus:** slight tonal change on hover; a visible 3px bark focus outline with offset.

### Chips
- **Style:** compact status labels with 4px corners and a colored surface.
- **State:** mint for ready, gold for review, brick for conflict; every state includes text and an icon.

### Containers
- **Background:** paper for file groups and panels; mist or surface for the surrounding work area.
- **Border:** thin divider lines define route groups and rows; no nested card framing.
- **Shadow:** reserved for floating actions, the prototype switcher, dialogs, and toast feedback.

### Inputs
- **Style:** paper field, thin divider outline, 6px corners, and 36px minimum height.
- **Focus:** visible bark outline; search stays usable while filtering every review structure.

### Navigation
- **Wide screens:** bark rail with a mist active item and 16px Lucide line icons.
- **Narrow screens:** horizontal navigation strip with labels and counts; main work content scrolls independently.

### File Rows
- **Selection:** checkbox, extension marker, filename, metadata, and status remain aligned in a compact row.
- **Safety:** conflict and unmatched rows are not selectable for movement.

## Do's and Don'ts

### Do:
- **Do** show the filename, matching rule, destination, and state before any move.
- **Do** pair every colored status with readable text.
- **Do** keep the preview action visible in the task header and retain batch context below the review list.
- **Do** use the shared palette roles consistently across all three prototype layouts.

### Don't:
- **Don't** imply that this UI prototype reads or moves real files.
- **Don't** auto-move conflicts or files with no matching rule.
- **Don't** rely on color alone for status, or use functional text smaller than 11px.
- **Don't** add dashboard hero metrics, nested cards, or decorative gradients to the file-review surface.