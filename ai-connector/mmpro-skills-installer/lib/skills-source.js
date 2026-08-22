// Single source of truth for where the skills come from and how their links are
// rewritten for an installed project. Both scripts/build.js (which bundles a
// copy at publish time) and bin/cli.js (which prefers a live copy at install
// time) import this, so the two paths cannot drift in how they rewrite links.

export const REPO = "udoro/MMPro-Etch-Docs";
export const DEFAULT_REF = "main";
export const DOCS_URL = "https://design-with-cracka.gitbook.io/megamenupro";

// Where things live in the docs repo.
export const REPO_SKILLS_DIR = "ai-connector/mmpro-skills";
export const REPO_COMPONENTS_DIR = "components";
export const REPO_MANIFEST = "ai-connector/skills-manifest.json";

// Where they land in a user's project.
export const OUT_SKILLS_DIR = "mmpro-skills";
export const OUT_COMPONENTS_DIR = "components";

// The docs repo nests mmpro-skills/ two levels below the root
// (ai-connector/mmpro-skills/), so it links components/ as ../../components/.
// Installed, mmpro-skills/ sits directly under the project root, so that
// becomes ../components/.
export const PATH_REWRITE = [[/\.\.\/\.\.\/components\//g, "../components/"]];

export function applyRewrites(content) {
  let out = content;
  for (const [pattern, replacement] of PATH_REWRITE) out = out.replace(pattern, replacement);
  return out;
}

/**
 * Only a markdown LINK TARGET pointing outside the package is a defect: it would
 * 404 for every installed user. A bare ../../ path in prose is not, because the
 * skills files deliberately reference optional local files and always say what
 * to do when they are absent.
 */
export function findStaleLinks(content) {
  return [...content.matchAll(/\]\((\.\.\/\.\.\/[^)]+)\)/g)].map((m) => m[1]);
}

export function rawUrl(ref, repoPath) {
  return `https://raw.githubusercontent.com/${REPO}/${ref}/${repoPath}`;
}

/**
 * A fetched file only counts if it is non-empty markdown. A proxy or an error
 * page returning 200 with HTML would otherwise be written out as a skills file.
 */
export function looksLikeMarkdown(text) {
  if (!text || text.trim().length < 200) return false;
  const head = text.slice(0, 400).toLowerCase();
  return !head.includes("<!doctype html") && !head.includes("<html");
}
