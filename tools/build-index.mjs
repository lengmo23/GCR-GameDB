import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const recordsRoot = join(root, "records");

async function jsonFiles(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await jsonFiles(path));
    else if (entry.isFile() && entry.name.endsWith(".json")) result.push(path);
  }
  return result;
}

const records = [];
const ids = new Set();
for (const path of await jsonFiles(recordsRoot)) {
  const record = JSON.parse(await readFile(path, "utf8"));
  if (record.schemaVersion !== 1 || typeof record.id !== "string" || typeof record.status !== "string")
    throw new Error(`Invalid record: ${relative(root, path)}`);
  if (ids.has(record.id)) throw new Error(`Duplicate id: ${record.id}`);
  if (record.id !== `${record.platform}:${record.platformId}`)
    throw new Error(`ID mismatch: ${relative(root, path)}`);
  ids.add(record.id);
  records.push(record);
}
records.sort((left, right) => left.id.localeCompare(right.id, "en"));

const output = {
  schemaVersion: 1,
  generatedAt: `${records.map(record => record.lastVerified || "1970-01-01").sort().at(-1)}T00:00:00.000Z`,
  records
};
await mkdir(join(root, "generated"), { recursive: true });
await writeFile(join(root, "generated", "gamedb-v1.json"), `${JSON.stringify(output, null, 2)}\n`);
console.log(`Built ${records.length} records.`);

// 客户端下载后按同目录的 .sha256 核对（主源与镜像都一样）。哈希按 LF 字节算，
// 与仓库里存的、raw 与镜像实际下发的字节一致；先把文件本身规范成 LF 再算。
const published = [
  join(root, "generated", "gamedb-v1.json"),
  join(root, "candidates", "gamepp-type1.json")
];
for (const path of published) {
  const text = (await readFile(path, "utf8")).replace(/\r\n/g, "\n");
  await writeFile(path, text);
  const hash = createHash("sha256").update(text, "utf8").digest("hex");
  await writeFile(`${path}.sha256`, `${hash}  ${basename(path)}\n`);
  console.log(`${relative(root, path)} sha256 ${hash}`);
}
