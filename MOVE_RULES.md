# 搬移規則

`move-rules.json` 是應用程式使用的規則資料來源。每筆規則包含：

- `productName`：預覽與目的地清單顯示的名稱。
- `productPhrase`：檔名必須包含的產品關鍵詞，不區分大小寫。
- `destinationRoot`：目的地根資料夾。可使用 `%USERPROFILE%` 表示目前 Windows 使用者資料夾。
- `destinationRootEnv`：選填的環境變數名稱；設定時會優先使用該路徑。
- `folderPrefix`：加在版本資料夾前的文字，例如 Bluetooth 的 `BT `。

## 共用比對與搬移條件

- 掃描來源資料夾第一層的檔案；預設為 `%USERPROFILE%\Downloads`。
- 檔名須包含 `Version Release` 和且僅能匹配一個規則的 `productPhrase`，比對不區分大小寫。
- 檔名須包含唯一一種四段數字版本，例如 `24.80.1.2`。重複相同版本可接受，多種不同版本不搬移。
- 目的版本資料夾由版本號前兩段組成，例如 `24.80.1.2` 會使用 `24.80`；`folderPrefix` 會加在前面。
- 掃描會先預覽完整目的地。只有使用者明確確認的檔案才會移動。
- 若目的檔名已存在，會加上編號後綴，不覆寫。若檔案在預覽後變更或消失，會保留來源並要求重新掃描。
- 新規則由工作台新增並儲存在此 JSON 檔。目的地必須是絕對路徑；版本格式和移動安全檢查不可在介面中變更。

## 目前規則

| 名稱 | 檔名關鍵詞 | 目的地根目錄 | 版本資料夾前綴 |
| --- | --- | --- | --- |
| PROSet Wi-Fi | `Intel PROSet Wireless Wi-Fi` | `%USERPROFILE%\OneDrive - Intel Corporation\Tech Doc\Wireless SW\PROSet WiFi Wireless` | 無 |
| PROSet Bluetooth | `Intel PROSet Wireless Bluetooth` | `%USERPROFILE%\OneDrive - Intel Corporation\Tech Doc\Wireless SW\BlueTooth` | `BT ` |
