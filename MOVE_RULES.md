# 搬移規則

`move-rules.json` 是應用程式使用的規則資料來源。每筆規則包含：

- `productName`：預覽與目的地清單顯示的名稱。
- `productPhrases`：檔名必須包含的片語清單；每個片語都必須出現，不區分大小寫且順序不限。舊版 `productPhrase` 字串仍會視為只含一個片語的清單。
- `destinationRoot`：目的地根資料夾。可使用 `%USERPROFILE%` 表示目前 Windows 使用者資料夾。
- `destinationRootEnv`：選填的環境變數名稱；設定時會優先使用該路徑。
- `folderPrefix`：加在版本資料夾前的文字，例如 Bluetooth 的 `BT `。
- `requireVersionRelease`：是否要求檔名包含 `Version Release`；舊規則未設定時預設為 `true`。
- `requireVersion`：是否要求檔名包含版本號；舊規則未設定時預設為 `true`。設為 `false` 時，無版本號的檔案會直接放入 `destinationRoot`。

## 共用比對與搬移條件

- 掃描來源資料夾第一層的檔案；預設為 `%USERPROFILE%\Downloads`。
- 檔名須符合且僅符合一條規則；該規則中的每個 `productPhrases` 片語都必須出現，比對不區分大小寫且順序不限。
- 依規則設定，檔名可能需要包含 `Version Release`。若 `requireVersion` 為 `true`（預設），版本須是唯一的一種兩段數字（可有 `v` 前綴）或四段數字，例如 `24.90`、`v24.90` 或 `24.80.1.2`；重複相同版本可接受，多種不同版本不搬移。若 `requireVersion` 為 `false` 且檔名未包含單一版本號，則直接移動至 `destinationRoot`。
- 目的版本資料夾由版本號前兩段組成，例如 `24.80.1.2` 會使用 `24.80`，`v24.90` 會使用 `24.90`；`folderPrefix` 會加在前面。
- 掃描會先預覽完整目的地。只有使用者明確確認的檔案才會移動。
- 若目的檔名已存在，會加上編號後綴，不覆寫。若檔案在預覽後變更或消失，會保留來源並要求重新掃描。
- 規則可由工作台新增、編輯或刪除，並儲存在此 JSON 檔；可刪除所有規則。目的地必須是絕對路徑；版本格式和移動安全檢查不可在介面中變更。

## 目前規則

| 名稱 | 必須片語（全部符合） | 要求 `Version Release` | 目的地根目錄 | 版本資料夾前綴 |
| --- | --- | --- | --- | --- |
| PROSet Wi-Fi | `Intel PROSet Wireless Wi-Fi` | 是 | `%USERPROFILE%\OneDrive - Intel Corporation\Tech Doc\Wireless SW\PROSet WiFi Wireless` | 無 |
| PROSet Bluetooth | `Intel PROSet Wireless Bluetooth` | 是 | `%USERPROFILE%\OneDrive - Intel Corporation\Tech Doc\Wireless SW\BlueTooth` | `BT ` |
| PROSet Wi-Fi Performance Data | `Intel PROSetWireless WiFi` + `Performance Data` | 否 | `%USERPROFILE%\OneDrive - Intel Corporation\Tech Doc\Wireless SW\PROSet WiFi Wireless` | 無 |
