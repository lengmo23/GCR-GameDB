# WeGame 与网易客户端审核（2026-11-08）

## 范围与结果

本次只审 Steam 以外的客户端：WeGame（按 Rail `game_id`）与网易（没有本机平台 ID，按 slug）。新增 **27 条 verified 记录**：WeGame 23 条、网易 4 条。正式库共 62 条记录，其中 61 条 verified、1 条 rejected。

GCR 对这两类记录的用法不同：

- **WeGame**：扫描 `rail_apps` 目录（`rail_files/rail_game_identify.json`）或 `Software\Rail` 注册表拿到 `game_id`，查到 verified 记录就用记录里的 EXE 作主程序。
- **网易 / 独立安装**：没有平台 ID，只在本机已经有独立安装证据（Windows 卸载记录、App Paths、已知游戏目录）时，核对记录给出的主 EXE 是否在那个安装目录里；写了 `relativePath` 的只认那个位置。名字或 EXE 名都不单独成立。

## 证据来源

**WeGame**：WeGame 商店页本身调用的游戏信息接口 `wegame.com.cn/api/rail/web/data_filter/game_info/by_game_id`，按 `game_id` 返回游戏名、`loader_path` / `multi_loader`（WeGame 的启动配置）、`file_signatures_1`（WeGame 用来认安装目录的文件）与 `acc_exe_paths`（加速的进程列表）。这是平台官方元数据，相当于 Steam 的 launch 配置。`loader_path` 本身就是游戏时直接采用；指向 TCLS / 登录器 / 启动器时，从 `file_signatures_1` 与 `acc_exe_paths` 里取游戏进程，并把启动器、登录器、补丁器、反作弊启动器逐项排除（写在每条记录的 `manual_review` 里）。只逐个查询了商店页面、热搜列表上出现的游戏和少量已知 ID，没有遍历 ID 段。

**网易**：网易客服与官网都不写主程序文件名。三款同时在 Steam 上架的游戏用 Steam PICS appinfo 的 `config.launch`（平台官方元数据，启动项就是游戏本体而不是启动器）；第五人格不在 Steam 上，用两个独立来源（BWIKI、Lutris 安装脚本）。

| 记录 | 主 EXE | 依据 |
| --- | --- | --- |
| `wegame:1` 地下城与勇士 | `dnf.exe` | `loader_path` |
| `wegame:3` 斗战神 | `Asura.exe` | `acc_exe_paths`；loader 是 TCLS |
| `wegame:17` QQ飞车 | `Releasephysx27_64/GameApp.exe`、`Releasephysx27/GameApp.exe` | `acc_exe_paths`；loader 是 `QQSpeed_loader.exe` |
| `wegame:18` 寻仙 | `release/tty3d.exe` | `acc_exe_paths`；loader 是 `patcher.exe` |
| `wegame:26` 英雄联盟 | `Game/League of Legends.exe` | `file_signatures_1`；loader 是 TCLS |
| `wegame:30` 逆战 | `Binaries/Win64/TGame.exe` | `loader_path` |
| `wegame:2000717` 三国杀 | `Sgsc10th.exe` | `loader_path` |
| `wegame:2001097` 龙之谷 | `DragonNest.exe` | `acc_exe_paths`；loader 是盛趣登录器 |
| `wegame:2001142` 从军 | `win64/enlisted.exe` | `loader_path` |
| `wegame:2001470` 装甲战争 | `bin64/armoredwarfare.exe` | `loader_path` |
| `wegame:2001619` 黑色沙漠 | `bin64/BlackDesert64_CN.exe` | `loader_path` |
| `wegame:2001688` 暗区突围：无限 | `UAGame/Binaries/Win64/UAGame.exe` | `acc_exe_paths`；loader 是 `GameLoader.exe` |
| `wegame:2001715` 无畏契约 | `live/ShooterGame/Binaries/Win64/VALORANT-Win64-Shipping.exe` | `acc_exe_paths`；loader 是登录器 |
| `wegame:2001788` 新天龙八部怀旧服 | `Bin/Game.exe` | `multi_loader`；loader 是 `Launch.exe` |
| `wegame:2001918` 三角洲行动 | `DeltaForceClient-Win64-Test.exe`、`-Shipping.exe` | `loader_path` 与 `multi_loader` |
| `wegame:2001933` 异人之下 | `YiRenZhiXia.exe` | `loader_path` |
| `wegame:2002052` 流放之路：降临 | `PathOfExile_x64.exe` | `loader_path` |
| `wegame:2002130` 逆战：未来 | `NZM/Binaries/Win64/NZMClient.exe` | `loader_path` |
| `wegame:2002270` 终极角逐 | `Discovery/Binaries/Win64/Discovery.exe` | `loader_path` |
| `wegame:2002433` 天堂2：盟约 | `LM/Binaries/Win64/L2M.exe` | `loader_path` |
| `wegame:2002729` 轩辕传奇怀旧服 | `XYClient.exe` | `loader_path` |
| `wegame:2002867` 金铲铲之战 | `x64/package/jkchess_hd.exe` | `loader_path` |
| `wegame:2008400` 黑白之地 | `Xanadu.exe` | `loader_path` |
| `netease:once-human` 七日世界 | `ONCE_HUMAN.exe` | Steam 2139460 `config.launch` |
| `netease:where-winds-meet` 燕云十六声 | `wwm.exe` | Steam 3564740 `config.launch`（`Engine\Binaries\Win64r\wwm.exe`）；另有攻略佐证 |
| `netease:sword-of-justice` 逆水寒（Steam 上的 SWORD OF JUSTICE） | `nshm.exe` | Steam 2782500 `config.launch` |
| `netease:identity-v` 第五人格 | `dwrg.exe` | BWIKI PC 页、Lutris 安装脚本；`dwrg_repair.exe` 排除 |

## 没有收录的

- 梦幻西游、大话西游2、倩女幽魂、天下3、逆水寒端游：找不到可复核的主程序出处，GamePP 名单里的 `xy2.exe`、`nshm.exe` 等名字只说明「某个游戏用这个名字」，不能证明属于哪款游戏。
- WeGame 上的 `奇迹MU`（只列出 `mulauncher.exe`）、`失控进化`（多个候选进程无法区分）、`洛克王国：世界`（根目录启动壳与 Unreal 本体并列）、`机甲战队`（列表里混有 SDK 演示程序）、两款手游模拟器：证据不足以确定主程序。
- 燕云十六声没写 `relativePath`：Steam 版的目录是 `Engine\Binaries\Win64r`，网易自有客户端的目录结构没有确认。
