# GamePP 候选 Steam 启动项审核（2026-11-13）

## 范围与结果

从 [候选库](../candidates/gamepp-type1.json) 里挑出 93 个对应热门 Steam 游戏的进程名，逐个按 AppID 查两份平台官方数据：

- Steam 商店 `appdetails`：必须 `type=game`、支持 Windows；
- Steam PICS appinfo（经 `api.steamcmd.net` 转发）：`common.type` 为 Game，且**默认分支**上的 Windows 启动项文件名与候选名完全一致（大小写不敏感）。`relativePath` 直接取该启动项路径，没有子目录的不写。

新增 **40 条 verified 记录**，正式库共 102 条记录。游戏名取自 `appdetails`（英文与简体中文），不采用候选名或搜索结果。只在 beta 分支、或在启动器之外的备选启动项里出现的候选名不算命中。

| Steam AppID / 游戏 | 主 EXE（PICS 启动项） | 启动项编号 |
| --- | --- | --- |
| [990080](https://store.steampowered.com/app/990080/) Hogwarts Legacy | `HogwartsLegacy.exe` | 13 |
| [570](https://store.steampowered.com/app/570/) Dota 2 | `game/bin/win64/dota2.exe` | 1 |
| [814380](https://store.steampowered.com/app/814380/) Sekiro™: Shadows Die Twice - GOTY Edition | `sekiro.exe` | 0 |
| [374320](https://store.steampowered.com/app/374320/) DARK SOULS™ III | `Game/DarkSoulsIII.exe` | 0 |
| [105600](https://store.steampowered.com/app/105600/) Terraria | `Terraria.exe` | 0 |
| [892970](https://store.steampowered.com/app/892970/) Valheim | `valheim.exe` | 1 |
| [227300](https://store.steampowered.com/app/227300/) Euro Truck Simulator 2 | `bin/win_x64/eurotrucks2.exe` | 0 |
| [1551360](https://store.steampowered.com/app/1551360/) Forza Horizon 5 | `ForzaHorizon5.exe` | 0 |
| [1326470](https://store.steampowered.com/app/1326470/) Sons Of The Forest | `SonsOfTheForest.exe` | 0 |
| [1966720](https://store.steampowered.com/app/1966720/) Lethal Company | `Lethal Company.exe` | 0 |
| [739630](https://store.steampowered.com/app/739630/) Phasmophobia | `Phasmophobia.exe` | 2 |
| [945360](https://store.steampowered.com/app/945360/) Among Us | `Among Us.exe` | 0 |
| [359550](https://store.steampowered.com/app/359550/) Tom Clancy's Rainbow Six Siege | `RainbowSix.exe` | 0 |
| [2357570](https://store.steampowered.com/app/2357570/) Overwatch® | `Overwatch.exe` | 0 |
| [550](https://store.steampowered.com/app/550/) Left 4 Dead 2 | `left4dead2.exe` | 0 |
| [620](https://store.steampowered.com/app/620/) Portal 2 | `portal2.exe` | 0 |
| [397540](https://store.steampowered.com/app/397540/) Borderlands 3 | `OakGame/Binaries/Win64/Borderlands3.exe` | 5 |
| [1151640](https://store.steampowered.com/app/1151640/) Horizon Zero Dawn™ Complete Edition | `HorizonZeroDawn.exe` | 4 |
| [2420110](https://store.steampowered.com/app/2420110/) Horizon Forbidden West™ Complete Edition | `HorizonForbiddenWest.exe` | 2 |
| [1817070](https://store.steampowered.com/app/1817070/) Marvel’s Spider-Man Remastered | `Spider-Man.exe` | 0 |
| [1817190](https://store.steampowered.com/app/1817190/) Marvel’s Spider-Man: Miles Morales | `MilesMorales.exe` | 0 |
| [239140](https://store.steampowered.com/app/239140/) Dying Light | `DyingLightGame.exe` | 0 |
| [524220](https://store.steampowered.com/app/524220/) NieR:Automata™ | `NieRAutomata.exe` | 0 |
| [601150](https://store.steampowered.com/app/601150/) Devil May Cry 5 | `DevilMayCry5.exe` | 0 |
| [1203620](https://store.steampowered.com/app/1203620/) Enshrouded | `enshrouded.exe` | 0 |
| [275850](https://store.steampowered.com/app/275850/) No Man's Sky | `Binaries/NMS.exe` | 0 |
| [2215430](https://store.steampowered.com/app/2215430/) Ghost of Tsushima DIRECTOR'S CUT | `GhostOfTsushima.exe` | 0 |
| [1145350](https://store.steampowered.com/app/1145350/) Hades II | `Ship/Hades2.exe` | 2 |
| [1325200](https://store.steampowered.com/app/1325200/) Nioh 2 – The Complete Edition | `nioh2.exe` | 0 |
| [242760](https://store.steampowered.com/app/242760/) The Forest | `TheForest.exe` | 0 |
| [108600](https://store.steampowered.com/app/108600/) Project Zomboid | `ProjectZomboid64.exe` | 8 |
| [233860](https://store.steampowered.com/app/233860/) Kenshi | `kenshi_x64.exe` | 0 |
| [264710](https://store.steampowered.com/app/264710/) Subnautica | `Subnautica.exe` | 0 |
| [848450](https://store.steampowered.com/app/848450/) Subnautica: Below Zero | `SubnauticaZero.exe` | 0 |
| [268910](https://store.steampowered.com/app/268910/) Cuphead | `Cuphead.exe` | 0 |
| [504230](https://store.steampowered.com/app/504230/) Celeste | `Celeste.exe` | 0 |
| [1794680](https://store.steampowered.com/app/1794680/) Vampire Survivors | `VampireSurvivors.exe` | 0 |
| [2221490](https://store.steampowered.com/app/2221490/) Tom Clancy’s The Division® 2 | `TheDivision2.exe` | 0 |
| [379430](https://store.steampowered.com/app/379430/) Kingdom Come: Deliverance | `Bin/Win64/KingdomCome.exe` | 0 |
| [1771300](https://store.steampowered.com/app/1771300/) Kingdom Come: Deliverance II | `Bin/Win64MasterMasterSteamPGO/KingdomCome.exe` | 0 |

《天国：拯救》与《天国：拯救2》主程序同名，两条记录各自写了不同的 `relativePath`，客户端按路径结尾区分。

## 未通过的候选（留在候选文件）

**启动项指向启动器、反作弊引导程序或启动壳**，候选名与启动项不一致，本次不写记录（规则 B 不成立不代表不是游戏，需要发行商文档或两个独立来源另审）：

- 反作弊引导：`eldenring.exe`、`helldivers2.exe`、`LostArk.exe`、`armoredcore6.exe`（`start_protected_game.exe`）；`BattleBit.exe`、`InsurgencyClient-Win64-Shipping.exe`（EAC 入口）；`ArkAscended.exe`（默认入口是 BattlEye 版）。
- 启动器：`GTA5.exe`（`PlayGTAV.exe`）、`RDR.exe`（`PlayRDR.exe`）、`witcher3.exe`（`redprelauncher.exe`）、`tlou-i.exe`（`launcher.exe`）、`ffxiv_dx11.exe`（`ffxivboot.exe`）、`Cities.exe` / `Cities2.exe` / `hoi4.exe` / `eu4.exe` / `ck3.exe` / `victoria3.exe`（Paradox `dowser.exe`）、`CivilizationVI.exe`、`Warhammer3.exe`、`ConanSandbox.exe`、`7daystodie.exe`、`SquadGame.exe`、`Chivalry2-Win64-Shipping.exe`。
- Unreal 启动壳（启动项是 `<X>.exe`，候选是 `<X>-Win64-Shipping.exe`，只算一个来源）：`Palworld`、`b1`（黑神话：悟空）、`DeadByDaylight`、`FactoryGame`、`ReadyOrNot`、`Remnant2`、`DeadIsland`、`Mordhau`、`FSD`。
- 文件名不同：`RustClient.exe`（`rust.exe`）、`PathOfExile_x64Steam.exe`（`PathOfExileSteam.exe`）、`ff7remake_.exe` / `ff7rebirth_.exe`、`SoTGame.exe`、`Control_DX12.exe`、`HuntGame.exe`、`RimWorldWin64.exe`、`WWZ.exe`。
- 启动项是 `steam2ea://` 协议：`bf1.exe`、`bfv.exe`、`BF2042.exe`、`FC24.exe`。
- PICS 没有启动项：`NarakaBladepoint.exe`（网易版已有记录）。

**启动项一致但不收录**：

- 同名 EXE 属于多款游戏、且启动项在根目录无法用路径区分：`hl2.exe`（多款 Source 游戏共用）、`insurgency.exe`（《叛乱：沙漠风暴》根目录也有 `Insurgency.exe`）。
- 主干太短、容易与其它程序重名，且启动项在根目录无法写 `relativePath`：`gow.exe`、`u4.exe`、`re2.exe`、`Raft.exe`。
- `Discovery.exe`（THE FINALS）：名字易重名，Steam 启动项在根目录；WeGame 版已有带路径的记录。

本次没有修改候选文件，没有写 `rejected` 记录。
