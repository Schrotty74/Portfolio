#!/usr/bin/env bash
set -euo pipefail

# Check the current tracked tree for files and clear-text patterns that must
# never be published. It deliberately fails closed for high-risk file types.
mapfile -t files < <(git ls-files)

for file in "${files[@]}"; do
  case "${file,,}" in
    *.env|*.pem|*.p12|*.pfx|*.mobileprovision|*.key|id_rsa|id_ed25519|*.sqlite|*.sqlite3|*.db|*.jsonl|*.zip|*.dmg)
      echo "Privacy check failed: prohibited file tracked: $file" >&2
      exit 1
      ;;
  esac
done

content_files=()
for file in "${files[@]}"; do
  [[ "$file" == "Scripts/privacy-check.sh" ]] && continue
  [[ -f "$file" ]] && content_files+=("$file")
done

pattern='-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----|github_pat_[[:alnum:]_]{20,}|gh[pousr]_[[:alnum:]_]{20,}|AKIA[0-9A-Z]{16}|AIza[[:alnum:]_-]{35}|xox[baprs]-[[:alnum:]-]{10,}|sk-[[:alnum:]]{20,}|/Users/[^/[:space:]]+|/Volumes/[^/[:space:]]+'
if ((${#content_files[@]})) && grep -I -n -E "$pattern" "${content_files[@]}"; then
  echo "Privacy check failed: possible secret or private path found." >&2
  exit 1
fi

echo "Privacy check passed."
