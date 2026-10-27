---
version: 1
slug: "prototype-html"
primary_target: "prototype.html"
related_targets: []
---

# Scope

First-surface prototype for the Windows 11 file-routing app. Operate mode. Desktop-first web UI comparing three materially different ways to review newly scanned files; all sample data and file actions are simulated.

# Audience and task

Inferred primary user: a Windows 11 user who downloads email attachments into a dedicated local folder. They need to identify rule matches, verify destinations, and safely approve moving files. The first viewport must make the review task and its safety boundary clear.

# Constraints

Use the user-provided palette: #825B3D, #99DCC5, #E0E6CD, #B79937, #B33D2D. Keep filenames, counts, destinations, and activity visibly synthetic. The destination picker may retain a browser directory handle and folder name in memory, but must not enumerate or read folder contents, move files, or persist access. Simulated movement history is stored in browser local storage and exportable as JSON; never present it as a real file operation. No email integration or background scheduling in this prototype. Don't imply automatic rules have been enabled.

# Direction contract

THESIS: Compare three distinct ways to review one batch of incoming attachments, proving that each file's match, destination, and safety state can be understood before a simulated move. Refuse a generic dashboard that hides the file-routing task.

OWN-WORLD: A Windows workbench with precise, compact controls and the supplied mixed palette: E0E6CD is the pale ground, 825B3D carries navigation and primary ink, 99DCC5 marks ready states, B79937 signals review, and B33D2D marks conflicts or failures. Keep repeated file records scannable and avoid nested cards.

STORY: The user sees the synthetic source and scan time, reviews files and rule matches, catches unmatched or conflicting items, selects safe files, and confirms a simulated move. Every variant shows the same facts and in-memory action result.

FIRST VIEWPORT: At desktop width, show the app rail, a clear “待確認檔案” heading, synthetic-source badge, scan summary, and the variant's dominant review structure. Keep selected count and the primary simulated-move command visible without obscuring file details. At narrow widths, preserve the same hierarchy in a single column.

FORM: Three switchable structures, drawn from surface concept seed 42e155a4 (dealt indices 5, 2, 7): destination-grouped route lanes; a file queue with a persistent detail inspector; and one-file-at-a-time review. The winning production structure remains undecided until user feedback.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
