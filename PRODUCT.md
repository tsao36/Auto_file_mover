# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Single-page HTML/CSS/JavaScript served by a local Node.js service. The service scans and moves files on the same Windows device.

## Users

Inferred from the brief: Windows 11 users who save email attachments to a local folder and want to organize them without repeatedly navigating to destination folders. Specific occupations and accessibility requirements have not been established.

## Product Purpose

Move Intel PROSet Wireless Wi-Fi and Bluetooth release files from Downloads into product-specific version folders. Success means users can review the filename-derived destination and confirm the move without browsing folders manually.

## Positioning

A local-first, preview-before-move utility with two initial PROSet release rules and support for adding local filename-based rules. It does not inspect file contents or move files in the background.

## Operating Context

- The app runs on Windows and uses a loopback Node.js service for local filesystem access.
- A user starts each scan manually. The service scans regular files in the top level of `%USERPROFILE%\Downloads`; it does not watch or schedule scans.
- An eligible filename contains `Version Release`, exactly one configured product phrase, and exactly one distinct four-part numeric version such as `24.80.1.2`, all case-insensitive except the numeric version. Repeated occurrences of the same version are allowed; multiple distinct versions or matching rules are ignored.
- Rules are stored in `move-rules.json`; users can add a product phrase, destination root, and version-folder prefix from the workbench. The first two version components determine the destination subfolder.
- The initial Wi-Fi and Bluetooth rules use `%USERPROFILE%\OneDrive - Intel Corporation\Tech Doc\Wireless SW\PROSet WiFi Wireless\<major.minor>` and `%USERPROFILE%\OneDrive - Intel Corporation\Tech Doc\Wireless SW\BlueTooth\BT <major.minor>`.
- The scan previews every eligible file and its destination before movement. Users may deselect files and must explicitly confirm the move.
- Create the version folder when needed. Never overwrite an existing destination file; append a numbered suffix to the incoming filename instead.
- If a file changes or disappears after preview, do not move it; ask the user to scan again. Other failed moves leave the source file available for retry.
- Keep recent successful-move history in browser local storage. Do not send filenames, paths, or file contents to an external service.

## Capabilities and Constraints

- File matching and destination selection are deterministic and run locally using `move-rules.json`; only filenames and file metadata are read.
- The move API accepts filenames from the configured source directory, revalidates the preview metadata, and derives the destination from a saved rule on the server. It does not accept arbitrary source or destination paths from move requests.
- Files with no unique matching version remain in Downloads and are not shown as movable.
- The application has no GNAI integration, automatic watcher, schedule, or undo flow. Rule editing is limited to adding rules; existing rules are maintained in `move-rules.json`.
- Recent successful moves are kept locally in the browser; this history is informational and does not provide undo.

## Brand Commitments

Use the user-provided theme colors: `#825B3D`, `#99DCC5`, `#E0E6CD`, `#B79937`, and `#B33D2D`.

## Evidence on Hand

A matching PROSet release PDF exists in the configured Downloads folder and was verified through a read-only scan. It has not been moved. No product logo or other brand assets have been provided.
A matching Wi-Fi release PDF and Bluetooth release PDF exist in the configured Downloads folder and were verified through a read-only scan. Neither has been moved. No product logo or other brand assets have been provided.

## Product Principles

- Preview and clear user intent come before file movement.
- Never overwrite or silently misroute a file.
- Keep file metadata local to the user's device.
- Make scan status and failed moves visible and recoverable.