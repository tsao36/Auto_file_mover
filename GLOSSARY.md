# PROSet Release Routing

This context names the files and destinations used by the local PROSet release-file routing workflow.

## Language

**PROSet release file**:
A file whose name contains exactly one supported product phrase (`Intel PROSet Wireless Wi-Fi` or `Intel PROSet Wireless Bluetooth`), `Version Release`, and one distinct four-part numeric version. Repeated occurrences of the same version do not make it ambiguous.
_Avoid_: PROSet rule match

**Version folder**:
The destination subfolder named with the first two components of a PROSet release file's version, such as `24.80`; Bluetooth version folders add the `BT ` prefix.
_Avoid_: full-version folder

**Destination root**:
One of the fixed PROSet Wi-Fi or Bluetooth release destinations; each product's version folders are located directly beneath its root.
_Avoid_: user rule destination

**Move preview**:
The list of eligible PROSet release files, their detected versions, and their destinations shown before movement is confirmed.
_Avoid_: simulated move

**Confirmed move**:
The user's approval to move selected files from Downloads into their version folders.
_Avoid_: automatic move