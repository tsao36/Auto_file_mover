---
version: 1
slug: "workbench-html"
primary_target: "workbench.html"
related_targets: []
---

# Scope

Fixed-route PROSet release-file workbench for Windows. Operate mode. Scan Wi-Fi and Bluetooth filenames in Downloads, review version-derived destinations, and confirm local moves.
Fixed-route PROSet Wireless workbench for Windows. Operate mode. Scan Wi-Fi and Bluetooth release filenames in Downloads, review version-derived destinations, and confirm local moves.

# Audience and task

Primary user: a Windows user who downloads Intel PROSet Wireless Wi-Fi and Bluetooth release files into Downloads. They need to verify the product-specific version folder and approve the move.
Primary user: a Windows user who downloads Intel PROSet Wireless Wi-Fi and Bluetooth release files into Downloads. They need to verify the product-specific version folder and approve the move.

# Constraints

Use the user-provided palette: #825B3D, #99DCC5, #E0E6CD, #B79937, #B33D2D. Scan only the top level of Downloads after a manual action. Match case-insensitive `Intel PROSet Wireless Wi-Fi` and `Version Release` phrases and one distinct four-part numeric version. Preview the full destination, select matching files by default, and move only after explicit confirmation. Create a missing major.minor folder and preserve collisions with a numbered suffix. Never read or transmit file contents. Do not add rule creation, GNAI, background scheduling, synthetic data, or prototype layout switching.
Use the user-provided palette: #825B3D, #99DCC5, #E0E6CD, #B79937, #B33D2D. Scan only the top level of Downloads after a manual action. Match exactly one case-insensitive product phrase (`Intel PROSet Wireless Wi-Fi` or `Intel PROSet Wireless Bluetooth`), `Version Release`, and one distinct four-part numeric version. Wi-Fi uses `PROSet WiFi Wireless/<major.minor>`; Bluetooth uses `BlueTooth/BT <major.minor>`. Preview the full destination, select matching files by default, and move only after explicit confirmation. Create a missing version folder and preserve collisions with a numbered suffix. Never read or transmit file contents. Do not add user rule creation, GNAI, background scheduling, synthetic data, or prototype layout switching.

# Direction contract

THESIS: Make the single scan-review-confirm workflow obvious and keep every product-specific destination legible before a real local move.

OWN-WORLD: A quiet Windows utility with compact controls, flat file rows, warm ink, bark-brown primary actions, and mint success states. Avoid side navigation, nested cards, dashboard decoration, and competing colors.

STORY: The user sees Downloads and both fixed product roots, scans, reviews product names and version folders, adjusts selection, and confirms a move. Results and recent moves remain visible and recoverable.

FIRST VIEWPORT: Show the product heading, scan action, source and destination paths, scan state, and matching file rows. Keep the confirmation action visible after a scan. At narrow widths, stack route paths and file destinations without horizontal overflow.

FORM: One single-column workbench with an inline recent-moves disclosure. The scan is manual; every move requires explicit confirmation.

FINISH: verify the scan, move, empty, error, and responsive states against the documented product behavior.
