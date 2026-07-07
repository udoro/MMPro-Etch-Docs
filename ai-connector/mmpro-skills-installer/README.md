# mmpro-agentic-skills-etch

Installs the Mega Menu Pro AI Connector skills files and component prop docs into any project, so users
don't have to clone or download the docs repo by hand.

```
npx mmpro-agentic-skills-etch
```

Installs into the current directory:

```
mmpro-skills/mega-menu-pro-skills.md
mmpro-skills/mega-menu-pro-skills-reference.md
components/*.md
```

Options: `--force` / `-f` to overwrite an existing install, a path argument to install elsewhere
(e.g. `npx mmpro-agentic-skills-etch ./my-site-project`), `--help` / `-h`.

## Maintaining this package

`skills-package/` is a **generated copy**, not a source of truth. The real files live at:

- `../mmpro-skills/mega-menu-pro-skills.md`
- `../mmpro-skills/mega-menu-pro-skills-reference.md`
- `../../components/*.md`

Whenever those change, regenerate the bundle before publishing:

```
npm run build
```

This also runs automatically via `prepublishOnly` before `npm publish`. The build step rewrites the
`../../components/` relative links in the skills files to `../components/`, since the installed layout
is one folder shallower than the docs repo's layout.

## Publishing a new version

```
npm version patch   # or minor/major
npm run build
npm publish
```

(Requires `npm adduser` / `npm login` first.)
