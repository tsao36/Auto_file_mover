# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: single-file HTML/CSS/JavaScript for a throwaway UI prototype that opens locally without a framework; no production stack is selected.

## Users

Inferred from the brief: Windows 11 users who save email attachments to a local folder and want to organize them without repeatedly navigating to destination folders. Specific occupations and accessibility requirements have not been established.

## Product Purpose

Move files from a dedicated local folder to user-appointed destinations using rules based on filename keywords and file extensions. Success means users can safely route newly downloaded attachments without manually browsing to the destination each time.

## Positioning

Local-first file routing applies user-defined filename rules to files in a designated folder, with preview and confirmation before movement and optional per-rule automation after validation. The first release does not integrate with email accounts or inspect file contents.

## Operating Context

- The intended application runs on Windows 11 with a web-based interface and local file access.
- The default source is the user's Downloads folder. The provisional scope is one source folder, scanning its top level only.
- The intended schedule is once daily at 18:00 local time, catching up on the next launch if the computer was off. The app is intended to start at sign-in in the system tray; users can also scan immediately.
- Process only files added since the last successful scan. Wait until a download is stable before processing it and ignore temporary download files.
- A rule can match any or all configured keywords, using case-insensitive filename substring matching. An extension filter is optional.
- Unmatched files stay in the source. If rules conflict, pause automatic movement and ask the user. On a destination name collision, preserve both files by renaming the incoming copy.
- Track per-file results; retain failed files for retry, and provide operation history and undo when safe. Keep settings, rules, and history on the local device.
- These are confirmed or user-approved product defaults; exact installer, desktop shell, scheduler implementation, and retry timing remain undecided.

## Capabilities and Constraints

- The first release is intended to offer a preview-first workflow. A rule must be simulated and explicitly enabled before it can move future matching files automatically.
- Manual review remains available. Enabled automatic rules move matching new files and report a summary; conflicts and failures remain pending.
- The current prototype uses synthetic sample files and simulated actions; it does not read or move real files. Its destination picker may retain a browser directory handle and folder name in memory, but it does not enumerate folder contents or persist access. Confirmed simulated moves and their simulated reversals are stored in browser local storage, can be filtered by date, file type, and filename, then exported together as JSON.
- The prototype's user and single-file stack choices are inferred/delegated because the user could not answer the structured follow-up. They are not production architecture decisions.

## Brand Commitments

Use the user-provided theme colors: `#825B3D`, `#99DCC5`, `#E0E6CD`, `#B79937`, and `#B33D2D`.

## Evidence on Hand

No real files, customer data, product logo, or other brand assets have been provided. Any filenames, counts, destinations, and activity shown in the prototype must be clearly synthetic.

## Product Principles

- Preview and clear user intent come before file movement.
- Never overwrite or silently misroute a file.
- Keep rules and file metadata local to the user's device.
- Make scan status, rule matches, and failures visible and recoverable.