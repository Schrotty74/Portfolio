# App page architecture (migration in progress)

The published website is a static GitHub Pages export. The original framework source tree is not present in this repository. **Do not claim that editing a static HTML page alone creates a reusable source template.**

## Baseline
- Ten original app pages share `assets/app-detail.js` and `assets/site-chrome.js` for their app configuration.
- e2Atlas has been migrated to that shared rendering path in this branch, preserving its app-specific screenshots and release data.
- HealthAtlas remains a distinct presentation, using `assets/app-home-bridge.css` and custom sections. Migrating it requires an explicit feature-by-feature comparison before replacement.
- English and German static HTML exports need to match the shared JavaScript data; changing one without the other can cause hydration mismatches.
- `.github/workflows/refresh-release-status.yml` updates `release-status.json` and the embedded release snapshot in `assets/app-detail.js`. Do not bypass this workflow.
- Theme styles and the motion preference are shared behavior. Preserve accessibility, reduced-motion behavior and the existing cache-busting process.

## Adding an app safely
1. Confirm screenshot URLs, privacy descriptions, platform details, manual and release sources.
2. Add the app to the shared metadata and detail configuration; the shared component requires both.
3. Register its release repository and corresponding status key.
4. Produce matching EN/DE pages using the same structure and asset imports. Check the static markup against the hydrated component.
5. Run `node Scripts/check-app-pages.mjs`, the existing privacy checker and relevant browser smoke tests.
6. Review on a separate, *working* preview. Test Safari, Firefox and Chrome before merging.
7. Keep the working public site intact until these checks pass.

## Outstanding unification work
- Audit every existing app's content sections and interaction flows. Do not remove special HealthAtlas features or media to force it into the generic component.
- Restore a reproducible source/build pipeline (original build source is unavailable). The minified static export alone is not a maintainable authoring system.
- Introduce a single app-data schema and generate both locales from it instead of hand-editing bundled JavaScript and static HTML.
- Add real browser smoke tests for themes, motion, navigation, screenshots, release data and locale switching.
- Only after equivalence is proven should the special-page paths and duplicated CSS be retired.
