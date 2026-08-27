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

secret_pattern='-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----|github_pat_[[:alnum:]_]{20,}|gh[pousr]_[[:alnum:]_]{20,}|AKIA[0-9A-Z]{16}|AIza[[:alnum:]_-]{35}|xox[baprs]-[[:alnum:]-]{10,}|sk-[[:alnum:]]{20,}'
path_pattern='/Users/[^/[:space:]]+|/Volumes/[^/[:space:]]+'
allowed_example_paths='/Users/example(/|$)|/Volumes/example(/|$)'

if ((${#content_files[@]})) && grep -I -n -E -e "$secret_pattern" "${content_files[@]}"; then
  echo "Privacy check failed: possible secret found." >&2
  exit 1
fi

path_matches=""
if ((${#content_files[@]})); then
  path_matches="$(grep -I -n -E -e "$path_pattern" "${content_files[@]}" || true)"
fi

if [[ -n "$path_matches" ]]; then
  disallowed_path_matches="$(printf '%s\n' "$path_matches" | grep -E -v -e "$allowed_example_paths" || true)"
  if [[ -n "$disallowed_path_matches" ]]; then
    printf '%s\n' "$disallowed_path_matches" >&2
    echo "Privacy check failed: possible private local path found." >&2
    exit 1
  fi
fi

echo "Privacy check passed."
