#!/usr/bin/env node
// Validate the static GitHub Pages export without modifying it.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const slugs = ["e2atlas","urobilanz","appatlas","fileatlas","calcboy","healthatlas","codexvault","skybreak-protocol","thermalatlas","budgetatlas","shortcuts","chatgpt-pets"];
const specialPages = new Set(["healthatlas"]); // Existing custom presentation; migration requires preserving its content.
const key = { "e2atlas":"e2Atlas", "urobilanz":"UroBilanz", "appatlas":"AppAtlas", "fileatlas":"FileAtlas", "calcboy":"CalcBoy", "healthatlas":"HealthAtlas", "codexvault":"CodexVault", "skybreak-protocol":"Skybreak-Protocol", "thermalatlas":"ThermalAtlas", "budgetatlas":"BudgetAtlas", "shortcuts":"Shortcuts", "chatgpt-pets":"chatgpt-pets" };
const statuses = JSON.parse(readFileSync(join(root,"release-status.json"),"utf8"));
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
for (const slug of slugs) {
  const statusName = key[slug];
  check(Object.hasOwn(statuses,statusName),`Missing release data: ${slug} (${statusName})`);
  for (const locale of ["en","de"]) {
    const file = join(root,...(locale === "de" ? ["de"] : []),"apps",slug,"index.html");
    if (!existsSync(file)) { failures.push(`Missing ${locale} page: ${slug}`); continue; }
    const html = readFileSync(file,"utf8");
    check(html.includes("assets/styles.css"),`Missing common styling: ${file}`);
    check(html.includes("assets/dark-theme.css") && html.includes("assets/light-theme.css") && html.includes("assets/color-theme.css"),`Missing theme styles: ${file}`);
    check(html.includes(`lang="${locale}"`),`Wrong language attribute: ${file}`);
    check(html.includes("detail-shell"),`Missing common shell: ${file}`);
    if (!specialPages.has(slug)) {
      check(html.includes("assets/app-detail.js"),`Missing shared detail module: ${file}`);
      check(!html.includes("data-e2-release-sync"),`Legacy release override: ${file}`);
    }
  }
}
const workflow = readFileSync(join(root,".github/workflows/refresh-release-status.yml"),"utf8");
check(workflow.includes("assets/app-detail.js"),"Release workflow no longer updates the shared detail module");
for(const name of ["e2Atlas","UroBilanz","HealthAtlas"]) check(workflow.includes(`"${name}"`),`Release workflow missing ${name}`);
if (failures.length) {
  console.error("Portfolio structure validation FAILED:");
  for (const failure of failures) console.error(" - "+failure);
  process.exitCode = 1;
} else {
  console.log(`Portfolio structure validation OK: ${slugs.length * 2} localized app pages, release data and shared assets checked.`);
}
