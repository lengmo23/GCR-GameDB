# GCR-GameDB

GameCoreRouter（GCR）与 Game2PL 共用的社区游戏身份库（原仓库名 `Game2PL-GameDB`，GitHub 会把旧地址重定向过来）。

这个目录是社区游戏身份库的仓库原型。`records` 是可审查的数据源，`generated/gamedb-v1.json` 是客户端读取的生成物。

数据库事实记录采用 CC0-1.0，构建与校验脚本采用 MIT；详情见 `LICENSE-DATA` 和 `LICENSE-CODE`。

- `verified`：只有平台 ID 与本机安装证据同时匹配时才能参与识别。
- `pending`：不能进入发布索引，也不能触发 Process Lasso 写入。
- `rejected`：明确的非游戏，用于阻止误判。
- `deprecated`：被替换或合并的旧记录。

`verified` 记录只收录有可复核证据的 Windows 主游戏进程。没有公开稳定平台 ID 的独立客户端使用小写连字符 slug 作为 `platformId`；该 slug 仅用于数据库身份，不会仅凭 EXE 文件名判定本机程序为游戏。启动器、更新器、助手与反作弊服务不进入 `executables`。

运行 `npm run build` 生成索引。发布前应按 `REVIEWING.md` 审核证据；不能仅凭候选 EXE 名称将记录升级为 `verified`。

## 校验文件

`npm run build` 同时生成 `generated/gamedb-v1.json.sha256` 与 `candidates/gamepp-type1.json.sha256`（`sha256sum` 格式）。客户端从主源（raw.githubusercontent.com）或镜像（jsDelivr）下载数据文件后，从同一来源取对应的 `.sha256` 核对，不一致或取不到就换下一个来源，全部失败时继续用本机缓存。哈希按仓库里存的 LF 字节计算，`.gitattributes` 把 `*.json` 与 `*.sha256` 固定为 LF；改了数据文件必须重新 `npm run build` 并把 `.sha256` 一起提交，CI 会检查两者是否一致。

## GamePP 进程名候选

`candidates/gamepp-type1.json` 保存从本机 GamePP 数据库导入、经过明显非游戏进程过滤的候选 EXE 名称，并附有来源哈希和逐项剔除原因。它只表示 GamePP 将该进程标为启用的 `type=1`；同名文件可能属于不同软件，候选不能单独证明游戏身份或本机安装。

这份候选不属于 `records` 中经证据审核的游戏身份记录，`npm run build` 不会把它写入 `generated/gamedb-v1.json`，也不会触发平台扫描或 Process Lasso 规则。客户端只把它当**运行中识别的辅助证据**：进程名命中之外，还必须同时有可见窗口、已加载 D3D11/D3D12/Vulkan、内存 ≥500 MB 才认作游戏，`game.exe` 这类通用名不算命中。GamePP 来源数据不按本仓库的 CC0 游戏身份记录授权。

更新候选时，在 `gamedb` 目录运行 `D:/Anaconda3/envs/pytorch/python.exe tools/import-gamepp.py <GamePP0.dat路径>`，再运行 `npm run build` 刷新校验文件。脚本只读数据库，选择 `WhiteBlack` 表中 `type=1` 且 `on_off=1` 的记录；仅保留有效 EXE 文件名，过滤可明确识别的启动器、编辑器、跑分程序、安装器、服务、重复 `.exe` 扩展名，以及同库已有原名的 `(2)` 等编号副本。无法仅凭文件名判断的条目继续保留为待审候选。

审核记录见 `reviews/gamepp-type1-2026-10-26.md` 与 `reviews/gamepp-type1-2026-10-28.md`。未证实的名称仍留在候选文件中。WeGame 与网易客户端的审核见 `reviews/wegame-netease-2026-11-08.md`。
